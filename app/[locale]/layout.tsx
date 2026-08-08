import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import FloatingContactActions from "../components/global/FloatingContactActions";
import { getTranslations } from "../helpers/getTranslations";
import { getSharedMetadata } from "../helpers/getSharedMetadata";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
});

interface MainLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MainLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  const copy = getTranslations(locale, "mainLayout");

  return {
    title: copy.title,
    description: copy.description,
    ...getSharedMetadata(
      locale,
      copy.title,
      copy.description,
      copy.ogImageAlt,
      copy.keywords,
    ),
  };
}

export default async function MainLayout({
  children,
  params,
}: MainLayoutProps) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-body text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContactActions />
      </body>
    </html>
  );
}
