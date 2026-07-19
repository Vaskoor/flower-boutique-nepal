import type { Metadata } from "next";
import { Cardo, Libre_Franklin, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cardo",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-libre-franklin",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Suman Florals — Premium Flower Boutique Nepal",
  description: "Nepal's most trusted online flower delivery service. Fresh bouquets, same-day delivery across Kathmandu, Pokhara, Biratnagar & more.",
  openGraph: {
    title: "Suman Florals — Premium Flower Boutique Nepal",
    description: "Handcrafted bouquets delivered across Nepal. Same-day delivery available.",
    type: "website",
    locale: "en_NP",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cardo.variable} ${libreFranklin.variable} ${dmSans.variable} ${plusJakarta.variable}`}
    >
      <body className="font-body" style={{ backgroundColor: "#FFF9FB" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}