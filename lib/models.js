import mongoose, { Schema } from "mongoose";

const status = { type: String, enum: ["new", "contacted", "done", "cancelled"], default: "new" };
const str = String;

const defs = {
  appointments: {
    date: str,
    time: str,
    patientName: { type: str, required: true, trim: true },
    mobile: { type: str, required: true },
    specialty: str,
    doctorName: str,
    hospitalName: str,
    note: str,
    status,
  },
  ambulance: {
    date: str,
    patientName: { type: str, required: true, trim: true },
    mobile: { type: str, required: true },
    address: str,
    destination: str,
    ambulanceType: str,
    location: str, // GPS coordinates / Google Maps link
    note: str,
    status,
  },
  partners: {
    name: { type: str, required: true, trim: true },
    fatherName: str,
    mobile: { type: str, required: true },
    nid: str,
    nidFrontPhoto: str, // NID Card front photo
    nidBackPhoto: str,  // NID Card back photo
    drivingLicensePhoto: str, // Driving license photo
    address: str,
    district: str,
    upazila: str,
    location: str, // GPS coordinates of stand/garage
    ownerName: str,
    regNo: str,
    vehicleTypes: [str],
    model: str,
    serviceAreas: [str],
    perKmRate: str,
    dhakaRate: str,
    is24h: str,
    extra: str,
    docsHave: [str],
    photo: str, // Driver/Owner portrait photo
    vehiclePhoto: str, // Ambulance vehicle photo
    agree: Boolean,
    status,
  },
  memberships: {
    name: { type: str, required: true, trim: true },
    country: str,
    mobile: str,
    familyName: str,
    familyMobile: { type: str, required: true },
    district: str,
    plan: str,
    note: str,
    status,
  },
  feedback: {
    name: str,
    service: str,
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: str,
    status,
  },
  doctors: {
    name: { type: str, required: true, trim: true },
    specialty: str,
    degree: str,
    hospital: str,
    fee: str,
    schedule: str,
    photo: str,
    active: { type: Boolean, default: true },
  },
  hospitals: {
    name: { type: str, required: true, trim: true },
    address: str,
    phone: str,
    services: str,
    logo: str,
    active: { type: Boolean, default: true },
  },
};

export const models = Object.fromEntries(
  Object.entries(defs).map(([k, d]) => [
    k,
    mongoose.models[k] || mongoose.model(k, new Schema(d, { timestamps: true })),
  ])
);

// required fields for public submissions
export const REQUIRED = {
  appointments: ["patientName", "mobile"],
  ambulance: ["patientName", "mobile", "address", "destination"],
  partners: ["name", "mobile", "nid", "regNo"],
  memberships: ["name", "familyMobile"],
  feedback: ["rating"],
};
export const CATALOG = ["doctors", "hospitals"];
