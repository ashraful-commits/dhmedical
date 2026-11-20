import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/mongodb";
import { models, REQUIRED, CATALOG } from "@/lib/models";

export const dynamic = "force-dynamic";
const PHONE = /^(\+?88)?01[3-9]\d{8}$/;
const json = (o, status = 200) => NextResponse.json(o, { status });

function isAdmin(req) {
  const key = process.env.ADMIN_KEY || "";
  const got = req.headers.get("x-admin-key") || "";
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
        { name: rx },
        { patientName: rx },
        { mobile: rx },
        { hospital: rx },
        { hospitalName: rx },
        { address: rx },
        { specialty: rx },
        { destination: rx },
      ];
    }

    if (sp.get("specialty")) filter.specialty = String(sp.get("specialty"));
    if (sp.get("status") && sp.get("status") !== "all") filter.status = String(sp.get("status"));

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
      return json({ ok: true, id: doc._id }, 201);
    }

    // Public submissions
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
    await db();
    const doc = await Model.create(body);
    return json({ ok: true, id: doc._id }, 201);
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
    const { id, updates, status, active } = body;
    if (!id) return json({ error: "ID required" }, 400);

    const updateData = {};
    if (updates && typeof updates === "object") {
      Object.assign(updateData, updates);
      delete updateData._id;
    }
    if (status) updateData.status = status;
    if (typeof active === "boolean") updateData.active = active;

    await db();
    const updated = await Model.findByIdAndUpdate(id, updateData, { new: true });
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
    return json({ ok: true });
  } catch (e) {
    return json({ error: "Delete failed" }, 500);
  }
}
