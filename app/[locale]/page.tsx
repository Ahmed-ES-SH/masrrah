import ServicesSection from "../components/home/servicesSection";
import CountriesSection from "../components/home/countriesSection";
import PlatformSection from "../components/home/platformSection";
import PackagesSection from "../components/home/packagesSection";
import FaqSection from "../components/home/faqSection";
import BlogSection from "../components/home/blogSection";
import HeroSwiper from "../components/home/heroSwiper";

export default async function Home() {
  return (
    <>
      <HeroSwiper />
      <ServicesSection />
      <PackagesSection />
      <CountriesSection />
      <PlatformSection />
      <FaqSection />
      <BlogSection />
    </>
  );
}
