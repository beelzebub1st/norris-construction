import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { Reveal } from "@/components/motion/Reveal";
import {
  getProjectsByIds,
  getServiceBySlug,
  listServices,
  parseServiceFaqs,
} from "@/lib/content";

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

  return {
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.summary,
  };
}

async function ServiceDetailContent({ slug }: { slug: string }) {
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const faqs = parseServiceFaqs(service.faqs);
  const relatedProjects = await getProjectsByIds(service.relatedProjectIds);

  return (
    <>
      <section className="border-b border-[var(--color-stone)]/15">
        {service.heroImage ? (
          <div className="relative aspect-[21/9] w-full max-h-[28rem] bg-[var(--color-stone)]/10">
            <Image
              src={service.heroImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : null}
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h1 className="font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-cream)]/75">
            {service.summary}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="text-[var(--color-cream)]/80 leading-relaxed whitespace-pre-line">
              {service.body}
            </div>
          </Reveal>

          {faqs.length > 0 ? (
            <Reveal>
              <h2 className="mt-12 font-display text-2xl text-[var(--color-cream)]">
                FAQs
              </h2>
              <dl className="mt-6 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
                {faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <dt className="font-medium text-[var(--color-cream)]">
                      {faq.q}
                    </dt>
                    <dd className="mt-2 text-sm text-[var(--color-cream)]/75">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}

          {relatedProjects.length > 0 ? (
            <Reveal>
              <h2 className="mt-12 font-display text-2xl text-[var(--color-cream)]">
                Related projects
              </h2>
              <ul className="mt-6 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
                {relatedProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block py-5 transition-colors hover:text-[var(--color-orange)]"
                    >
                      <span className="font-display text-lg text-[var(--color-cream)]">
                        {project.title}
                      </span>
                      <p className="mt-1 text-sm text-[var(--color-cream)]/70">
                        {project.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      <EstimateCta />
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
