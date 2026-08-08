import RequestForm from "../../components/request/requestForm";
import {
  RECRUITMENT_PACKAGES,
  RecruitmentPackageKey,
} from "../../constants/packages";

interface RequestPageProps {
  searchParams: Promise<{
    package?: string | string[];
  }>;
}

function getInitialPackage(value: string | string[] | undefined) {
  const requestedPackage = Array.isArray(value) ? value[0] : value;
  const isPackageKey = RECRUITMENT_PACKAGES.some(
    (packageItem) => packageItem.key === requestedPackage,
  );

  return (isPackageKey ? requestedPackage : "household") as RecruitmentPackageKey;
}

export default async function RequestPage({
  searchParams,
}: RequestPageProps) {
  const params = await searchParams;

  return <RequestForm initialPackage={getInitialPackage(params.package)} />;
}
