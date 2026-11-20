import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { isCloudinaryConfigured, uploadStream } from "@/lib/cloudinary";

export const runtime = "nodejs";
const MAX = 5 * 1024 * 1024;

export async function POST(req) {
  try {
    const fd = await req.formData();
    const file = fd.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "ফাইল পাওয়া যায়নি" }, { status: 400 });
    }
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      return NextResponse.json({ error: "শুধু JPG, PNG বা WEBP ছবি দিন" }, { status: 400 });
    }
    if (file.size > MAX) {
      return NextResponse.json({ error: "ছবি ৫ MB এর কম হতে হবে" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());

    if (isCloudinaryConfigured()) {
      try {
        const res = await uploadStream(buf);
        return NextResponse.json({ url: res.secure_url, provider: "cloudinary" });
      } catch (cloudErr) {
        console.error("Cloudinary upload failed, falling back to local:", cloudErr);
      }
    }

    // Local fallback when Cloudinary is not configured or fails
    const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1] || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buf);

    return NextResponse.json({ url: `/uploads/${filename}`, provider: "local" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "আপলোড ব্যর্থ হয়েছে" }, { status: 500 });
  }
}
