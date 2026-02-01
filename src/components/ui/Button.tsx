import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ae-blue text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] hover:bg-blue-600",
  secondary:
    "bg-white/80 text-ae-black ring-1 ring-black/10 hover:bg-white shadow-sm",
  ghost: "bg-transparent text-ae-black hover:bg-black/5",
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  target,
  rel,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ae-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:pointer-events-none";

  if (href) {
    const isExternal = href.startsWith("http");
    const linkRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);
    const linkTarget = target ?? (isExternal ? "_blank" : undefined);
    return (
      <Link
        href={href}
        target={linkTarget}
        rel={linkRel}
        className={cn(base, variantClasses[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
}
