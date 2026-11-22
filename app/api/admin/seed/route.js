import { NextResponse } from "next/server";
import crypto from "crypto";
import { seedDatabase } from "@/lib/seedData";
import { logActivity } from "@/lib/bookingHelper";

export const dynamic = "force-dynamic";

function isAdmin(req) {
  const key = (process.env.ADMIN_KEY || "dhadmin123").trim();
  const got = (req.headers.get("x-admin-key") || "").trim();
  if (!key || got.length !== key.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(got), Buffer.from(key));
  } catch {
    return false;
  }
}

export async function POST(req) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const counts = await seedDatabase();
    await logActivity({
      adminUser: "Super Admin",
      action: "Seeded Database",
      details: `Seeded ${counts.doctors} doctors, ${counts.hospitals} hospitals, ${counts.ambulance} ambulance, ${counts.appointments} appointments`,
    });

    return NextResponse.json({
      ok: true,
      message: `সফলভাবে ${counts.doctors} জন ডাক্তার ও ${counts.hospitals} টি হাসপাতাল সিড করা হয়েছে!`,
      counts,
    });
  } catch (err) {
    console.error("Seed API error:", err);
    return NextResponse.json({ error: "সিড করতে সমস্যা হয়েছে: " + err.message }, { status: 500 });
  }
}
