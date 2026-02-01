import Link from "next/link";
import { getContact } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function SiteFooter() {
  const contact = getContact();

  return (
    <footer className="border-t border-black/10 bg-white/40">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-ae-black">
              {contact.companyName}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{contact.tagline}</p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link
                href={buildWhatsAppLink(contact.whatsapp)}
                className="font-semibold text-ae-blue hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Link>
              <Link href="/contact" className="font-semibold text-ae-blue hover:underline">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-ae-black">Quick Links</div>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              <li>
                <Link className="hover:underline" href="/products">
                  Products & Services
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/projects">
                  Projects / Clients
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold text-ae-black">Contact</div>
            <div className="mt-3 text-sm leading-6 text-slate-700">
              <div>{contact.phone}</div>
              <div className="text-slate-600">{contact.primaryEmail}</div>
              <div className="mt-3 text-slate-600">
                {contact.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {contact.companyName}. All rights reserved.
          </div>
          <div>Built for performance • Static-first • Vercel-ready</div>
        </div>
      </Container>
    </footer>
  );
}

