import { NextResponse } from "next/server";
import crypto from "crypto";
import { logActivity } from "@/lib/bookingHelper";

export const dynamic = "force-dynamic";

// In-memory rate limiting store (IP -> { count, expiresAt })
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const now = Date.now();

  // Check rate limit
  const record = loginAttempts.get(ip);
  if (record && record.expiresAt > now) {
    if (record.count >= MAX_ATTEMPTS) {
      const remainingMin = Math.ceil((record.expiresAt - now) / 60000);
      return NextResponse.json(
        {
          error: `নিরাপত্তার স্বার্থে আপনার আইপি সাময়িক লক করা হয়েছে। অনুগ্রহ করে ${remainingMin} মিনিট পর চেষ্টা করুন।`,
        },
        { status: 429 }
      );
    }
  } else {
    loginAttempts.set(ip, { count: 0, expiresAt: now + LOCKOUT_MS });
  }

  try {
    const { key } = await req.json();
    const inputKey = String(key || "").trim();
    const serverKey = String(process.env.ADMIN_KEY || "dhadmin123").trim();

    const inputBuf = Buffer.from(inputKey);
    const serverBuf = Buffer.from(serverKey);
    const isMatch = inputBuf.length === serverBuf.length && crypto.timingSafeEqual(inputBuf, serverBuf);

    if (!isMatch) {
      const rec = loginAttempts.get(ip);
      rec.count += 1;
      const left = Math.max(0, MAX_ATTEMPTS - rec.count);
      await logActivity({
        adminUser: "Anonymous",
        action: "Failed Login Attempt",
        details: `IP: ${ip}, attempts left: ${left}`,
        ip,
      });
      return NextResponse.json(
        { error: `ভুল পাসওয়ার্ড। আর ${left} বার সুযোগ আছে।` },
        { status: 401 }
      );
    }

    // Success: clear rate limit
    loginAttempts.delete(ip);

    // Generate signed session token
    const token = crypto.createHmac("sha256", serverKey).update(`admin-${now}-${ip}`).digest("hex");

    await logActivity({
      adminUser: "Super Admin",
      action: "Admin Login Success",
      details: `Successful authenticated session`,
      ip,
    });

    return NextResponse.json({
      ok: true,
      token: serverKey, // Used as x-admin-key for API authorization
      user: {
        role: "Super Admin",
        name: "D H Medical Director",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "লগইন প্রসেসিং ব্যর্থ হয়েছে: " + err.message }, { status: 500 });
  }
}
