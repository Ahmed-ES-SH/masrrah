import ServicesSection from "../components/home/servicesSection/servicesSection";
import CountriesSection from "../components/home/countriesSection/countriesSection";
import PlatformSection from "../components/home/platformSection/platformSection";
import PackagesSection from "../components/home/packagesSection/packagesSection";
import FaqSection from "../components/home/faqSection/faqSection";
import BlogSection from "../components/home/blogSection/blogSection";
import GovermentsLogos from "../components/home/govermentsLogos/govermentsLogos";
import HeroSwiper from "../components/home/heroSwiper/heroSwiper";
import TestimonialsSection from "../components/home/testimonialsSection/testimonialsSection";
import StepsRecruitmentProcess from "../components/home/stepsRecruitmentProcess/stepsRecruitmentProcess";
import WhoUs from "../components/home/whoUs/whoUs";
import RecruitmentOperations from "../components/home/recruitmentOperations/recruitmentOperations";

export default async function Home() {
  return (
    <>
      <HeroSwiper />
      <WhoUs />
      <ServicesSection />
      <StepsRecruitmentProcess />
      <RecruitmentOperations />
      <PackagesSection />
      <CountriesSection />
      <PlatformSection />
      <FaqSection />
      <GovermentsLogos />
      {/* <TestimonialsSection /> */}
      <BlogSection />
    </>
  );
}
