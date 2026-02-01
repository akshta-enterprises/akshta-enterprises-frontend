"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowTopRightOnSquareIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { Brand, Product } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MotionInView } from "@/components/ui/MotionInView";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function ProductsClient({
  products,
  brands,
}: {
  products: Product[];
  brands: Brand[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [products]);

  const [query, setQuery] = useState("");
  const [brandId, setBrandId] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  // Initialize from URL
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const b = searchParams.get("brand") ?? "all";
    const c = searchParams.get("category") ?? "all";
    setQuery(q);
    setBrandId(b);
    setCategory(c);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL updated (shareable filters) without navigation noise
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (brandId !== "all") params.set("brand", brandId);
    if (category !== "all") params.set("category", category);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  }, [query, brandId, category, router]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return products.filter((p) => {
      if (brandId !== "all" && p.brandId !== brandId) return false;
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;

      const haystack = normalize(
        [p.name, p.shortDescription, p.category, ...(p.tags ?? [])].join(" "),
      );
      return haystack.includes(q);
    });
  }, [products, query, brandId, category]);

  const brandById = useMemo(() => {
    const map = new Map(brands.map((b) => [b.id, b]));
    return (id: string) => map.get(id);
  }, [brands]);

  const clear = () => {
    setQuery("");
    setBrandId("all");
    setCategory("all");
  };

  return (
    <div className="py-14 sm:py-16">
      <Container>
        <MotionInView>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-bold text-slate-700">
            <FunnelIcon className="h-4 w-4" />
            Search & Filter
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ae-black sm:text-4xl">
            Products & Services
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Display-only catalog. Filter by brand and category, or search by product name
            and keywords. Some items link to Amazon (external).
          </p>
        </MotionInView>

        <MotionInView delay={0.06}>
          <Card className="mt-8 p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <label className="text-xs font-bold text-slate-700">Search</label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-slate-500" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products, keywords, tags…"
                    className="w-full bg-transparent text-sm text-ae-black placeholder:text-slate-400 focus:outline-none"
                    inputMode="search"
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label className="text-xs font-bold text-slate-700">Brand</label>
                <select
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-ae-black focus:outline-none"
                >
                  <option value="all">All brands</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-ae-black focus:outline-none"
                >
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-extrabold tracking-tight text-ae-black">
                  {filtered.length}
                </span>{" "}
                of{" "}
                <span className="font-extrabold tracking-tight text-ae-black">
                  {products.length}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={clear}>
                  Clear filters
                </Button>
                <Button href="/contact">Request a Quote</Button>
              </div>
            </div>
          </Card>
        </MotionInView>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => {
            const brand = brandById(p.brandId);
            const external = Boolean(p.amazonUrl);
            return (
              <MotionInView key={p.id} delay={0.02 * (idx % 6)}>
                <Card className="group h-full overflow-hidden">
                  <div className="relative">
                    <div className="absolute left-4 top-4 z-10 flex gap-2">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-black/10">
                        {p.category}
                      </span>
                      {external ? (
                        <span className="rounded-full bg-ae-red/10 px-3 py-1 text-xs font-bold text-ae-red ring-1 ring-ae-red/20">
                          External
                        </span>
                      ) : null}
                    </div>

                    <Image
                      src={p.image}
                      alt={p.name}
                      width={900}
                      height={600}
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-bold text-slate-600">
                        {brand?.name ?? "—"}
                      </div>
                      {external && p.amazonUrl ? (
                        <Link
                          href={p.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-bold text-ae-black hover:bg-white",
                          )}
                        >
                          Amazon <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </Link>
                      ) : null}
                    </div>

                    <div className="mt-3 text-lg font-extrabold tracking-tight text-ae-black">
                      {p.name}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {p.shortDescription}
                    </p>

                    {p.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Card>
              </MotionInView>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-black/10 bg-white/70 p-8 text-center">
            <div className="text-lg font-extrabold tracking-tight text-ae-black">
              No matches found
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Try removing filters or using a broader search term.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <Button variant="secondary" onClick={clear}>
                Clear filters
              </Button>
              <Button href="/contact">Contact us</Button>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

