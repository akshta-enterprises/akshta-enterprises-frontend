import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-bold text-slate-700">
          <span className="h-2 w-2 rounded-full bg-ae-red" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ae-black sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

