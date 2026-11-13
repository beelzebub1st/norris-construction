import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Reveal } from "@/components/motion/Reveal";
import { EstimateCta } from "@/components/sections/EstimateCta";
import {
  getAreaBySlug,
  getProjectBySlug,
  listProjects,
  parseBeforeAfter,
} from "@/lib/content";
import { PROJECT_TYPE_LABELS } from "@/lib/project-labels";
import { projectJsonLd } from "@/lib/seo/json-ld-data";
import { siteUrl } from "@/lib/seo/sitemap-paths";

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

  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.summary,
  };
}

async function ProjectDetailContent({ slug }: { slug: string }) {
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const area = await getAreaBySlug(project.areaSlug);
  const beforeAfter = parseBeforeAfter(project.beforeAfter);

  const pageUrl = `${siteUrl()}/projects/${project.slug}`;

  return (
    <>
      <JsonLd data={projectJsonLd(project, pageUrl)} />
      <section className="border-b border-[var(--color-stone)]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-wide text-[var(--color-cream)]/55">
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
          <h1 className="mt-2 font-display text-4xl text-[var(--color-cream)] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-cream)]/75">
            {project.summary}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <ProjectGallery images={project.gallery} title={project.title} />
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl text-[var(--color-cream)]/80 leading-relaxed whitespace-pre-line">
              {project.body}
            </div>
          </Reveal>

          <BeforeAfter pairs={beforeAfter} title={project.title} />
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
