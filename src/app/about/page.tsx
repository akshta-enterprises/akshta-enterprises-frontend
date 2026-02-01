import type { Metadata } from "next";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { MotionInView } from "@/components/ui/MotionInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getContact } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Akshta Enterprises — our mission, service areas, and how we support security and networking deployments.",
};

export default function AboutPage() {
  const contact = getContact();

  return (
    <div className="py-14 sm:py-16">
      <Container>
        <MotionInView>
          <SectionHeading
            eyebrow="About us"
            title="A dependable hardware partner for security and networking"
            description="We help businesses and installers source the right products — with clarity, speed, and consistent support."
          />
        </MotionInView>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "What we do",
              desc: "Distribution of CCTV, networking, access control, and IT hardware—ideal for office, retail, and industrial deployments.",
            },
            {
              title: "How we help",
              desc: "Pre‑sales guidance, product selection, compatibility checks, and procurement support—so you buy the right fit.",
            },
            {
              title: "Who we serve",
              desc: "Businesses, system integrators, installers, and procurement teams looking for reliable supply and transparent guidance.",
            },
          ].map((x, idx) => (
            <MotionInView key={x.title} delay={0.03 * idx}>
              <Card className="p-6">
                <div className="text-lg font-extrabold tracking-tight text-ae-black">
                  {x.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {x.desc}
                </p>
              </Card>
            </MotionInView>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <MotionInView>
            <Card className="p-8">
              <div className="text-sm font-bold text-slate-700">Mission</div>
              <div className="mt-3 text-2xl font-extrabold tracking-tight text-ae-black">
                Make reliable hardware sourcing simple.
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                We aim to reduce uncertainty in product selection and supply by
                offering straightforward guidance and dependable fulfilment.
              </p>
            </Card>
          </MotionInView>

          <MotionInView delay={0.08}>
            <Card className="p-8">
              <div className="text-sm font-bold text-slate-700">Values</div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                {[
                  "Clarity over jargon — we recommend what fits your need.",
                  "Reliability — genuine products and stable supply coordination.",
                  "Professional support — responsive communication from enquiry to delivery.",
                  "Long-term relationships — we grow with our customers’ deployments.",
                ].map((v) => (
                  <li key={v} className="flex gap-3">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-ae-blue" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </MotionInView>
        </div>

        <MotionInView>
          <div className="mt-12 rounded-3xl border border-black/10 bg-gradient-to-r from-ae-blue/10 via-white/70 to-ae-red/10 p-8">
            <div className="text-sm font-bold text-slate-700">
              Service areas
            </div>
            <div className="mt-3 text-xl font-extrabold tracking-tight text-ae-black">
              India-wide supply with local responsiveness.
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Based in India, we support orders across major cities and regions.
              Share your location and requirement — we’ll confirm availability
              and timelines.
            </p>
            <div className="mt-5 text-sm font-semibold text-ae-black">
              Contact: <span className="text-slate-700">{contact.phone}</span> •{" "}
              <span className="text-slate-700">{contact.primaryEmail}</span>
            </div>
          </div>
        </MotionInView>
      </Container>
    </div>
  );
}
