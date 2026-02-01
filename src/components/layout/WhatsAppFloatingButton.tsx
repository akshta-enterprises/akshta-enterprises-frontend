import Link from "next/link";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
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
      href={buildWhatsAppLink(phone, "Hi! I’d like to enquire about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(2,6,23,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.98]",
        className,
      )}
    >
      <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}

