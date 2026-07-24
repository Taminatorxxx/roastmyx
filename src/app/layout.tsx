import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  APP_DESCRIPTION,
  APP_DOMAIN,
  APP_NAME,
  APP_TAGLINE,
} from "@/lib/constants";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const url = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [
    "roast X account",
    "Twitter roast",
    "AI roast",
    "personal brand score",
    "X profile analysis",
    "RoastMyX",
    "creator roast",
  ],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    siteName: APP_NAME,
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `/api/og?username=you&score=69&quote=${encodeURIComponent("Your bio is a landing page that converts curiosity into a shrug.")}&archetype=${encodeURIComponent("Algorithm Victim")}&badge=${encodeURIComponent("Certified Roastable")}`,
        width: 1200,
        height: 630,
        alt: "RoastMyX — AI-powered X account roasts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    creator: "@roastmyx",
    images: [
      `/api/og?username=you&score=69&quote=${encodeURIComponent("Your bio is a landing page that converts curiosity into a shrug.")}`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: url,
  },
  other: {
    "theme-color": "#050505",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050505] font-sans text-white antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: APP_NAME,
              url,
              description: APP_DESCRIPTION,
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              publisher: {
                "@type": "Organization",
                name: APP_NAME,
                url: `https://${APP_DOMAIN}`,
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
