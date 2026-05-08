"use client";
import { useMemo, useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { MotionInView } from "@/components/ui/MotionInView";
import { Brand } from "@/lib/types";

const preloadedPdfs = new Set<string>();

function preloadPdf(url: string) {
  if (!url || preloadedPdfs.has(url)) return;

  // Limit preloading to avoid overload
  if (preloadedPdfs.size > 6) return;

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.display = "none";

  document.body.appendChild(iframe);

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 3000);

  preloadedPdfs.add(url);
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function CataloguesClient({ brands }: { brands: Brand[] }) {
  const [query, setQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<null | {
    name: string;
    catalogs: { title: string; url: string }[];
  }>(null);
  const [activePdf, setActivePdf] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  //  preload PDFs of active brand when opened
  useEffect(() => {
    if (!activeBrand) return;

    activeBrand.catalogs.forEach((c) => preloadPdf(c.url));
  }, [activeBrand]);

  // 🔹 Transform pdfs object → array
  const brandsWithCatalogs = useMemo(() => {
    return brands.map((b) => ({
      ...b,
      catalogs: Object.entries(b.pdfs || {}).map(([title, url]) => ({
        title,
        url,
      })),
    }));
  }, [brands]);

  // 🔍 Search
  const filteredBrands = useMemo(() => {
    const q = normalize(query);
    if (!q) return brandsWithCatalogs;

    return brandsWithCatalogs.filter((brand) => {
      const brandMatch = normalize(brand.name).includes(q);

      const catalogMatch = brand.catalogs.some((c) =>
        normalize(c.title).includes(q),
      );

      return brandMatch || catalogMatch;
    });
  }, [query, brandsWithCatalogs]);

  // 🔹 Handle click
  const handleOpen = (brand: (typeof brandsWithCatalogs)[number]) => {
    if (brand.catalogs.length === 1) {
      const url = brand.catalogs[0].url;

      preloadPdf(url); // 🔥 preload
      setIsPdfLoading(true);
      setActivePdf(url);
    } else {
      setActiveBrand({
        name: brand.name,
        catalogs: brand.catalogs,
      });
    }
  };

  // 🔹 Handle PDF close
  const handleClosePdf = () => {
    setActivePdf(null);
    setActiveBrand(null);
  };

  return (
    <div className="py-14">
      <Container>
        <MotionInView>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ae-black sm:text-4xl">
            Product Catalogues
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Browse security, networking, and IT hardware products from top
            brands. Find the right solutions for your business needs.
          </p>
        </MotionInView>
        {/* 🔍 Search */}
        <div className="mb-8 mt-4">
          <div className="flex items-center gap-2 rounded-2xl border px-4 py-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brands or catalogues..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 🧱 Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBrands.map((brand) => {
            const count = brand.catalogs.length;

            if (count === 0) return null;

            return (
              <Card key={brand.id} className="p-6 hover:shadow-xl transition">
                <div className="flex items-center gap-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <div className="font-bold">{brand.name}</div>
                    <div className="text-xs text-slate-500">
                      {count} catalogue{count > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                <button
                  onMouseEnter={() => {
                    const firstPdf = brand.catalogs[0]?.url;
                    if (firstPdf) preloadPdf(firstPdf);
                  }}
                  onClick={() => handleOpen(brand)}
                  className="mt-6 w-full bg-black text-white py-2 rounded-xl text-sm hover:opacity-90 cursor-pointer  transition"
                >
                  {count === 1
                    ? "View Catalogue"
                    : `View Catalogues (${count})`}
                </button>
              </Card>
            );
          })}
        </div>

        {/* ❌ No Results */}
        {filteredBrands.length === 0 && (
          <div className="text-center mt-10">
            <div className="font-bold">No results found</div>
          </div>
        )}
      </Container>

      {/* 🟡 Catalog List Modal */}
      {activeBrand && !activePdf && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setActiveBrand(null)}
        >
          <div
            className="bg-white w-[90%] max-w-md p-6 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">
              {activeBrand.name} Catalogs
            </h2>

            <div className="flex flex-col gap-3">
              {activeBrand.catalogs.map((c) => (
                <button
                  key={c.title}
                  onClick={() => {
                    preloadPdf(c.url); // 🔥 preload
                    setIsPdfLoading(true);
                    setActivePdf(c.url);
                  }}
                  className="text-left border p-3 rounded-lg hover:bg-slate-50 transition"
                >
                  📄 {c.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveBrand(null)}
              className="mt-4 text-sm text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔴 PDF Viewer Modal */}
      {activePdf && (
        <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
          {/* Top bar */}
          <div className="flex justify-between items-center bg-white px-4 py-3 shadow-md">
            <span className="text-sm font-semibold">Catalog Viewer</span>

            <div className="flex gap-4 text-sm">
              <a
                href={activePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Open in New Tab
              </a>
              <a
                href={activePdf}
                download
                className="text-blue-600 hover:text-blue-800"
              >
                Download
              </a>
              <button
                onClick={handleClosePdf}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Close
              </button>
            </div>
          </div>

          {/* PDF Iframe */}
          <div className="relative h-full w-full flex-1">
            {isPdfLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <p className="text-sm text-slate-600">Loading catalog...</p>
                </div>
              </div>
            )}
            <iframe
              src={`${activePdf}#toolbar=1&navpanes=1&view=FitH`}
              className="h-full w-full border-0"
              onLoad={() => setIsPdfLoading(false)}
              title="PDF Viewer"
              allow="fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
