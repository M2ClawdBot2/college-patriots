import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Patriots — The Campus Record, Unfiltered",
  description: "Independent student reporting and video dispatches from universities across America.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "College Patriots", description: "The campus record, unfiltered.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "College Patriots", description: "The campus record, unfiltered.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body></html>;
}
