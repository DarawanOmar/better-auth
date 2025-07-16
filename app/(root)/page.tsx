import FAQsTwo from "@/components/faqs-2";
import FeaturesSection from "@/components/features-8";
import HeroSection from "@/components/hero-section";
import IntegrationsSection from "@/components/integrations-5";
import Pricing from "@/components/pricing";
import StatsSection from "@/components/stats";
import TeamSection from "@/components/team";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <IntegrationsSection />
      <TeamSection />
      <Pricing />
      <FAQsTwo />
    </>
  );
}
