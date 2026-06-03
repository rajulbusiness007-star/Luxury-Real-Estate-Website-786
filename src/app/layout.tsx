import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Aurelia Luxury Estates — World-Class Properties, Curated for You",
  description:
    "Discover the world's most extraordinary luxury residences. From oceanfront villas in Malibu to alpine chalets in Zermatt, Aurelia curates exclusive off-market properties for discerning clients.",
  keywords: [
    "luxury real estate",
    "luxury homes",
    "exclusive properties",
    "villas",
    "penthouses",
    "chalets",
    "high-end real estate",
    "Aurelia Luxury Estates",
  ],
  openGraph: {
    title: "Aurelia Luxury Estates",
    description:
      "Curating the world's most extraordinary residences for discerning clients.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
