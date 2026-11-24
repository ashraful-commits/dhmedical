export const ROW_FIELDS = [
  { key: "doctor", label: "ডাক্তার" },
  { key: "medicine", label: "ঔষধ" },
  { key: "manufacturer", label: "কোম্পানি" },
  { key: "timing", label: "সময়" },
  { key: "days", label: "দিন" },
];

export const EMPTY_ROW = {
  doctor: "",
  medicine: "",
  manufacturer: "",
  timing: "",
  days: "",
};

const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();

export function extractDoctorName(lines) {
  const line = lines.find((l) => /(ডাক্তার|ডা\.?|dr\.?|mbbs|এমবিবিএস|বিশেষজ্ঞ|specialist)/i.test(l));
  if (!line) return "";
  return clean(
    line
      .replace(/^(অধ্যাপক|প্রফেসর|professor|prof\.?)\s*/i, "")
      .replace(/(mbbs|এমবিবিএস|fcpS|md\b|frcp|mrcp).*$/i, "")
      .replace(/[,;:-]\s*(mbbs|এমবিবিএস|fcpS|md\b|frcp|mrcp).*$/i, "")
      .replace(/^dr\.?\s*|^ডা\.?\s*/i, "")
      .replace(/[,;:].*$/, "")
  );
}

function isMedicineLine(line) {
  return /(ট্যাব|টাবলেট|ক্যাপসুল|ক্যাপ|সিরাপ|স্যাপ|\btab\b|\btablet\b|\bcap\b|\bcapsule\b|\bsyrup\b|\bsyp\b|\bmg\b|\bml\b)/i.test(line);
}

function isManufacturerLine(line) {
  return /(লিমিটেড|ltd\.?|limited|pharma|ফার্মা|industries|laboratories|lab\b|company|কোম্পানি)/i.test(line);
}

function extractTiming(text) {
  const hits = [];
  const patterns = [
    ["সকাল", /সকাল|morning/i],
    ["দুপুর", /দুপুর|afternoon|noon/i],
    ["সন্ধ্যা", /সন্ধ্যা|evening/i],
    ["রাত", /রাত|night/i],
    ["খাবার আগে", /খাবার\s*আগে|before\s*meal|before\s*food/i],
    ["খাবার পরে", /খাবার\s*পরে|after\s*meal|after\s*food/i],
  ];
  patterns.forEach(([label, rx]) => {
    if (rx.test(text)) hits.push(label);
  });
  return hits.join(" · ");
}

function extractDays(text) {
  const patterns = [
    ["প্রতিদিন", /প্রতিদিন|daily|every\s*day/i],
    ["সোমবার", /সোম|mon\b|monday/i],
    ["মঙ্গলবার", /মঙ্গল|tue\b|tuesday/i],
    ["বুধবার", /বুধ|wed\b|wednesday/i],
    ["বৃহস্পতিবার", /বৃহ|thu\b|thursday/i],
    ["শুক্রবার", /শুক্র|fri\b|friday/i],
    ["শনিবার", /শনি|sat\b|saturday/i],
    ["রবিবার", /রবি|sun\b|sunday/i],
  ];
  const hits = patterns.filter(([, rx]) => rx.test(text)).map(([label]) => label);
  return hits.length ? hits.join(" · ") : "প্রতিদিন";
}

export function parsePrescriptionText(raw) {
  const lines = String(raw || "")
    .split(/\r?\n/)
    .map(clean)
    .filter(Boolean);

  if (!lines.length) return [{ ...EMPTY_ROW }];

  const doctor = extractDoctorName(lines);
  const rows = [];

  lines.forEach((line, i) => {
    if (!isMedicineLine(line)) return;
    const nearby = lines.slice(Math.max(0, i - 2), i + 4);
    const context = nearby.join(" ");
    const medicine = clean(
      line.replace(/^\s*\d+\s*[.)|-]\s*/, "").replace(/^(এবং|and)\s+/i, "")
    );

    rows.push({
      doctor: doctor || extractDoctorName(nearby),
      medicine,
      manufacturer: nearby.find((l) => l !== line && isManufacturerLine(l)) || "",
      timing: extractTiming(context),
      days: extractDays(context),
    });
  });

  return rows.length ? rows : [{ ...EMPTY_ROW }];
}

export function rowsToCsv(rows) {
  const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    ROW_FIELDS.map((f) => escape(f.label)).join(","),
    ...(rows || []).map((r) => ROW_FIELDS.map((f) => escape(r[f.key])).join(",")),
  ];
  return `\uFEFF${lines.join("\r\n")}`;
}
