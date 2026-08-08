import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RequestForm from "../../../components/request/requestForm";
import ServiceHero from "../../../components/service/serviceHero";
import {
  getServiceDetail,
  SERVICE_DETAILS,
  ServiceLocale,
} from "../../../constants/services";
import { getSharedMetadata } from "../../../helpers/getSharedMetadata";

interface ServiceDetailsPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return ["ar", "en"].flatMap((locale) =>
    SERVICE_DETAILS.map((service) => ({
      locale,
      slug: service.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ServiceDetailsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const service = getServiceDetail(slug);
  if (!service) {
    return { title: "Masarrah - مسرة للاستقدام" };
  }

  const copy = service.copy[locale as ServiceLocale];

  const title = `${copy.title} — Masarrah مسرة`;
  const description = `${copy.description} ${copy.clauses.join(" ")}`;

  return {
    title,
    description,
    ...getSharedMetadata(locale, title, description),
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { slug } = await params;

  const service = getServiceDetail(slug);
  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceHero slug={service.slug} />
      <section
        id="request"
        aria-label="request"
        className="scroll-mt-16 lg:scroll-mt-20"
      >
        <RequestForm initialPackage={service.packageKey} />
      </section>
    </>
  );
}