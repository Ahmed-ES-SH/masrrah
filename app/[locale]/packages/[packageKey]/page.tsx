import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageHero from "../../../components/package/packageHero";
import RequestForm from "../../../components/request/requestForm";
import {
  RECRUITMENT_PACKAGES,
  RecruitmentPackageKey,
} from "../../../constants/packages";
import { getTranslations } from "../../../helpers/getTranslations";
import { getSharedMetadata } from "../../../helpers/getSharedMetadata";

interface PackageDetailsPageProps {
  params: Promise<{
    locale: string;
    packageKey: string;
  }>;
}

function isPackageKey(value: string): value is RecruitmentPackageKey {
  return RECRUITMENT_PACKAGES.some(
    (packageItem) => packageItem.key === value,
  );
}

export function generateStaticParams() {
  return ["ar", "en"].flatMap((locale) =>
    RECRUITMENT_PACKAGES.map((packageItem) => ({
      locale,
      packageKey: packageItem.key,
    })),
  );
}

export async function generateMetadata({
  params,
}: PackageDetailsPageProps): Promise<Metadata> {
  const { locale, packageKey } = await params;

  if (!isPackageKey(packageKey)) {
    return { title: "Masarrah HR - مسرة إتش أر للاستقدام" };
  }

  const translations = getTranslations(locale);
  const copy = translations.packages.items[packageKey];

  const title = `${copy.label} — ${copy.title} | Masarrah HR مسرة إتش أر`;
  const description = `${copy.shortDescription}. ${copy.description}.`;

  return {
    title,
    description,
    ...getSharedMetadata(locale, title, description),
  };
}

export default async function PackageDetailsPage({
  params,
}: PackageDetailsPageProps) {
  const { packageKey } = await params;

  if (!isPackageKey(packageKey)) {
    notFound();
  }

  return (
    <>
      <PackageHero packageKey={packageKey} />
      <section
        id="request"
        aria-label="request"
        className="scroll-mt-20"
      >
        <RequestForm initialPackage={packageKey} />
      </section>
    </>
  );
}
