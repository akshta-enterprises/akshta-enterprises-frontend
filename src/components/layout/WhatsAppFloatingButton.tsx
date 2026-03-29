import Link from "next/link";
import { WhatsAppIcon } from "../icons/whatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppFloatingButton({
  phone,
  className,
}: {
  phone: string;
  className?: string;
}) {
  return (
    <Link
      href={buildWhatsAppLink(
        phone,
        "Hi! I’d like to enquire about your products.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(2,6,23,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:bottom-5 sm:right-5 sm:rounded-2xl sm:px-4",
        className,
      )}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}
