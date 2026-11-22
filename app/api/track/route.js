import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { models } from "@/lib/models";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const sp = new URL(req.url).searchParams;
    const q = sp.get("q")?.trim();
    if (!q) {
      return NextResponse.json({ error: "বুকিং আইডি বা মোবাইল নম্বর দিন" }, { status: 400 });
    }

    await db();

    // Search in ambulance bookings first
    const ambBooking = await models.ambulance
      .findOne({
        $or: [{ bookingId: q }, { mobile: q }],
      })
      .sort({ createdAt: -1 })
      .lean();

    if (ambBooking) {
      return NextResponse.json({
        found: true,
        type: "ambulance",
        booking: {
          bookingId: ambBooking.bookingId,
          patientName: ambBooking.patientName,
          mobile: ambBooking.mobile,
          ambulanceType: ambBooking.ambulanceType,
          patientCondition: ambBooking.patientCondition || "সাধারণ",
          address: ambBooking.address,
          destination: ambBooking.destination,
          whenNeeded: ambBooking.whenNeeded,
          estimatedFare: ambBooking.estimatedFare,
          actualFare: ambBooking.actualFare,
          eta: ambBooking.eta,
          trackingStatus: ambBooking.trackingStatus || "requested",
          driverName: ambBooking.driverName,
          driverMobile: ambBooking.driverMobile,
          vehicleRegNo: ambBooking.vehicleRegNo,
          date: ambBooking.date,
          createdAt: ambBooking.createdAt,
        },
      });
    }

    // Search in doctor appointments
    const aptBooking = await models.appointments
      .findOne({
        $or: [{ bookingId: q }, { mobile: q }],
      })
      .sort({ createdAt: -1 })
      .lean();

    if (aptBooking) {
      return NextResponse.json({
        found: true,
        type: "appointment",
        booking: {
          bookingId: aptBooking.bookingId,
          patientName: aptBooking.patientName,
          mobile: aptBooking.mobile,
          doctorName: aptBooking.doctorName,
          specialty: aptBooking.specialty,
          hospitalName: aptBooking.hospitalName,
          date: aptBooking.date,
          time: aptBooking.time,
          serialNo: aptBooking.serialNo,
          roomNo: aptBooking.roomNo,
          confirmedTime: aptBooking.confirmedTime,
          trackingStatus: aptBooking.trackingStatus || "requested",
          createdAt: aptBooking.createdAt,
        },
      });
    }

    return NextResponse.json({ found: false, error: "কোনো বুকিং রেকর্ড পাওয়া যায়নি।" }, { status: 404 });
  } catch (err) {
    console.error("Track error:", err);
    return NextResponse.json({ error: "সার্ভার ত্রুটি: " + err.message }, { status: 500 });
  }
}
