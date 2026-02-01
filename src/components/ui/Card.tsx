import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white/70 shadow-[0_12px_30px_rgba(2,6,23,0.08)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

