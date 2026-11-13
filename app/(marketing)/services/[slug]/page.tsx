import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import {
  getProjectsByIds,
  getServiceBySlug,
  listServices,
  parseServiceFaqs,
} from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getServiceExtra } from "@/lib/service-extras";
import { getSiteSettings } from "@/lib/site-settings";

export const instant = false;

export async function generateStaticParams() {
  const services = await listServices();
  return services.map((service) => ({ slug: service.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  const extra = getServiceExtra(slug);
  const title = service.seoTitle ?? service.title;
  const description =
    service.seoDescription ?? extra?.longSummary ?? service.summary;

  return buildPageMetadata({
    title,
    description,
    path: `/services/${slug}`,
    image: service.heroImage,
  });
}

async function ServiceDetailContent({ slug }: { slug: string }) {
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);
  if (!service) notFound();

  const faqs = parseServiceFaqs(service.faqs);
  const relatedProjects = await getProjectsByIds(service.relatedProjectIds);
  const faqSchema = faqJsonLd(faqs);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          title: service.title,
          description: service.summary,
          path: `/services/${service.slug}`,
          image: service.heroImage,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <ServiceDetailView
        slug={service.slug}
        title={service.title}
        summary={service.summary}
        body={service.body}
        heroImage={service.heroImage}
        faqs={faqs}
        relatedProjects={relatedProjects.map((p) => ({
          slug: p.slug,
          title: p.title,
          summary: p.summary,
          gallery: p.gallery,
        }))}
        phone={settings.phone}
      />
    </>
  );
}

export default function ServiceDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20 text-[var(--color-cream)]/60">
          Loading…
        </div>
      }
    >
      <ServiceDetailLoader params={params} />
    </Suspense>
  );
}

async function ServiceDetailLoader({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceDetailContent slug={slug} />;
}
