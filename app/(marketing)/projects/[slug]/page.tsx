import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Reveal } from "@/components/motion/Reveal";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { PageCtaButtons } from "@/components/conversion/PageCtaButtons";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  getAreaBySlug,
  getProjectBySlug,
  listProjects,
  parseBeforeAfter,
} from "@/lib/content";
import { getProjectExtra } from "@/lib/project-extras";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import {
  breadcrumbJsonLd,
  projectJsonLd,
} from "@/lib/seo/json-ld-data";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/site-settings";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return buildPageMetadata({
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.summary,
    path: `/projects/${slug}`,
    image: project.gallery[0],
  });
}

async function ProjectDetailContent({ slug }: { slug: string }) {
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);
  if (!project) notFound();

  const area = await getAreaBySlug(project.areaSlug);
  const beforeAfter = parseBeforeAfter(project.beforeAfter);
  const extra = getProjectExtra(project.slug);
  const moreProjects = (await listProjects()).filter((p) => p.slug !== slug).slice(0, 2);
  const pageUrl = absoluteUrl(`/projects/${project.slug}`);
  const paragraphs =
    extra?.paragraphs ??
    project.body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

  return (
    <>
      <JsonLd data={projectJsonLd(project, pageUrl)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <section className="relative min-h-[min(62vh,560px)] overflow-hidden border-b border-[var(--color-stone)]/15">
        <SafeImage
          src={project.gallery[0]}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          fallbackSrc="/images/projects/kitchen.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/65 to-black/30" />
        <div className="relative z-10 mx-auto flex min-h-[min(62vh,560px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            {PROJECT_TYPE_LABELS[project.type]}
            {area ? (
              <>
                {" · "}
                <Link
                  href={`/areas/${area.slug}`}
                  className="underline-offset-2 hover:underline"
                >
                  {area.name}
                </Link>
              </>
            ) : null}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl text-[var(--color-cream)] sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--color-cream)]/80 sm:text-lg">
            {project.summary}
          </p>
          <PageCtaButtons
            phone={settings.phone}
            primaryLabel="Get a look like this"
            className="mt-8"
          />
        </div>
      </section>

      {extra?.highlights ? (
        <section className="border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)] py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 sm:px-6">
            {extra.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-stone)]/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-cream)]/75"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <ProjectGallery images={project.gallery} title={project.title} />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                Project story
              </h2>
              <div className="mt-6 space-y-4 text-[var(--color-cream)]/80 leading-relaxed">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[1.75rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
                  Scope highlights
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[var(--color-cream)]/80">
                  {(extra?.scope ?? ["Design coordination", "Build execution", "Finish supervision"]).map(
                    (item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[var(--color-orange)]">✓</span>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <PageCtaButtons
                  phone={settings.phone}
                  primaryLabel="Start my project"
                  className="mt-8"
                />
              </div>
            </Reveal>
          </div>

          <BeforeAfter pairs={beforeAfter} title={project.title} />

          {extra?.testimonial ? (
            <Reveal>
              <blockquote className="mt-14 rounded-[1.75rem] border border-[var(--color-orange)]/30 bg-[var(--color-orange)]/10 p-8 text-center">
                <p className="text-xl leading-relaxed text-[var(--color-cream)] sm:text-2xl">
                  “{extra.testimonial.quote}”
                </p>
                <footer className="mt-4 text-sm font-semibold text-[var(--color-orange)]">
                  {extra.testimonial.name}
                </footer>
              </blockquote>
            </Reveal>
          ) : null}

          {moreProjects.length > 0 ? (
            <div className="mt-16 border-t border-[var(--color-stone)]/15 pt-12">
              <Reveal>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-display text-3xl text-[var(--color-cream)]">
                    More work
                  </h2>
                  <Link href="/projects" className="btn-ghost">
                    All projects
                  </Link>
                </div>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {moreProjects.map((item) => (
                  <Reveal key={item.slug}>
                    <Link
                      href={`/projects/${item.slug}`}
                      className="group relative block min-h-[220px] overflow-hidden rounded-[1.5rem] border border-[var(--color-stone)]/15"
                    >
                      <SafeImage
                        src={item.gallery[0]}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        fallbackSrc="/images/projects/kitchen.jpg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="font-display text-xl text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/75">{item.summary}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <EstimateCta />
    </>
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-20 text-[var(--color-cream)]/60">
          Loading…
        </div>
      }
    >
      <ProjectDetailLoader params={params} />
    </Suspense>
  );
}

async function ProjectDetailLoader({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailContent slug={slug} />;
}
