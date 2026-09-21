import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import PageLoader from "@/app/components/PageLoader";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiwi Connect Digital | AI & Software Development Company",
  description: "Kiwi Connect Digital - Premier software development company in Bhopal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} noise`}>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}