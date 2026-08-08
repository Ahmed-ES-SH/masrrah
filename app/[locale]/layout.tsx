import { ReactNode } from "react";
import { Inter, Amiri } from "next/font/google";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import FloatingContactActions from "../components/global/FloatingContactActions";
import { getSharedMetadata } from "../helpers/getSharedMetadata";
import { getTranslations } from "../helpers/getTranslations";

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
