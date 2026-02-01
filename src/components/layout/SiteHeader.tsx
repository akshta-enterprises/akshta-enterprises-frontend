"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products & Services" },
  { href: "/projects", label: "Projects / Clients" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({
  companyName,
  whatsappPhone,
}: {
  companyName: string;
  whatsappPhone: string;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-ae-black text-white grid place-items-center shadow-sm ring-1 ring-black/10">
            <span className="text-sm font-extrabold tracking-tight">AE</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-tight text-ae-black">
              {companyName}
            </div>
            <div className="text-xs text-slate-600">Security • Networking • IT</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-semibold tracking-tight transition-colors",
                  active ? "bg-black/5 text-ae-black" : "text-slate-700 hover:bg-black/5",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={buildWhatsAppLink(
              whatsappPhone,
              "Hi! I’m interested in your products/services. Please share details.",
            )}
            variant="secondary"
            className="hidden sm:inline-flex"
          >
            WhatsApp
          </Button>
          <Button href="/contact" className="hidden sm:inline-flex">
            Get a Quote
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-black/5 md:hidden"
            onClick={() => {
              const el = document.getElementById("mobile-nav");
              el?.classList.toggle("hidden");
            }}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="hidden border-t border-black/10 md:hidden">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="grid gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-semibold tracking-tight transition-colors",
                    active ? "bg-black/5 text-ae-black" : "text-slate-700 hover:bg-black/5",
                  )}
                  onClick={() => {
                    document.getElementById("mobile-nav")?.classList.add("hidden");
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              href={buildWhatsAppLink(
                whatsappPhone,
                "Hi! I’m interested in your products/services. Please share details.",
              )}
              variant="secondary"
              className="w-full"
            >
              WhatsApp
            </Button>
            <Button href="/contact" className="w-full">
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

