import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageCtaButtons } from "@/components/conversion/PageCtaButtons";
import { EstimateCta } from "@/components/sections/EstimateCta";
import { SafeImage } from "@/components/ui/SafeImage";
import { getServiceExtra } from "@/lib/service-extras";

type RelatedProject = {
  slug: string;
  title: string;
  summary: string;
  gallery: string[];
};

type ServiceDetailViewProps = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  heroImage: string | null;
  faqs: { q: string; a: string }[];
  relatedProjects: RelatedProject[];
  phone: string;
};

export function ServiceDetailView({
  slug,
  title,
  summary,
  body,
  heroImage,
  faqs,
  relatedProjects,
  phone,
}: ServiceDetailViewProps) {
  const extra = getServiceExtra(slug);
  const displayFaqs = faqs.length > 0 ? faqs : (extra?.faqs ?? []);
  const gallery = extra?.gallery ?? [];
  const paragraphs =
    extra?.paragraphs ??
    body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

  return (
    <>
      <section className="relative min-h-[min(70vh,640px)] overflow-hidden border-b border-[var(--color-stone)]/15">
        <SafeImage
          src={heroImage || gallery[0]?.src}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          fallbackSrc="/images/hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-black/35" />
        <div className="relative z-10 mx-auto flex min-h-[min(70vh,640px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
            {extra?.eyebrow ?? "Services"}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-[var(--color-cream)] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--color-cream)]/80 sm:text-lg">
            {extra?.longSummary ?? summary}
          </p>
          <PageCtaButtons phone={phone} className="mt-8" />
        </div>
      </section>

      <section className="section-pad border-b border-[var(--color-stone)]/15">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
              What this service covers
            </h2>
            <div className="mt-6 space-y-4 text-[var(--color-cream)]/80 leading-relaxed">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-[1.75rem] border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
                Included
              </p>
              <ul className="mt-5 space-y-3 text-sm text-[var(--color-cream)]/80">
                {(extra?.includes ?? [
                  "Dedicated project lead",
                  "Transparent estimate",
                  "Permit coordination when required",
                  "Finish supervision",
                  "Punch list closeout",
                ]).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--color-orange)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <PageCtaButtons
                phone={phone}
                primaryLabel="Get this scoped"
                className="mt-8"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="section-pad border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Lookbook
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                Spaces in this category
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item, index) => (
                <Reveal
                  key={`${item.src}-${index}`}
                  className={
                    index === 0 ? "sm:col-span-2 lg:col-span-2" : undefined
                  }
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-[var(--color-stone)]/15 ${
                      index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                  >
                    <SafeImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes={
                        index === 0
                          ? "(max-width: 1024px) 100vw, 66vw"
                          : "(max-width: 1024px) 50vw, 33vw"
                      }
                      fallbackSrc="/images/hero.jpg"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {extra?.process ? (
        <section className="section-pad border-b border-[var(--color-stone)]/15">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                Process
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                How we deliver {title.toLowerCase()}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {extra.process.map((step, index) => (
                <Reveal key={step.title}>
                  <article className="h-full rounded-3xl border border-[var(--color-stone)]/20 bg-[var(--color-ink-soft)] p-6">
                    <span className="font-display text-3xl text-[var(--color-orange)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-xl text-[var(--color-cream)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/70">
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {displayFaqs.length > 0 ? (
        <section className="section-pad border-b border-[var(--color-stone)]/15 bg-[var(--color-ink-soft)]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <h2 className="font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                {title} FAQs
              </h2>
            </Reveal>
            <dl className="mt-8 divide-y divide-[var(--color-stone)]/20 border-y border-[var(--color-stone)]/20">
              {displayFaqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="font-display text-lg text-[var(--color-cream)]">
                    {faq.q}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/70">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <section className="section-pad border-b border-[var(--color-stone)]/15">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange)]">
                    Related work
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-[var(--color-cream)] sm:text-4xl">
                    Projects in this lane
                  </h2>
                </div>
                <Link href="/projects" className="btn-ghost w-fit">
                  All projects
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {relatedProjects.map((project) => (
                <Reveal key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group relative block min-h-[260px] overflow-hidden rounded-[1.75rem] border border-[var(--color-stone)]/15"
                  >
                    <SafeImage
                      src={project.gallery[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      fallbackSrc="/images/projects/kitchen.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-2xl text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/75">{project.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <EstimateCta />
    </>
  );
}
