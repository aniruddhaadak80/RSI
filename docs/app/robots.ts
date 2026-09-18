import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://aniruddhaadak-rsi.vercel.app/sitemap.xml"
  };
}
