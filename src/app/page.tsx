export default function Home() {
  return <HomeLanding />;
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { getBrands, getContact, getProducts } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MotionInView } from "@/components/ui/MotionInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function HomeLanding() {
  const contact = getContact();
  const brands = getBrands();
  const products = getProducts();

  const categories = Array.from(new Set(products.map((p) => p.category))).slice(
    0,
    6,
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-ae-blue/15 blur-3xl" />
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-ae-red/10 blur-3xl" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <MotionInView>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-bold text-slate-700">
                <span className="h-2 w-2 rounded-full bg-ae-blue" />
                Distributor • Supply • Support
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ae-black sm:text-5xl">
                Security, Networking & IT Hardware —
                <span className="text-ae-blue"> sourced</span> with confidence.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                {contact.companyName} supplies CCTV, networking, access control,
                and IT hardware for homes, offices, warehouses, and enterprise
                deployments across India.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/products">
                  Explore Products <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  href={buildWhatsAppLink(
                    contact.whatsapp,
                    "Hi! I’m looking for a quote. Please share product options and pricing.",
                  )}
                  variant="secondary"
                >
                  WhatsApp for Quote
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { k: "Fast Dispatch", v: "Quick fulfilment & coordination" },
                  { k: "Genuine Supply", v: "Trusted brands and warranties" },
                  { k: "Pre‑sales Help", v: "Right-fit recommendations" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3"
                  >
                    <div className="text-sm font-extrabold tracking-tight text-ae-black">
                      {x.k}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
            </MotionInView>

            <MotionInView delay={0.08}>
              <Card className="relative overflow-hidden p-6 sm:p-8">
                <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-ae-blue/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-ae-black p-3 text-white">
                      <BuildingOffice2Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold tracking-tight text-ae-black">
                        Business-ready supply
                      </div>
                      <div className="text-xs text-slate-600">
                        CCTV • Networking • Access Control
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {categories.slice(0, 4).map((cat) => (
                      <Link
                        key={cat}
                        href={`/products?category=${encodeURIComponent(cat)}`}
                        className="group rounded-2xl border border-black/10 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(2,6,23,0.10)]"
                      >
                        <div className="text-sm font-extrabold tracking-tight text-ae-black">
                          {cat}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Browse curated options
                        </div>
                        <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-ae-blue">
                          View <ArrowRightIcon className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-black/10 bg-gradient-to-r from-ae-blue/10 via-white/60 to-ae-red/10 p-4">
                    <div className="text-sm font-extrabold tracking-tight text-ae-black">
                      Need help choosing?
                    </div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">
                      Tell us your site size and requirement — we’ll recommend
                      the right products.
                    </div>
                    <div className="mt-3">
                      <Button href="/contact" variant="secondary">
                        Share requirements
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </MotionInView>
          </div>
        </Container>
      </section>

      {/* Brands */}
      <section className="py-14 sm:py-16">
        <Container>
          <MotionInView>
            <SectionHeading
              eyebrow="Trusted brands"
              title="Products you can rely on"
              description="We work with leading security and networking brands to ensure dependable performance and availability."
            />
          </MotionInView>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((b, idx) => (
              <MotionInView key={b.id} delay={0.02 * idx}>
                <Card className="flex items-center justify-center p-4 hover:shadow-[0_16px_40px_rgba(2,6,23,0.10)] transition-shadow">
                  <Image
                    src={b.logo}
                    alt={`${b.name} logo`}
                    width={180}
                    height={72}
                    className="h-10 w-auto opacity-95"
                  />
                </Card>
              </MotionInView>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick contact */}
      <section className="py-14 sm:py-16">
        <Container>
          <MotionInView>
            <Card className="overflow-hidden">
              <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-ae-black px-3 py-1 text-xs font-bold text-white">
                    Quick contact
                  </div>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ae-black">
                    Get pricing and availability today.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Share your product interest and quantity — we’ll respond
                    with options, pricing, and delivery timelines.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button href="/contact">
                      Contact Form <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      href={buildWhatsAppLink(
                        contact.whatsapp,
                        "Hi! Please share pricing & availability for my requirement.",
                      )}
                      variant="secondary"
                    >
                      WhatsApp now
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-ae-blue/10 via-white/70 to-ae-red/10 p-6">
                  <div className="text-sm font-extrabold tracking-tight text-ae-black">
                    Contact details
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <div>
                      <span className="font-bold text-ae-black">Phone:</span>{" "}
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-ae-blue hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                    <div>
                      <span className="font-bold text-ae-black">Email:</span>{" "}
                      <a
                        href={`mailto:${contact.primaryEmail}`}
                        className="text-ae-blue hover:underline"
                      >
                        {contact.primaryEmail}
                      </a>
                    </div>
                    <div className="pt-2">
                      <div className="font-bold text-ae-black">Address</div>
                      <div className="mt-1 text-slate-600">
                        {contact.addressLines.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/70 p-4 ring-1 ring-black/10">
                    <div className="text-xs font-bold text-slate-700">
                      Business hours
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-slate-700">
                      {contact.hours.map((h) => (
                        <div
                          key={h.label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-slate-600">{h.label}</span>
                          <span className="font-semibold text-ae-black">
                            {h.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </MotionInView>
        </Container>
      </section>
    </div>
  );
}
