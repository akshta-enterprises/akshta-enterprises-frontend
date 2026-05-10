import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // MUST be the full absolute URL
    sitemap: "https://akshtaenterprises.com",
  };
}
