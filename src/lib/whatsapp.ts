export function normalizePhoneForWaMe(phone: string): string {
  // wa.me expects digits only (country code included), no "+" or spaces.
  return phone.replace(/[^\d]/g, "");
}

export function buildWhatsAppLink(phone: string, message?: string): string {
  const normalized = normalizePhoneForWaMe(phone);
  const base = `https://wa.me/${normalized}`;
  if (!message) return base;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

