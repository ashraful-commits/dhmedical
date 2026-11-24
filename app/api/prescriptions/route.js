import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/mongodb";
import { models } from "@/lib/models";

export const dynamic = "force-dynamic";

const memory = new Map();
const json = (o, status = 200) => NextResponse.json(o, { status });
const makeCode = () => crypto.randomBytes(4).toString("hex").toUpperCase();

export async function POST(req) {
  try {
    const body = await req.json();
    const rows = Array.isArray(body.rows) ? body.rows.slice(0, 100) : [];
    if (!rows.length) return json({ error: "কমপক্ষে একটি ঔষধ যোগ করুন" }, 400);

    const code = makeCode();
    const payload = {
      code,
      doctor: String(body.doctor || "").slice(0, 200),
      patient: String(body.patient || "").slice(0, 200),
      source: String(body.source || "manual").slice(0, 30),
      rows: rows.map((r) => ({
        doctor: String(r.doctor || "").slice(0, 200),
        medicine: String(r.medicine || "").slice(0, 200),
        manufacturer: String(r.manufacturer || "").slice(0, 200),
        timing: String(r.timing || "").slice(0, 200),
        days: String(r.days || "").slice(0, 200),
      })),
      updatedAt: new Date().toISOString(),
    };

    try {
      await db();
      await models.prescriptions.create(payload);
    } catch {
      memory.set(code, payload);
    }

    memory.set(code, payload);
    return json({ ok: true, code }, 201);
  } catch {
    return json({ error: "তথ্য সংরক্ষণ করা যায়নি" }, 400);
  }
}

export async function GET(req) {
  const code = String(new URL(req.url).searchParams.get("code") || "").trim().toUpperCase();
  if (!code) return json({ error: "কোড দিন" }, 400);

  try {
    await db();
    const doc = await models.prescriptions.findOne({ code }).lean();
    if (doc) {
      return json({
        code: doc.code,
        doctor: doc.doctor || "",
        patient: doc.patient || "",
        rows: doc.rows || [],
        updatedAt: doc.updatedAt,
      });
    }
  } catch {
    const local = memory.get(code);
    if (local) {
      return json({
        code: local.code,
        doctor: local.doctor || "",
        patient: local.patient || "",
        rows: local.rows || [],
        updatedAt: local.updatedAt,
      });
    }
  }

  const local = memory.get(code);
  if (local) {
    return json({
      code: local.code,
      doctor: local.doctor || "",
      patient: local.patient || "",
      rows: local.rows || [],
      updatedAt: local.updatedAt,
    });
  }

  return json({ error: "এই কোডের প্রেসক্রিপশন পাওয়া যায়নি" }, 404);
}
