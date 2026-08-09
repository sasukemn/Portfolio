import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/lib/site";
import { BootSequence } from "@/components/services/BootSequence";
import { PolarBackground } from "@/components/services/PolarBackground";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manitra Niaina Ravalison — Software Developer & Systems/Networking Student",
  description:
    "Software Developer, Systems & Networking Student. Building my path toward DevOps & Cloud Engineering. Projects in software, networks, systems and infrastructure.",
  keywords: [
    "software developer",
    "systems",
    "networking",
    "infrastructure",
    "DevOps",
    "cloud",
    "Kali Linux",
    "GNS3",
    "portfolio",
  ],
  metadataBase: new URL("https://localhost:3000"),
  openGraph: {
    title: "Manitra Niaina Ravalison — Northstack",
    description:
      "Software Developer & Systems / Networking Student. Building my path toward DevOps & Cloud Engineering.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-theme="night"
      className={`${plusJakarta.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-ink">
        <SiteProvider>
          <PolarBackground />
          <BootSequence />
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}
