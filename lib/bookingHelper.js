import { models } from "./models";
import { db } from "./mongodb";

export function generateBookingId(type = "AMB") {
  const prefix = type.toUpperCase() === "APT" ? "DH-APT" : type.toUpperCase() === "FC" ? "DH-FC" : "DH-AMB";
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${random}`;
}

export const AMBULANCE_PRICING = {
  General: { name: "General (সাধারণ)", baseFare: 1500, perKm: 50, eta: "১৫-২৫ মিনিট" },
  Oxygen: { name: "Oxygen (অক্সিজেন)", baseFare: 2500, perKm: 60, eta: "১৫-২০ মিনিট" },
  ICU: { name: "ICU (লাইফ সাপোর্ট/ভেন্টিলেটর)", baseFare: 8000, perKm: 100, eta: "২০-৩০ মিনিট" },
  NICU: { name: "NICU (নবজাতক ইনকিউবেটর)", baseFare: 9500, perKm: 110, eta: "২০-৩০ মিনিট" },
  Cardiac: { name: "Cardiac (কার্ডিয়াক স্পেশাল)", baseFare: 8500, perKm: 100, eta: "১৫-২৫ মিনিট" },
  "Long Distance": { name: "Long Distance (দূরপাল্লার)", baseFare: 4000, perKm: 65, eta: "৩০-৪৫ মিনিট" },
};

export async function logActivity({ adminUser = "Admin", action, targetType = "", targetId = "", details = "", ip = "" }) {
  try {
    await db();
    if (models.activity_logs) {
      await models.activity_logs.create({
        adminUser,
        action,
        targetType,
        targetId,
        details,
        ip,
      });
    }
  } catch (e) {
    console.error("Activity logging error:", e);
  }
}
