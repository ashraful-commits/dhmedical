import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/mongodb";
import { models } from "@/lib/models";

export const dynamic = "force-dynamic";

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

export async function POST(req) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db();
    // Dynamically run the seed
    const { exec } = await import("child_process");
    await new Promise((resolve, reject) => {
      exec("node scripts/seed.cjs", (err, stdout, stderr) => {
        if (err) return reject(new Error(stderr || err.message));
        resolve(stdout);
      });
    });

    return NextResponse.json({ ok: true, message: "Sample data seeded successfully!" });
  } catch (err) {
    console.error("Seed API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

