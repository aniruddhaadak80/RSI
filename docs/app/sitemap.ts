import type { MetadataRoute } from "next";
import { docs } from "../lib/docs";

const base = "https://aniruddhaadak-rsi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base.concat("/"), lastModified: new Date("2026-09-19") },
    { url: base.concat("/docs"), lastModified: new Date("2026-09-19") }
  ];
  const docRoutes: MetadataRoute.Sitemap = docs.map(function (item) {
    return {
      url: base.concat("/docs/").concat(item.slug),
      lastModified: new Date(item.updated)
    };
  });
  return staticRoutes.concat(docRoutes);
}
