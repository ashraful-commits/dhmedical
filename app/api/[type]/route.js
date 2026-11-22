import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/mongodb";
import { models, REQUIRED, CATALOG } from "@/lib/models";
import { generateBookingId, AMBULANCE_PRICING, logActivity } from "@/lib/bookingHelper";

export const dynamic = "force-dynamic";
const PHONE = /^(\+?88)?01[3-9]\d{8}$/;
const json = (o, status = 200) => NextResponse.json(o, { status });

function isAdmin(req) {
  const key = String(process.env.ADMIN_KEY || "dhadmin123").trim();
  const got = String(req.headers.get("x-admin-key") || "").trim();
  if (!key || got.length !== key.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(got), Buffer.from(key));
  } catch {
    return false;
  }
}

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req, { params }) {
  const { type } = params;
  const Model = models[type];
  if (!Model) return json({ error: "Not found" }, 404);

  const admin = isAdmin(req);
  const isPublicType = CATALOG.includes(type) || type === "feedback";
  if (!isPublicType && !admin) return json({ error: "Unauthorized" }, 401);

  try {
    await db();
    const sp = new URL(req.url).searchParams;
    const filter = {};

    if (!admin && CATALOG.includes(type)) {
      filter.active = { $ne: false };
    }

    const q = sp.get("q")?.trim();
    if (q) {
      const rx = new RegExp(esc(q.slice(0, 60)), "i");
      filter.$or = [
        { bookingId: rx },
        { name: rx },
        { patientName: rx },
        { mobile: rx },
        { hospital: rx },
        { hospitalName: rx },
        { address: rx },
        { specialty: rx },
        { destination: rx },
        { regNo: rx },
        { district: rx },
      ];
    }

    if (sp.get("district") && sp.get("district") !== "all") filter.district = String(sp.get("district"));
    if (sp.get("specialty")) filter.specialty = String(sp.get("specialty"));
    if (sp.get("status") && sp.get("status") !== "all") filter.status = String(sp.get("status"));
    if (sp.get("trackingStatus") && sp.get("trackingStatus") !== "all") filter.trackingStatus = String(sp.get("trackingStatus"));

    const items = await Model.find(filter).sort({ createdAt: -1 }).limit(300).lean();
    return json({ items });
  } catch (e) {
    console.error("GET error:", e);
    return json({ error: "Database error: " + e.message }, 500);
  }
}

export async function POST(req, { params }) {
  const { type } = params;
  const Model = models[type];
  if (!Model) return json({ error: "Not found" }, 404);

  const admin = isAdmin(req);
  const catalog = CATALOG.includes(type);
  if (catalog && !admin) return json({ error: "Unauthorized" }, 401);

  try {
    const body = await req.json();
    if (body.website) return json({ ok: true }); // honeypot

    // Admin posting
    if (admin) {
      if (catalog && !String(body.name ?? "").trim()) {
        return json({ error: "নাম আবশ্যক" }, 400);
      }
      delete body._id;
      await db();
      const doc = await Model.create(body);
      await logActivity({
        adminUser: "Admin",
        action: `Created new ${type} entry`,
        targetType: type,
        targetId: String(doc._id),
        details: body.name || body.patientName || "",
      });
      return json({ ok: true, id: doc._id, item: doc }, 201);
    }

    // Public submissions validation
    for (const f of REQUIRED[type] || []) {
      if (!String(body[f] ?? "").trim()) return json({ error: "প্রয়োজনীয় তথ্য পূরণ করুন" }, 400);
    }
    for (const f of ["mobile", "familyMobile"]) {
      if (body[f] && !PHONE.test(String(body[f]).trim())) {
        return json({ error: "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)" }, 400);
      }
    }

    delete body.status;
    delete body._id;
    delete body.active;

    // Automatic Booking ID generation & Pricing estimation
    if (type === "ambulance") {
      body.bookingId = generateBookingId("AMB");
      body.trackingStatus = "requested";
      const pricing = AMBULANCE_PRICING[body.ambulanceType] || AMBULANCE_PRICING.General;
      body.estimatedFare = pricing.baseFare;
      body.eta = pricing.eta;
    } else if (type === "appointments") {
      body.bookingId = generateBookingId("APT");
      body.trackingStatus = "requested";
    } else if (type === "memberships") {
      body.membershipId = generateBookingId("FC");
    }

    await db();
    const doc = await Model.create(body);

    return json({
      ok: true,
      id: doc._id,
      bookingId: doc.bookingId || doc.membershipId || null,
      estimatedFare: doc.estimatedFare || null,
      eta: doc.eta || null,
    }, 201);
  } catch (e) {
    console.error("POST error:", e);
    return json({ error: "তথ্য সঠিক নয়, আবার চেষ্টা করুন" }, 400);
  }
}

export async function PATCH(req, { params }) {
  if (!isAdmin(req)) return json({ error: "Unauthorized" }, 401);
  const Model = models[params.type];
  if (!Model) return json({ error: "Not found" }, 404);

  try {
    const body = await req.json();
    const { id, updates, status, trackingStatus, active } = body;
    if (!id) return json({ error: "ID required" }, 400);

    const updateData = {};
    if (updates && typeof updates === "object") {
      Object.assign(updateData, updates);
      delete updateData._id;
    }
    if (status) updateData.status = status;
    if (trackingStatus) updateData.trackingStatus = trackingStatus;
    if (typeof active === "boolean") updateData.active = active;

    await db();
    const updated = await Model.findByIdAndUpdate(id, updateData, { new: true });

    // If actual fare or trip completion updated, record in accounts
    if (params.type === "ambulance" && (updateData.actualFare || updateData.trackingStatus === "completed")) {
      const fare = Number(updated.actualFare || updated.estimatedFare || 2500);
      const partnerShare = Math.round(fare * 0.8);
      const officeCommission = fare - partnerShare;

      if (models.accounts) {
        await models.accounts.findOneAndUpdate(
          { bookingId: updated.bookingId },
          {
            bookingId: updated.bookingId,
            serviceType: `অ্যাম্বুলেন্স (${updated.ambulanceType || "General"})`,
            patientName: updated.patientName,
            totalFare: fare,
            partnerShare,
            officeCommission,
            paymentStatus: updateData.trackingStatus === "completed" ? "paid" : "pending",
            date: updated.date || new Date().toISOString().slice(0, 10),
          },
          { upsert: true, new: true }
        );
      }
    }

    await logActivity({
      adminUser: "Admin",
      action: `Updated ${params.type} #${id}`,
      targetType: params.type,
      targetId: id,
      details: `Status: ${updated.status || ""}, Tracking: ${updated.trackingStatus || ""}`,
    });

    return json({ ok: true, item: updated });
  } catch (e) {
    console.error("PATCH error:", e);
    return json({ error: "Update failed" }, 400);
  }
}

export async function DELETE(req, { params }) {
  if (!isAdmin(req)) return json({ error: "Unauthorized" }, 401);
  const Model = models[params.type];
  const id = new URL(req.url).searchParams.get("id");
  if (!Model || !id) return json({ error: "Bad request" }, 400);

  try {
    await db();
    await Model.findByIdAndDelete(id);
    await logActivity({
      adminUser: "Admin",
      action: `Deleted ${params.type} #${id}`,
      targetType: params.type,
      targetId: id,
    });
    return json({ ok: true });
  } catch (e) {
    return json({ error: "Delete failed" }, 500);
  }
}
