import type { Metadata } from "next";
import { Suspense } from "react";
import { getBrands, getProducts } from "@/lib/data";
import { ProductsClient } from "@/app/products/ProductsClient";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Browse security, networking, and IT hardware products. Filter by brand and category, or search by keywords.",
};

export default function ProductsPage() {
  const products = getProducts();
  const brands = getBrands();

  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-slate-600">Loading…</div>}>
      <ProductsClient products={products} brands={brands} />
    </Suspense>
  );
}

