import type { Metadata } from "next";
import HeroSection from "../../components/about/heroSection/heroSection";
import StorySection from "../../components/about/storySection/storySection";
import VisionSection from "../../components/about/visionSection/visionSection";
import ValuesSection from "../../components/about/valuesSection/valuesSection";
import { getSharedMetadata } from "../../helpers/getSharedMetadata";
import { getTranslations } from "../../helpers/getTranslations";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale, "about");
  const title = t.meta.title;
  const description = t.meta.description;

  return {
    title,
    description,
    ...getSharedMetadata(locale, title, description),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  await params;

  return (
    <>
      <HeroSection />
      <StorySection />
      <VisionSection />
      <ValuesSection />
    </>
  );
}