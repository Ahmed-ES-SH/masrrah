import { ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import FloatingContactActions from "../components/global/FloatingContactActions";
import { getSharedMetadata } from "../helpers/getSharedMetadata";
import { getTranslations } from "../helpers/getTranslations";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const thmanyahSans = localFont({
  src: [
    {
      path: "../fonts/thmanyah/thmanyahsans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/thmanyah/thmanyahsans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/thmanyah/thmanyahsans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-thmanyah-sans",
});

interface MainLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = getTranslations(locale, "mainLayout");
  const sharedMetadata = getSharedMetadata(locale, t.title, t.description);
  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function MainLayout({
  children,
  params,
}: MainLayoutProps) {
  const { locale } = await params;

  return (
    <html
      lang={locale ?? "ar"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${thmanyahSans.variable} h-full antialiased`}
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
