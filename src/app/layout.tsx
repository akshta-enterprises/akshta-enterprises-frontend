import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { getContact } from "@/lib/data";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";

export const metadata: Metadata = {
  icons: {
    icon: "public/logo4.PNG",
  },
  title: {
    default: "Akshta Enterprises | Security, Networking & IT Hardware",
    template: "%s | Akshta Enterprises",
  },
  description:
    "Akshta Enterprises is a distributor of security, networking, and IT hardware products in India. CCTV, networking, access control, and professional supply support.",
  applicationName: "Akshta Enterprises",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Akshta Enterprises",
    description:
      "Distributor of security, networking, and IT hardware products in India.",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = getContact();

  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader
          companyName={contact.companyName}
          whatsappPhone={contact.whatsapp}
        />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloatingButton phone={contact.whatsapp} />
      </body>
    </html>
  );
}
