import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  HeroExperiment,
  HeroExperimentFallback,
} from "@/components/sections/HeroExperiment";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HomeStorySection } from "@/components/sections/HomeStorySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { InteractiveBeforeAfter } from "@/components/sections/InteractiveBeforeAfter";
import { StatsCounters } from "@/components/sections/StatsCounters";
import { ProjectMagnet } from "@/components/sections/ProjectMagnet";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GuaranteesSection } from "@/components/sections/GuaranteesSection";
import { ClimateCraftSection } from "@/components/sections/ClimateCraftSection";
import { CinematicBreak } from "@/components/sections/CinematicBreak";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ConversionFaq } from "@/components/sections/ConversionFaq";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { LeadMagnetBand } from "@/components/sections/LeadMagnetBand";
import { IdealFitSection } from "@/components/sections/IdealFitSection";
import { OwnerFitSection } from "@/components/sections/OwnerFitSection";
import { HomeLeadSplit } from "@/components/sections/HomeLeadSplit";
import { getHomepageData } from "@/lib/homepage-data";
import { HOME_FAQS } from "@/lib/seo/home-faqs";
import {
  faqJsonLd,
  localBusinessJsonLd,
} from "@/lib/seo/json-ld-data";
import {
  buildPageMetadata,
  DEFAULT_DESCRIPTION,
} from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Norris Construction | Commercial Construction & Renovations",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  image: "/images/hero.jpg",
  absoluteTitle: true,
});

export default async function HomePage() {
  const {
    settings,
    services,
    featuredProjects,
    testimonials,
    areas,
    posts,
  } = await getHomepageData();

  const faqSchema = faqJsonLd([...HOME_FAQS]);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <Suspense
        fallback={
          <HeroExperimentFallback phone={settings.phone} sms={settings.sms} />
        }
      >
        <HeroExperiment />
      </Suspense>
      <TrustStrip
        licenseText={settings.licenseText}
        insuranceText={settings.insuranceText}
        yearsInBusiness={settings.yearsInBusiness}
      />
      <StatsCounters />
      <HomeStorySection />
      <ServicesSection services={services} />
      <IdealFitSection />
      <LeadMagnetBand phone={settings.phone} />
      <InteractiveBeforeAfter />
      <FeaturedProjects projects={featuredProjects} />
      <ProjectMagnet projects={featuredProjects} />
      <ClimateCraftSection />
      <OwnerFitSection />
      <ProcessSection />
      <GuaranteesSection />
      <CinematicBreak />
      <TestimonialsSection testimonials={testimonials} />
      <AreasSection areas={areas} />
      <HomeLeadSplit phone={settings.phone} />
      <ConversionFaq />
      <BlogTeaser posts={posts} />
      <EstimateCta />
    </>
  );
}
