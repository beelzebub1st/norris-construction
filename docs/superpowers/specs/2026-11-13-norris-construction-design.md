# Norris Construction — Website Design Spec

**Date:** 2026-11-13  
**Company:** Norris Construction  
**Market:** Miami / South Florida  
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma, PostgreSQL, Resend, Vercel, PostHog (optional)  
**Brand asset:** `1x/Asset 1.png` (logo — safety orange / white / black, industrial slanted wordmark)

---

## 1. Goals

Build a high-converting marketing site that:

1. Wins estimate requests from homeowners seeking luxury custom homes and residential remodeling in Miami / South Florida.
2. Looks premium and distinctive (hybrid luxury + industrial orange accents from the logo).
3. Includes a full marketing OS: CMS, blog, lead pipeline, email automations, area SEO pages, visitor insights, and lightweight A/B experiments.

**Primary CTA:** Estimate / quote form  
**Secondary CTAs:** Click-to-call and SMS/text, always visible (sticky bar on mobile; header actions on desktop)  
**Assistive:** Chat widget (settings-toggled); never replaces the estimate form

---

## 2. Positioning & brand

### Services

- Luxury custom home builds
- High-end renovations / remodeling
- Kitchens
- Bathrooms
- Additions
- Outdoor living

### Personality (decided)

**Hybrid premium Miami craftsmanship:** calm charcoal / stone / white atmosphere, full-bleed project photography, refined typography — with logo **safety orange (`#E06820`)** reserved for CTAs, underlines, and key motion accents. The logo is a hero-level brand signal in the first viewport, not only nav chrome.

### Visual system

| Token | Role |
|-------|------|
| Near-black / deep charcoal | Primary backgrounds, weight |
| Warm stone neutrals | Secondary surfaces, atmosphere (gradients / subtle texture — not flat single fill) |
| White | Primary text on dark; contrast |
| `#E06820` (safety orange) | CTAs, accents, logo alignment only |
| Logo mark | Header + first-viewport brand presence |

**Typography:** **Oswald** (display / brand moments, condensed weight) + **Plus Jakarta Sans** (UI / body). Do not use Inter, Roboto, Arial, or system-ui as the primary brand stack.

**Imagery:** Real project photography as the dominant visual plane. Structured placeholders until assets are supplied. No inset hero cards, no floating badges/stickers on hero media.

**Motion (intentional, 2–3 patterns):** Hero fade / subtle parallax; section scroll reveal; project hover expand. No noise, glow-spam, or decorative particle effects.

---

## 3. Architecture

Two surfaces, one Next.js codebase:

1. **Public marketing site** — conversion + local SEO  
2. **Admin marketing OS** — CMS, leads, automations, settings, visitors, experiments  

```
app/
  (marketing)/     # public pages + layout
  admin/           # authenticated CMS + pipeline
  api/             # content, contact/leads, track, admin CRUD
components/
  layout/          # Header, Footer, StickyCallBar
  sections/        # homepage & shared marketing sections
  projects/        # gallery, filters, before/after
  motion/          # shared Framer Motion helpers
  seo/             # JSON-LD, meta helpers
  admin/           # admin UI modules
lib/
  prisma.ts
  email/           # Resend templates + automation triggers
  leads/           # status transitions, validation
  experiments/     # A/B flag helpers
prisma/
  schema.prisma
public/
  images/          # logo + project media
```

**Data boundary rule:** Marketing sections are presentational. Server components / loaders fetch Prisma data. Admin code must not ship in public client bundles.

---

## 4. Public site map

| Route | Purpose |
|-------|---------|
| `/` | Conversion homepage |
| `/services` | Service index |
| `/services/[slug]` | Service detail + FAQ + related projects + estimate CTA |
| `/projects` | Portfolio with filters (type, area) |
| `/projects/[slug]` | Case study gallery, before/after, specs |
| `/about` | Story; team / license / insurance slots (placeholders OK) |
| `/blog` | Article index |
| `/blog/[slug]` | Article |
| `/areas/[slug]` | Miami-region landers (e.g. Miami Beach, Coral Gables, Brickell, Fort Lauderdale) |
| `/contact` | Full estimate form + call/text |

**SEO:** `sitemap.ts`, `robots.ts`, per-page metadata, LocalBusiness + Project JSON-LD.

---

## 5. Homepage composition

### First viewport (only)

1. Norris logo (hero-level brand signal)  
2. One headline  
3. One short supporting sentence  
4. CTA group: **Get estimate** + **Call / Text**  
5. Edge-to-edge hero project image  

No stats strips, address blocks, schedules, or secondary promos in the first viewport.

### Below the fold (one job per section)

1. Trust strip (license / insurance / years — editable placeholders until real data)  
2. Services  
3. Featured projects  
4. Process  
5. Testimonials (placeholders until supplied)  
6. Area coverage (links to `/areas/[slug]`)  
7. Blog teaser  
8. Final estimate CTA  

Sticky mobile call/text bar on all public pages.

---

## 6. Admin marketing OS

| Module | Capabilities |
|--------|----------------|
| Projects | CRUD, galleries, featured flag, SEO fields |
| Services | CRUD, FAQs, related projects |
| Areas | City landers CRUD |
| Blog | Draft / publish, cover, SEO |
| Testimonials | CRUD, publish state, optional project link |
| Leads | Inbox, detail, notes, status pipeline |
| Submissions | Raw contact/estimate submissions log |
| Email / Automations | Template preview, nurture on/off, send logs |
| Experiments | Hero headline / CTA label variants (max 1–2 at launch) |
| Visitors | Page views, referrer, device |
| Settings | Phone, SMS, email, address, license/insurance text, socials, chat embed toggle |

**Auth:** Password-protected admin (session-based). Single operator is enough for v1; no multi-role CRM permissions.

---

## 7. Data model (logical)

### Content

- **Project** — title, slug, type (`custom_home` \| `remodel` \| `kitchen` \| `bath` \| `addition` \| `outdoor`), areaSlug, summary, body, gallery[], beforeAfter[], featured, seoTitle, seoDescription, publishedAt  
- **Service** — title, slug, heroImage, summary, body, faqs[], relatedProjectIds[], seo fields  
- **Area** — name, slug, headline, body, nearbyServiceSlugs[], seo fields  
- **Post** — title, slug, cover, body, status (`draft` \| `published`), seo fields, publishedAt  
- **Testimonial** — name, quote, rating, projectId?, published  
- **SiteSettings** — singleton: phone, sms, email, address, licenseText, insuranceText, yearsInBusiness, socials, chatEmbedHtml, chatEnabled  

### Leads & growth

- **Lead** — name, phone, email, projectType, area, budgetRange, message, source, utm*, pageUrl, status, notes[], createdAt, updatedAt  
- **Lead.projectType** — same enum as Project.type  
- **Lead.budgetRange** — `under_50k` \| `50_150k` \| `150_500k` \| `500k_plus` \| `not_sure`  
- **Lead.status** — `new` → `contacted` → `qualified` → `quoted` → `won` \| `lost`  
- **VisitorEvent** — path, referrer, userAgent, createdAt  
- **Experiment** — key, variants[], active  
- **EmailLog** — leadId?, template, to, status, error?, createdAt  

---

## 8. Lead flow & automations

```
Visitor → Estimate form (honeypot + rate limit)
       → Validate (client + server)
       → Create Lead (status: new) + Submission record
       → Resend: confirmation to lead
       → Resend: notify Norris inbox
       → Optional nurture (off by default until copy ready):
            Day 2 — what to expect
            Day 5 — project/blog inspiration links
       → Admin advances status; optional internal email on status change
```

Failed email sends are logged on `EmailLog` without blocking lead creation. Chat widget (if enabled) is assistive only.

---

## 9. Growth features (v1 scope)

**In scope**

- Full CMS + blog + area SEO pages  
- Lead pipeline with statuses and notes  
- Resend transactional + optional nurture toggles  
- Visitor tracking board  
- Lightweight A/B (hero headline and/or CTA label), PostHog or DB flags  
- Chat embed behind settings toggle  
- Sticky call/text + primary estimate form everywhere  

**Explicitly out of scope for v1**

- Multi-user roles / full CRM  
- Payments / invoicing  
- Client project portal  
- Heavy A/B beyond 1–2 hero tests  
- Email marketing blast tool (nurture sequences only)

---

## 10. Error handling & security

- Client + server form validation  
- Honeypot field + IP/rate limiting on `/api/contact` (and lead create)  
- Admin routes require authenticated session  
- Upload validation (type/size) for project images  
- No secrets in client; env for `DATABASE_URL`, `RESEND_API_KEY`, auth secret, PostHog key  

---

## 11. Testing

- Estimate form: happy path, validation errors, honeypot rejection  
- Lead status transitions  
- Smoke render: home, service, project, area, contact, blog  
- Email: mocked unit tests; staging smoke with Resend  
- Mobile sticky CTA + `tel:` / `sms:` links  
- Homepage image performance via `next/image`  

---

## 12. Launch checklist (inputs needed)

From Norris / client:

- [ ] Real project photo set + captions  
- [ ] Phone, SMS number, email  
- [ ] Confirmed service cities for `/areas`  
- [ ] License / insurance / years (when available)  
- [ ] Domain + Google Business Profile URL  
- [ ] Chat provider account (optional)  

Infrastructure:

- [ ] Neon (or other) Postgres  
- [ ] Vercel project + env  
- [ ] Resend domain verification  
- [ ] PostHog project (optional)  

Brand:

- [ ] Logo from `1x/Asset 1.png` in `public/`  
- [ ] Favicon derived from logo  

---

## 13. Success criteria

1. Homepage reads as one premium composition; brand is unmistakable without the nav.  
2. A visitor can request an estimate in under 60 seconds from any major page.  
3. Call/text is always one tap away on mobile.  
4. Admin can publish a project, service, area page, and blog post without code.  
5. Every estimate creates a pipeline lead and triggers notify + confirmation email.  
6. Site is fast, mobile-solid, and SEO-ready for Miami-region service queries.

---

## 14. Decisions log

| Topic | Decision |
|-------|----------|
| Business mix | Luxury custom homes + residential remodeling |
| Geography | Miami and South Florida region |
| Conversion | Estimate form primary; call/text secondary always on |
| Photos | Strong real set available (to be supplied into project) |
| Brand personality | Hybrid premium + orange CTA accents |
| Trust proof | Design sections now; real copy/numbers later |
| Product approach | Full growth stack (CMS + blog + pipeline + automations + areas + A/B + chat) |
| Visual companion | Declined — design decisions locked in this spec |
