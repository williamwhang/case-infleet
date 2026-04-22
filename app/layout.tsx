import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lora } from "next/font/google";
import "./globals.css";

const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Extralight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/GeneralSans-Light.woff2",      weight: "300", style: "normal" },
    { path: "../public/fonts/GeneralSans-Regular.woff2",    weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-Medium.woff2",     weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-Semibold.woff2",   weight: "600", style: "normal" },
    { path: "../public/fonts/GeneralSans-Bold.woff2",       weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "William Whang — Product Designer",
  description: "Portfólio de Product Design · Infleet 2024 · Governança de IA · SaaS B2B Enterprise",
  metadataBase: new URL("https://portfolio-infleet.vercel.app"),
  openGraph: {
    title: "William Whang — Product Designer",
    description: "Como governar erros de IA antes de esperar a IA ficar perfeita.",
    url: "https://portfolio-infleet.vercel.app",
    siteName: "William Whang",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${generalSans.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
