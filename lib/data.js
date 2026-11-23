import { db } from "./mongodb";
import { models } from "./models";
import { doctorData, hospitalData, ambulanceData, feedbackData } from "./seedData";

const FALLBACK_MAP = {
  doctors: doctorData,
  hospitals: hospitalData,
  ambulance: ambulanceData,
  feedback: feedbackData,
};

function getFallbackData(kind, limit = 12) {
  const fallback = FALLBACK_MAP[kind] || [];
  return JSON.parse(JSON.stringify(fallback.slice(0, limit)));
}

export async function getList(kind, limit = 12) {
  try {
    await db();
    const Model = models[kind];
    if (!Model) return getFallbackData(kind, limit);
    const query = (kind === "doctors" || kind === "hospitals") ? { active: { $ne: false } } : {};
    const items = await Model.find(query).sort({ createdAt: -1 }).limit(limit).lean();
    if (items && items.length > 0) {
      return JSON.parse(JSON.stringify(items));
    }
    return getFallbackData(kind, limit);
  } catch (err) {
    // Graceful fallback during offline, DNS resolution, or initial seed states
    console.warn(`[DH Medical Support] Using fallback catalog for '${kind}' (${err.message})`);
    return getFallbackData(kind, limit);
  }
}
