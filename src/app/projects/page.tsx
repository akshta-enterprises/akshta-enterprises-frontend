import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { MotionInView } from "@/components/ui/MotionInView";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects / Clients",
  description:
    "A static showcase of recent deployments and client work across security, networking, and access control.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="py-14 sm:py-16">
      <Container>
        <MotionInView>
          <SectionHeading
            eyebrow="Showcase"
            title="Projects & client work"
            description="A curated snapshot of deployments we support — built for clarity, not hype."
          />
        </MotionInView>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <MotionInView key={p.id} delay={0.03 * (idx % 6)}>
              <Card className="group h-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={1200}
                  height={700}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="p-6">
                  <div className="text-xs font-bold text-slate-600">{p.client}</div>
                  <div className="mt-2 text-lg font-extrabold tracking-tight text-ae-black">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.description}</p>

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
          ))}
        </div>
      </Container>
    </div>
  );
}

