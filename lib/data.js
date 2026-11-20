import { db } from "./mongodb";
import { models } from "./models";

export async function getList(kind, limit = 12) {
  try {
    await db();
    const Model = models[kind];
    if (!Model) return [];
    const query = (kind === "doctors" || kind === "hospitals") ? { active: { $ne: false } } : {};
    const items = await Model.find(query).sort({ createdAt: -1 }).limit(limit).lean();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error("getList error for", kind, err);
    return [];
  }
}
