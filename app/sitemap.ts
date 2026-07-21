import type { MetadataRoute } from "next";

const baseUrl = "https://fitness.tuistech.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/programs", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/videos", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/consulting", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}