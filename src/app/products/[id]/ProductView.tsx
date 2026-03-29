"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type ProductViewProps = {
  product: Product;
  brandName?: string;
  whatsAppHref: string;
};

function prettifyKey(value: string) {
  return value.replace(/[_-]+/g, " ");
}

export default function ProductView({
  product,
  brandName,
  whatsAppHref,
}: ProductViewProps) {
  const gallery = useMemo(() => {
    const imageList =
      product.images?.map((img) => ({
        src: img.next_path,
        primary: Boolean(img.is_primary),
      })) ?? [];

    if (imageList.length > 0) {
      return imageList;
    }

    return product.image ? [{ src: product.image, primary: true }] : [];
  }, [product.image, product.images]);

  const primaryIndex = Math.max(
    gallery.findIndex((image) => image.primary),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(primaryIndex);

  const activeImage = gallery[activeIndex]?.src ?? product.image;
  const specsEntries = product.specs ? Object.entries(product.specs) : [];
  const spotlightSpecs = specsEntries.slice(0, 4);
  const hasDetailedSpecs = specsEntries.length > 4;

  const showPrev = () => {
    setActiveIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="pt-8 pb-24 sm:py-12 lg:py-16">
      <Container>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-bold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-ae-blue" />
            Product Details
          </div>
          <div className="mt-5">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-ae-black"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to products
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="min-w-0">
            <Card className="overflow-hidden">
              <div className="relative bg-gradient-to-br from-slate-50 via-white to-ae-blue/5 px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
                <div className="pointer-events-none absolute inset-x-10 top-6 h-32 rounded-full bg-ae-blue/10 blur-3xl" />
                <div className="relative mx-auto flex max-w-3xl flex-col">
                  <div className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(2,6,23,0.08)] sm:aspect-[4/3] sm:rounded-[26px] md:min-h-[420px] lg:min-h-[500px]">
                    {activeImage ? (
                      <Image
                        src={activeImage}
                        alt={product.name}
                        fill
                        priority
                        sizes="(min-width: 1280px) 45vw, (min-width: 640px) 80vw, 100vw"
                        className="object-contain p-4 sm:p-6 lg:p-8"
                      />
                    ) : null}

                    {gallery.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={showPrev}
                          className="absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-ae-black shadow-sm transition hover:bg-white sm:left-3 sm:h-10 sm:w-10"
                          aria-label="Show previous image"
                        >
                          <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={showNext}
                          className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-ae-black shadow-sm transition hover:bg-white sm:right-3 sm:h-10 sm:w-10"
                          aria-label="Show next image"
                        >
                          <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </>
                    ) : null}
                  </div>

                  {gallery.length > 1 ? (
                    <div className="mt-4 sm:mt-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                          Gallery
                        </div>
                        <div className="text-xs font-semibold text-slate-500">
                          {activeIndex + 1} / {gallery.length}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 pr-1 sm:gap-3">
                        {gallery.map((image, index) => (
                          <button
                            key={`${image.src}-${index}`}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                              "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border bg-white transition sm:h-20 sm:w-20",
                              index === activeIndex
                                ? "border-ae-blue shadow-[0_12px_24px_rgba(37,99,235,0.18)]"
                                : "border-black/10 hover:border-black/20",
                            )}
                            aria-label={`Show image ${index + 1}`}
                            aria-pressed={index === activeIndex}
                          >
                            <Image
                              src={image.src}
                              alt={`${product.name} thumbnail ${index + 1}`}
                              fill
                              sizes="min(20vw, 80px)"
                              className="object-contain p-2"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Card>
          </div>

          <div className="min-w-0 xl:sticky xl:top-24 xl:self-start">
            <div className="space-y-6">
              <Card className="relative overflow-hidden p-5 sm:p-6 lg:p-7">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-ae-red/10 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-start gap-2">
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-black/10 break-words">
                      {product.category}
                    </span>
                    {brandName ? (
                      <span className="rounded-full bg-ae-blue/10 px-3 py-1 text-xs font-bold text-ae-blue ring-1 ring-ae-blue/15 break-words">
                        {brandName}
                      </span>
                    ) : null}
                    {product.model ? (
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-black/10 break-words">
                        Model: {product.model}
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mt-4 break-words text-2xl font-extrabold tracking-tight text-ae-black sm:text-3xl lg:text-4xl">
                    {product.name}
                  </h1>
                  <p className="mt-4 max-w-2xl break-words text-sm leading-7 text-slate-600 sm:text-base">
                    {product.shortDescription}
                  </p>

                  {product.tags?.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-slate-700 break-words"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button href="/contact" className="w-full justify-center">
                      Request a Quote
                    </Button>
                    <Button
                      href={whatsAppHref}
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      WhatsApp Inquiry
                    </Button>
                  </div>
                </div>
              </Card>

              {spotlightSpecs.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {spotlightSpecs.map(([key, value]) => (
                    <Card key={key} className="p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                        {prettifyKey(key)}
                      </div>
                      <div className="mt-3 whitespace-pre-line break-words text-sm font-semibold leading-6 text-ae-black">
                        {String(value)}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {hasDetailedSpecs ? (
          <div>
            <section className="mt-8 sm:mt-10">
              <Card className="overflow-hidden">
                <div className="border-b border-black/10 bg-white/70 px-5 py-5 sm:px-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-bold text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-ae-red" />
                        Technical Details
                      </div>
                      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ae-black">
                        Specifications
                      </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600">
                      Clean, scannable specifications laid out for quick review
                      on desktop and mobile.
                    </p>
                  </div>
                </div>

                {specsEntries.length > 0 ? (
                  <div
                    className={cn("bg-black/5", "grid gap-px sm:grid-cols-2")}
                  >
                    {specsEntries.map(([key, value]) => (
                      <div key={key} className="bg-white/80 p-5 sm:p-6">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                          {prettifyKey(key)}
                        </div>
                        <div className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-slate-700">
                          {String(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-6 py-10 text-sm text-slate-600 sm:px-8">
                    No technical specifications are listed for this product yet.
                  </div>
                )}
              </Card>
            </section>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
