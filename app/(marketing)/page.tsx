import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { getHomepageData } from "@/lib/homepage-data";

export default async function HomePage() {
  const {
    settings,
    headline,
    services,
    featuredProjects,
    testimonials,
    areas,
    posts,
  } = await getHomepageData();

  return (
    <>
      <Hero headline={headline} phone={settings.phone} sms={settings.sms} />
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
