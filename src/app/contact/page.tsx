import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { getContact, getProducts } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { MotionInView } from "@/components/ui/MotionInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Akshata Enterprises for product availability, pricing, and procurement support. Send an enquiry via EmailJS or WhatsApp.",
};

export default function ContactPage() {
  const contact = getContact();
  const products = getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category))).sort(
    (a, b) => a.localeCompare(b),
  );

  const interestOptions = ["General Enquiry", ...categories];

  return (
    <div className="py-14 sm:py-16">
      <Container>
        <MotionInView>
          <SectionHeading
            eyebrow="Contact"
            title="Tell us what you need — we’ll respond quickly"
            description="For faster quotes, include quantity and delivery location."
          />
        </MotionInView>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <MotionInView>
              <ContactForm interestOptions={interestOptions} />
            </MotionInView>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-6">
              <MotionInView delay={0.06}>
                <Card className="p-6 sm:p-8">
                  <div className="text-sm font-extrabold tracking-tight text-ae-black">
                    Contact details
                  </div>
                  <div className="mt-4 grid gap-4 text-sm text-slate-700">
                    <div className="flex gap-3">
                      <PhoneIcon className="mt-0.5 h-5 w-5 flex-none text-ae-blue" />
                      <div>
                        <div className="font-bold text-ae-black">Phone</div>
                        <div>
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-ae-blue hover:underline"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <EnvelopeIcon className="mt-0.5 h-5 w-5 flex-none text-ae-blue" />
                      <div>
                        <div className="font-bold text-ae-black">Email</div>
                        <div>
                          <a
                            href={`mailto:${contact.primaryEmail}`}
                            className="text-ae-blue hover:underline"
                          >
                            {contact.primaryEmail}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPinIcon className="mt-0.5 h-5 w-5 flex-none text-ae-blue" />
                      <div>
                        <div className="font-bold text-ae-black">Address</div>
                        <div className="text-slate-600">
                          {contact.addressLines.map((l) => (
                            <div key={l}>{l}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ClockIcon className="mt-0.5 h-5 w-5 flex-none text-ae-blue" />
                      <div>
                        <div className="font-bold text-ae-black">Hours</div>
                        <div className="mt-1 grid gap-1 text-slate-600">
                          {contact.hours.map((h) => (
                            <div
                              key={h.label}
                              className="flex justify-between gap-3"
                            >
                              <span>{h.label}</span>
                              <span className="font-semibold text-ae-black">
                                {h.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button
                      href={buildWhatsAppLink(
                        contact.whatsapp,
                        "Hi! I’d like to enquire about products and pricing.",
                      )}
                      variant="secondary"
                    >
                      WhatsApp us
                    </Button>
                    <Link
                      href={`mailto:${contact.primaryEmail}`}
                      className="text-center text-sm font-bold text-ae-blue hover:underline"
                    >
                      Email directly
                    </Link>
                  </div>
                </Card>
              </MotionInView>

              <MotionInView delay={0.1}>
                <Card className="overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <div className="text-sm font-extrabold tracking-tight text-ae-black">
                      Google Maps
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Use the embedded map for directions.
                    </p>
                  </div>
                  <div className="aspect-[4/3] w-full border-t border-black/10 bg-slate-100">
                    <iframe
                      title={`${contact.companyName} on Google Maps`}
                      src={contact.mapEmbedUrl}
                      className="h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Card>
              </MotionInView>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
