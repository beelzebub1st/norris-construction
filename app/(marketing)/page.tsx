import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  HeroExperiment,
  HeroExperimentFallback,
} from "@/components/sections/HeroExperiment";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { getHomepageData } from "@/lib/homepage-data";
import { localBusinessJsonLd } from "@/lib/seo/json-ld-data";

export default async function HomePage() {
  const {
    settings,
    services,
    featuredProjects,
    testimonials,
    areas,
    posts,
  } = await getHomepageData();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
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
      <ServicesSection services={services} />
      <FeaturedProjects projects={featuredProjects} />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <AreasSection areas={areas} />
      <BlogTeaser posts={posts} />
      <EstimateCta />
    </>
  );
}
