import mongoose, { Schema } from "mongoose";

const str = String;
const num = Number;
const bool = Boolean;

const defs = {
  // Appointments Collection
  appointments: {
    bookingId: { type: str, index: true },
    date: str,
    time: str,
    patientName: { type: str, required: true, trim: true },
    mobile: { type: str, required: true },
    specialty: str,
    doctorName: str,
    hospitalName: str,
    serialNo: str,
    roomNo: str,
    confirmedTime: str,
    note: str,
    status: { type: str, enum: ["new", "contacted", "done", "cancelled"], default: "new" },
    trackingStatus: {
      type: str,
      enum: ["requested", "confirmed", "completed", "cancelled"],
      default: "requested",
    },
  },

  // Ambulance Bookings Collection
  ambulance: {
    bookingId: { type: str, index: true },
    date: str,
    time: str,
    patientName: { type: str, required: true, trim: true },
    mobile: { type: str, required: true },
    patientCondition: {
      type: str,
      enum: ["সাধারণ", "জরুরি", "অক্সিজেন", "ICU", "নবজাতক", "ক্রিটিক্যাল"],
      default: "সাধারণ",
    },
    ambulanceType: {
      type: str,
      enum: ["General", "Oxygen", "ICU", "NICU", "Cardiac", "Long Distance", "সাধারণ", "অক্সিজেন", "নবজাতক"],
      default: "General",
    },
    address: { type: str, required: true },
    location: str, // GPS coordinates / Map link
    destination: { type: str, required: true },
    whenNeeded: { type: str, default: "এখনই জরুরি" },
    passengers: { type: num, default: 1 },
    note: str,
    estimatedFare: num,
    actualFare: num,
    driverName: str,
    driverMobile: str,
    vehicleRegNo: str,
    eta: str,
    assignedPartnerId: str,
    status: { type: str, enum: ["new", "contacted", "done", "cancelled"], default: "new" },
    trackingStatus: {
      type: str,
      enum: ["requested", "confirmed", "driver_assigned", "on_the_way", "picked_up", "completed", "cancelled"],
      default: "requested",
    },
  },

  // Ambulance Partners & Fleet Collection
  partners: {
    name: { type: str, required: true, trim: true },
    fatherName: str,
    mobile: { type: str, required: true },
    nid: str,
    nidFrontPhoto: str,
    nidBackPhoto: str,
    drivingLicensePhoto: str,
    photo: str,
    vehiclePhoto: str,
    address: str,
    district: str,
    upazila: str,
    location: str,
    ownerName: str,
    regNo: { type: str, required: true },
    model: str,
    vehicleTypes: [str],
    serviceAreas: [str],
    perKmRate: str,
    dhakaRate: str,
    is24h: str,
    extra: str,
    docsHave: [str],
    agree: bool,
    verified: { type: bool, default: false },
    fleetStatus: { type: str, enum: ["available", "busy", "maintenance", "offline"], default: "available" },
    status: { type: str, enum: ["new", "contacted", "done", "cancelled"], default: "new" },
  },

  // DH Family Care Memberships Collection
  memberships: {
    membershipId: { type: str, index: true },
    name: { type: str, required: true, trim: true },
    country: str,
    mobile: str,
    familyName: str,
    familyMobile: { type: str, required: true },
    district: str,
    upazila: str,
    plan: str,
    startDate: str,
    validUntil: str,
    note: str,
    status: { type: str, enum: ["new", "contacted", "done", "cancelled"], default: "new" },
  },

  // Insurance Policy & Claim Assistance Requests
  insuranceRequests: {
    requestId: { type: str, index: true },
    requestType: str,
    name: { type: str, required: true, trim: true },
    mobile: { type: str, required: true },
    plan: str,
    policyNumber: str,
    district: str,
    familyMembers: num,
    message: str,
    status: { type: str, enum: ["new", "contacted", "done", "cancelled"], default: "new" },
  },

  // Shared Prescription Schedules
  prescriptions: {
    code: { type: str, index: true, unique: true },
    doctor: str,
    patient: str,
    rows: [Schema.Types.Mixed],
    source: { type: str, default: "manual" },
  },

  // Customer Feedback Collection
  feedback: {
    name: str,
    service: str,
    rating: { type: num, min: 1, max: 5, required: true },
    comment: str,
    verifiedUser: { type: bool, default: true },
    status: { type: str, enum: ["new", "done", "cancelled"], default: "done" },
  },

  // Doctors Collection
  doctors: {
    name: { type: str, required: true, trim: true },
    specialty: str,
    degree: str,
    hospital: str,
    fee: str,
    schedule: str,
    photo: str,
    bmdcReg: str,
    district: { type: str, default: "ঢাকা" },
    experience: str,
    verified: { type: bool, default: true },
    active: { type: bool, default: true },
  },

  // Hospitals & Diagnostic Centers Collection
  hospitals: {
    name: { type: str, required: true, trim: true },
    district: { type: str, default: "ঢাকা" },
    address: str,
    phone: str,
    emergencyPhone: str,
    services: str,
    totalBeds: str,
    icuBeds: str,
    cabinBeds: str,
    icuAvailable: { type: bool, default: true },
    floorGuide: [str],
    mapUrl: str,
    logo: str,
    verifiedDate: { type: str, default: "নভেম্বর ২০২৬" },
    active: { type: bool, default: true },
  },

  // Office Accounts & Financial Ledger Collection
  accounts: {
    bookingId: { type: str, index: true },
    serviceType: { type: str, default: "অ্যাম্বুলেন্স" },
    patientName: str,
    totalFare: { type: num, default: 0 },
    partnerShare: { type: num, default: 0 },
    officeCommission: { type: num, default: 0 },
    paymentMethod: { type: str, default: "নগদ (Cash)" },
    paymentStatus: { type: str, enum: ["pending", "paid", "refunded"], default: "pending" },
    date: str,
    note: str,
  },

  // Activity Logs Collection for Security Audit Trail
  activity_logs: {
    adminUser: { type: str, default: "Super Admin" },
    action: { type: str, required: true },
    targetType: str,
    targetId: str,
    details: str,
    ip: str,
  },
};

export const models = Object.fromEntries(
  Object.entries(defs).map(([k, d]) => [
    k,
    mongoose.models[k] || mongoose.model(k, new Schema(d, { timestamps: true })),
  ])
);

// Required fields for public submissions
export const REQUIRED = {
  appointments: ["patientName", "mobile"],
  ambulance: ["patientName", "mobile", "address", "destination"],
  partners: ["name", "mobile", "nid", "regNo"],
  memberships: ["name", "familyMobile"],
  insuranceRequests: ["name", "mobile", "plan"],
  feedback: ["rating"],
};

export const CATALOG = ["doctors", "hospitals"];
