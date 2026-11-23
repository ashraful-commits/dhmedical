import { BASE_URL } from "@/lib/seoHelper";

export default function sitemap() {
  const routes = [
    "",
    "/doctors",
    "/ambulance",
    "/hospitals",
    "/family-care",
    "/appointment",
    "/track",
    "/partner",
    "/feedback",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "always" : "daily",
    priority: route === "" ? 1.0 : 0.85,
  }));
}
