import type { Metadata } from "next";
import { Suspense } from "react";
import { getBrands } from "@/lib/data";
import { CataloguesClient } from "@/app/catalogue/CataloguesClient";

export const metadata: Metadata = {
  title: "Product Catalogues",
  description:
    "Browse security, networking, and IT hardware products from top brands. Find the right solutions for your business needs.",
};

export default function CataloguesPage() {
  const brands = getBrands();

  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-sm text-slate-600">Loading…</div>
      }
    >
      <CataloguesClient brands={brands} />
    </Suspense>
  );
}
