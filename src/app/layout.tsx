import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { getContact } from "@/lib/data";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";

export const metadata: Metadata = {
  icons: {
    icon: "/logo4.PNG",
  },
  title: {
    default: "Akshta Enterprises | Security, Networking & IT Hardware",
    template: "%s | Akshta Enterprises",
  },
  description:
    "Akshta Enterprises is a distributor of security, networking, and IT hardware products in India. CCTV, networking, access control, and professional supply support.",
  applicationName: "Akshta Enterprises",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://akshtaenterprises.com",
  ),
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    title: "Akshta Enterprises",
    description:
      "Distributor of security, networking, and IT hardware products in India.",
    url: "/",
    siteName: "Akshta Enterprises",
    images: [
      {
        url: "/akshta_logo_blue.png",
        width: 1200,
        height: 630,
        alt: "Akshta Enterprises Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
