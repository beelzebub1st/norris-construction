# Norris Construction Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a high-converting Next.js marketing site + admin marketing OS for Norris Construction (Miami / South Florida luxury homes & remodeling) with CMS, blog, lead pipeline, email, area SEO, visitors, A/B, and chat.

**Architecture:** One Next.js App Router codebase with `(marketing)` public routes and `admin` authenticated CMS. Prisma + PostgreSQL for content and leads; Resend for transactional/nurture email; Framer Motion for 2–3 intentional motions; SiteSettings singleton drives phone/SMS/chat. Marketing sections stay presentational; server loaders own data.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, Prisma, PostgreSQL (Neon), Resend, Vitest, bcryptjs + iron-session (admin auth), Vercel

**Spec:** `docs/superpowers/specs/2026-11-13-norris-construction-design.md`

## Global Constraints

- Brand orange CTA accent: `#E06820` only on CTAs/accents (not purple themes, not cream/terracotta AI defaults)
- Fonts: Oswald (display) + Plus Jakarta Sans (UI/body) — never Inter/Roboto/Arial as primary
- First viewport: logo + one headline + one sentence + CTA group + full-bleed hero only
- Primary CTA = estimate form; secondary = call/text always visible; chat assistive only
- Trust/testimonial copy may be placeholders until client supplies real data
- Logo source: `1x/Asset 1.png` → copy to `public/images/logo.png`
- No payments, multi-role CRM, or client portal in v1
- Nurture emails off by default until copy ready
- Max 1–2 A/B experiments at launch (hero headline and/or CTA label)

---

## File structure (create)

```
package.json
next.config.ts
tsconfig.json
tailwind / postcss / globals as scaffolded
.env.example
vitest.config.ts
prisma/schema.prisma
prisma/seed.ts
app/layout.tsx
app/globals.css
app/robots.ts
app/sitemap.ts
app/(marketing)/layout.tsx
app/(marketing)/page.tsx
app/(marketing)/services/page.tsx
app/(marketing)/services/[slug]/page.tsx
app/(marketing)/projects/page.tsx
app/(marketing)/projects/[slug]/page.tsx
app/(marketing)/about/page.tsx
app/(marketing)/contact/page.tsx
app/(marketing)/blog/page.tsx
app/(marketing)/blog/[slug]/page.tsx
app/(marketing)/areas/[slug]/page.tsx
app/admin/login/page.tsx
app/admin/(dashboard)/layout.tsx
app/admin/(dashboard)/page.tsx
app/admin/(dashboard)/projects/page.tsx
app/admin/(dashboard)/projects/[id]/page.tsx
app/admin/(dashboard)/services/page.tsx
app/admin/(dashboard)/areas/page.tsx
app/admin/(dashboard)/blog/page.tsx
app/admin/(dashboard)/testimonials/page.tsx
app/admin/(dashboard)/leads/page.tsx
app/admin/(dashboard)/leads/[id]/page.tsx
app/admin/(dashboard)/submissions/page.tsx
app/admin/(dashboard)/automations/page.tsx
app/admin/(dashboard)/experiments/page.tsx
app/admin/(dashboard)/visitors/page.tsx
app/admin/(dashboard)/settings/page.tsx
app/api/contact/route.ts
app/api/track/route.ts
app/api/admin/login/route.ts
app/api/admin/logout/route.ts
app/api/admin/leads/[id]/route.ts
app/api/cron/nurture/route.ts
components/layout/Header.tsx
components/layout/Footer.tsx
components/layout/StickyCallBar.tsx
components/sections/Hero.tsx
components/sections/TrustStrip.tsx
components/sections/ServicesSection.tsx
components/sections/FeaturedProjects.tsx
components/sections/ProcessSection.tsx
components/sections/TestimonialsSection.tsx
components/sections/AreasSection.tsx
components/sections/BlogTeaser.tsx
components/sections/EstimateCta.tsx
components/sections/ContactForm.tsx
components/projects/ProjectFilters.tsx
components/projects/ProjectGallery.tsx
components/projects/BeforeAfter.tsx
components/motion/Reveal.tsx
components/motion/HeroMotion.tsx
components/seo/JsonLd.tsx
components/ChatWidget.tsx
components/VisitorTracker.tsx
components/admin/* (forms, tables, status select)
lib/prisma.ts
lib/site-settings.ts
lib/leads/validate.ts
lib/leads/transitions.ts
lib/leads/create-lead.ts
lib/email/resend.ts
lib/email/templates.ts
lib/email/send.ts
lib/experiments/resolve.ts
lib/auth/session.ts
lib/rate-limit.ts
lib/types.ts
public/images/logo.png
public/images/placeholders/hero.jpg
tests/leads/validate.test.ts
tests/leads/transitions.test.ts
tests/email/send.test.ts
tests/api/contact.test.ts
```

---

### Task 1: Scaffold Next.js app + brand tokens + Vitest

**Files:**
- Create: entire Next.js app in repo root (`c:\Users\FindMeAnywhere\Desktop\Mikenewestsite`)
- Create: `app/globals.css`, `app/layout.tsx`, `.env.example`, `vitest.config.ts`
- Create: `public/images/logo.png` (copy from `1x/Asset 1.png`)
- Test: `tests/smoke/brand-tokens.test.ts`

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev`; CSS variables `--color-orange: #E06820`, `--font-display`, `--font-body`

- [ ] **Step 1: Scaffold**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --turbopack --yes
npm install framer-motion @prisma/client resend bcryptjs iron-session zod
npm install -D prisma vitest @vitejs/plugin-react vite-tsconfig-paths
npx prisma init
```

Copy logo:

```bash
mkdir public\images\placeholders
copy "1x\Asset 1.png" public\images\logo.png
```

- [ ] **Step 2: Write failing brand-token test**

Create `tests/smoke/brand-tokens.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("brand tokens", () => {
  it("defines safety orange #E06820 in globals.css", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toMatch(/#E06820/i);
  });
});
```

- [ ] **Step 3: Run test — expect FAIL**

```bash
npx vitest run tests/smoke/brand-tokens.test.ts
```

Expected: FAIL (token missing or file incomplete)

- [ ] **Step 4: Implement globals + root layout fonts**

`app/globals.css` (essential tokens):

```css
@import "tailwindcss";

:root {
  --color-orange: #e06820;
  --color-ink: #0c0c0c;
  --color-stone: #c4b8a8;
  --color-cream: #f3efe8;
  --background: #0c0c0c;
  --foreground: #f3efe8;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), sans-serif;
}

.font-display {
  font-family: var(--font-display), sans-serif;
}
```

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Norris Construction | Miami Luxury Homes & Remodeling",
    template: "%s | Norris Construction",
  },
  description:
    "Luxury custom homes and residential remodeling across Miami and South Florida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${jakarta.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
```

`.env.example`:

```
DATABASE_URL="postgresql://USER:PASS@HOST/DB?sslmode=require"
ADMIN_PASSWORD="change-me"
SESSION_SECRET="at-least-32-characters-long-secret!!"
RESEND_API_KEY=""
RESEND_FROM="Norris Construction <noreply@example.com>"
LEAD_NOTIFY_EMAIL="leads@example.com"
CRON_SECRET="change-me-cron"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

`vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`

- [ ] **Step 5: Run test — expect PASS**

```bash
npx vitest run tests/smoke/brand-tokens.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Norris brand tokens"
```

---

### Task 2: Prisma schema, client, seed

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, `lib/prisma.ts`, `lib/types.ts`
- Test: `tests/db/schema-enums.test.ts` (static enum contract)

**Interfaces:**
- Consumes: `DATABASE_URL`
- Produces: Prisma models `Project`, `Service`, `Area`, `Post`, `Testimonial`, `SiteSettings`, `Lead`, `LeadNote`, `Submission`, `VisitorEvent`, `Experiment`, `EmailLog`; `getPrisma()`; seed with 6 services, 4 areas, settings, 2 sample projects, 1 draft post

- [ ] **Step 1: Write enum contract test**

```ts
// tests/db/schema-enums.test.ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("prisma enums", () => {
  it("includes ProjectType, BudgetRange, LeadStatus", () => {
    const schema = readFileSync("prisma/schema.prisma", "utf8");
    expect(schema).toContain("enum ProjectType");
    expect(schema).toContain("custom_home");
    expect(schema).toContain("enum BudgetRange");
    expect(schema).toContain("under_50k");
    expect(schema).toContain("enum LeadStatus");
    expect(schema).toContain("qualified");
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run tests/db/schema-enums.test.ts
```

- [ ] **Step 3: Write `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProjectType {
  custom_home
  remodel
  kitchen
  bath
  addition
  outdoor
}

enum BudgetRange {
  under_50k
  s50_150k @map("50_150k")
  s150_500k @map("150_500k")
  s500k_plus @map("500k_plus")
  not_sure
}

enum LeadStatus {
  new
  contacted
  qualified
  quoted
  won
  lost
}

enum PostStatus {
  draft
  published
}

enum EmailStatus {
  pending
  sent
  failed
}

model Project {
  id            String      @id @default(cuid())
  title         String
  slug          String      @unique
  type          ProjectType
  areaSlug      String
  summary       String
  body          String      @db.Text
  gallery       String[]
  beforeAfter   Json?
  featured      Boolean     @default(false)
  seoTitle      String?
  seoDescription String?
  publishedAt   DateTime?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  testimonials  Testimonial[]
}

model Service {
  id                 String   @id @default(cuid())
  title              String
  slug               String   @unique
  heroImage          String?
  summary            String
  body               String   @db.Text
  faqs               Json
  relatedProjectIds  String[]
  seoTitle           String?
  seoDescription     String?
  sortOrder          Int      @default(0)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Area {
  id                 String   @id @default(cuid())
  name               String
  slug               String   @unique
  headline           String
  body               String   @db.Text
  nearbyServiceSlugs String[]
  seoTitle           String?
  seoDescription     String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}

model Post {
  id             String     @id @default(cuid())
  title          String
  slug           String     @unique
  cover          String?
  body           String     @db.Text
  status         PostStatus @default(draft)
  seoTitle       String?
  seoDescription String?
  publishedAt    DateTime?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  quote     String   @db.Text
  rating    Int      @default(5)
  projectId String?
  project   Project? @relation(fields: [projectId], references: [id])
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteSettings {
  id               String  @id @default("singleton")
  phone            String  @default("(305) 555-0100")
  sms              String  @default("+13055550100")
  email            String  @default("hello@norris.construction")
  address          String  @default("Miami, FL")
  licenseText      String  @default("License # — coming soon")
  insuranceText    String  @default("Fully insured — details coming soon")
  yearsInBusiness  String  @default("Years of craftsmanship")
  socials          Json    @default("{}")
  chatEmbedHtml    String? @db.Text
  chatEnabled      Boolean @default(false)
  nurtureEnabled   Boolean @default(false)
}

model Lead {
  id          String       @id @default(cuid())
  name        String
  phone       String
  email       String
  projectType ProjectType?
  area        String?
  budgetRange BudgetRange?
  message     String       @db.Text
  source      String?
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  pageUrl     String?
  status      LeadStatus   @default(new)
  notes       LeadNote[]
  emails      EmailLog[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model LeadNote {
  id        String   @id @default(cuid())
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  body      String   @db.Text
  createdAt DateTime @default(now())
}

model Submission {
  id        String   @id @default(cuid())
  leadId    String?
  payload   Json
  ip        String?
  createdAt DateTime @default(now())
}

model VisitorEvent {
  id        String   @id @default(cuid())
  path      String
  referrer  String?
  userAgent String?
  createdAt DateTime @default(now())
}

model Experiment {
  id       String   @id @default(cuid())
  key      String   @unique
  variants Json
  active   Boolean  @default(false)
}

model EmailLog {
  id        String      @id @default(cuid())
  leadId    String?
  lead      Lead?       @relation(fields: [leadId], references: [id])
  template  String
  to        String
  status    EmailStatus
  error     String?
  createdAt DateTime    @default(now())
}
```

Note: Prisma enum member names cannot start with a digit — use `s50_150k` mapped to DB value `50_150k`. In app TypeScript, expose public API values as `50_150k` via `lib/types.ts` mappers.

`lib/prisma.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
```

- [ ] **Step 4: Seed + migrate**

Create `prisma/seed.ts` that upserts SiteSettings, 6 services (custom-homes, renovations, kitchens, bathrooms, additions, outdoor-living), 4 areas (miami-beach, coral-gables, brickell, fort-lauderdale), 2 featured projects with placeholder gallery paths, 2 unpublished testimonials, 1 published blog post, experiment `hero_headline` inactive with two variant strings.

```json
// package.json prisma key
"prisma": { "seed": "npx tsx prisma/seed.ts" }
```

```bash
npm install -D tsx
# set DATABASE_URL then:
npx prisma migrate dev --name init
npx prisma db seed
```

- [ ] **Step 5: Run enum test — PASS**

```bash
npx vitest run tests/db/schema-enums.test.ts
```

- [ ] **Step 6: Commit**

```bash
git add prisma lib/prisma.ts lib/types.ts tests/db package.json
git commit -m "feat: add Prisma schema, seed data, and client"
```

---

### Task 3: Lead validation + status transitions (TDD)

**Files:**
- Create: `lib/leads/validate.ts`, `lib/leads/transitions.ts`
- Test: `tests/leads/validate.test.ts`, `tests/leads/transitions.test.ts`

**Interfaces:**
- Consumes: zod
- Produces:
  - `estimateSchema` / `parseEstimateInput(raw: unknown): EstimateInput | ZodError`
  - `EstimateInput` fields: `name`, `phone`, `email`, `projectType?`, `area?`, `budgetRange?`, `message`, `honeypot?`, `pageUrl?`, utm fields
  - `canTransition(from: LeadStatus, to: LeadStatus): boolean`
  - `ALLOWED_TRANSITIONS` map

- [ ] **Step 1: Write failing tests**

```ts
// tests/leads/validate.test.ts
import { describe, expect, it } from "vitest";
import { parseEstimateInput } from "@/lib/leads/validate";

describe("parseEstimateInput", () => {
  it("accepts a valid estimate", () => {
    const result = parseEstimateInput({
      name: "Alex Rivera",
      phone: "3055550199",
      email: "alex@example.com",
      message: "Kitchen remodel in Coral Gables",
      projectType: "kitchen",
      budgetRange: "50_150k",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing email", () => {
    const result = parseEstimateInput({
      name: "Alex",
      phone: "3055550199",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("flags filled honeypot as spam", () => {
    const result = parseEstimateInput({
      name: "Bot",
      phone: "3055550199",
      email: "bot@example.com",
      message: "spam",
      honeypot: "http://spam",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.honeypot).toBeTruthy();
  });
});
```

```ts
// tests/leads/transitions.test.ts
import { describe, expect, it } from "vitest";
import { canTransition } from "@/lib/leads/transitions";

describe("canTransition", () => {
  it("allows new → contacted", () => {
    expect(canTransition("new", "contacted")).toBe(true);
  });
  it("allows quoted → won or lost", () => {
    expect(canTransition("quoted", "won")).toBe(true);
    expect(canTransition("quoted", "lost")).toBe(true);
  });
  it("blocks new → won", () => {
    expect(canTransition("new", "won")).toBe(false);
  });
});
```

- [ ] **Step 2: Run — FAIL**

```bash
npx vitest run tests/leads
```

- [ ] **Step 3: Implement**

```ts
// lib/leads/validate.ts
import { z } from "zod";

export const projectTypeEnum = z.enum([
  "custom_home",
  "remodel",
  "kitchen",
  "bath",
  "addition",
  "outdoor",
]);

export const budgetRangeEnum = z.enum([
  "under_50k",
  "50_150k",
  "150_500k",
  "500k_plus",
  "not_sure",
]);

export const estimateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email(),
  projectType: projectTypeEnum.optional(),
  area: z.string().trim().max(80).optional(),
  budgetRange: budgetRangeEnum.optional(),
  message: z.string().trim().min(5).max(5000),
  honeypot: z.string().optional(),
  pageUrl: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type EstimateInput = z.infer<typeof estimateSchema>;

export function parseEstimateInput(raw: unknown) {
  return estimateSchema.safeParse(raw);
}

export function mapBudgetToPrisma(value?: string) {
  if (!value) return undefined;
  const map: Record<string, string> = {
    under_50k: "under_50k",
    "50_150k": "s50_150k",
    "150_500k": "s150_500k",
    "500k_plus": "s500k_plus",
    not_sure: "not_sure",
  };
  return map[value];
}
```

```ts
// lib/leads/transitions.ts
import type { LeadStatus } from "@prisma/client";

export const ALLOWED_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new: ["contacted", "lost"],
  contacted: ["qualified", "lost"],
  qualified: ["quoted", "lost"],
  quoted: ["won", "lost"],
  won: [],
  lost: [],
};

export function canTransition(from: LeadStatus, to: LeadStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}
```

- [ ] **Step 4: Run — PASS**

```bash
npx vitest run tests/leads
```

- [ ] **Step 5: Commit**

```bash
git add lib/leads tests/leads
git commit -m "feat: add lead validation and status transition rules"
```

---

### Task 4: Public layout shell (Header, Footer, StickyCallBar)

**Files:**
- Create: `lib/site-settings.ts`, `components/layout/Header.tsx`, `Footer.tsx`, `StickyCallBar.tsx`, `app/(marketing)/layout.tsx`
- Modify: none required beyond wiring
- Test: `tests/layout/cta-links.test.ts` (pure helper)

**Interfaces:**
- Consumes: `getPrisma()`, SiteSettings
- Produces: `getSiteSettings(): Promise<SiteSettings>`; `telHref(phone)`, `smsHref(sms)`; marketing layout wraps all public pages with Header + Footer + StickyCallBar + `pb` for sticky bar

- [ ] **Step 1: Write helper test**

```ts
import { describe, expect, it } from "vitest";
import { smsHref, telHref } from "@/lib/site-settings";

describe("cta hrefs", () => {
  it("builds tel and sms links", () => {
    expect(telHref("(305) 555-0100")).toBe("tel:+13055550100");
    expect(smsHref("+13055550100")).toBe("sms:+13055550100");
  });
});
```

- [ ] **Step 2: Run — FAIL, then implement `lib/site-settings.ts`**

```ts
import { getPrisma } from "@/lib/prisma";

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function telHref(phone: string) {
  const d = digitsOnly(phone);
  return `tel:+${d.startsWith("1") ? d : `1${d}`}`;
}

export function smsHref(sms: string) {
  const d = digitsOnly(sms);
  return `sms:+${d.startsWith("1") ? d : `1${d}`}`;
}

export async function getSiteSettings() {
  const prisma = getPrisma();
  return prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
}
```

- [ ] **Step 3: Build Header / Footer / StickyCallBar**

Header requirements:
- Logo image `public/images/logo.png` linking home (visible, substantial — brand signal)
- Nav: Services, Projects, About, Blog, Contact
- Desktop actions: Text link + orange “Get estimate” → `/contact`
- No Inter; use `font-display` sparingly for wordmark fallback alt text

StickyCallBar (mobile only, `fixed bottom-0`, `md:hidden`):
- Two equal actions: Call (`telHref`) and Text (`smsHref`) using settings
- Orange / dark contrast; safe-area padding

Footer: address, phone, email, license/insurance placeholder lines, nav repeats, copyright

`app/(marketing)/layout.tsx` loads settings server-side and passes phone/sms to shell; add `pb-16 md:pb-0` on main.

- [ ] **Step 4: Temporary home page** so layout is viewable

`app/(marketing)/page.tsx` — simple “Norris Construction” placeholder until Task 5.

Remove conflicting `app/page.tsx` if create-next-app left one; marketing group owns `/`.

- [ ] **Step 5: Manual check**

```bash
npm run dev
```

Open `/` — logo, nav, sticky bar on narrow viewport, tel/sms hrefs correct.

- [ ] **Step 6: Commit**

```bash
git add components/layout lib/site-settings.ts app/(marketing)
git commit -m "feat: add marketing shell with sticky call/text CTAs"
```

---

### Task 5: Homepage sections + motion

**Files:**
- Create: all `components/sections/*` listed in file structure, `components/motion/Reveal.tsx`, `HeroMotion.tsx`
- Modify: `app/(marketing)/page.tsx`
- Test: manual + optional `tests/sections/homepage-order.test.ts` reading page import list

**Interfaces:**
- Consumes: Prisma lists (services, featured projects, testimonials, areas, posts), settings, optional experiment variant for headline
- Produces: conversion homepage matching spec §5

- [ ] **Step 1: Implement motion helpers**

```tsx
// components/motion/Reveal.tsx
"use client";
import { motion } from "framer-motion";

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

```tsx
// components/motion/HeroMotion.tsx
"use client";
import { motion } from "framer-motion";

export function HeroMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Implement Hero (first viewport only)**

`components/sections/Hero.tsx`:
- Full-bleed background image (`next/image` fill, priority)
- Overlay gradient for text readability (not a card)
- Large logo above headline
- Headline prop (default: “Miami luxury builds & remodels, done right.”)
- One supporting sentence
- CTA group: Link `Get estimate` → `/contact` (orange button) + `Call` / `Text` using settings hrefs
- No stats, badges, or address in hero

- [ ] **Step 3: Implement remaining sections**

Each section: one headline + short support + content; wrap in `Reveal`.

1. `TrustStrip` — licenseText, insuranceText, yearsInBusiness from settings  
2. `ServicesSection` — links to `/services/[slug]` (not card-heavy; editorial list/grid without fake dashboard look)  
3. `FeaturedProjects` — featured projects; hover scale/expand image (third motion)  
4. `ProcessSection` — 3 steps: Vision & Planning → Design & Development → Build & Handover  
5. `TestimonialsSection` — published testimonials or placeholder quotes  
6. `AreasSection` — links to `/areas/[slug]`  
7. `BlogTeaser` — latest published posts  
8. `EstimateCta` — band with form short-link / embed `ContactForm` compact mode  

- [ ] **Step 4: Wire `app/(marketing)/page.tsx`**

Server component: fetch settings, services, featured projects, testimonials, areas, latest posts; render sections in order above.

- [ ] **Step 5: Visual QA**

Desktop + mobile: first viewport brand test (logo dominant); orange only on CTAs; no Inter.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat: build conversion homepage with motion and brand hero"
```

---

### Task 6: Services, Projects, About, Areas, Blog public pages

**Files:**
- Create: all `(marketing)/services|projects|about|blog|areas` pages + `components/projects/*`
- Test: smoke script or Vitest checking slug query helpers

**Interfaces:**
- Consumes: Prisma models
- Produces: working routes for every public page in spec §4

- [ ] **Step 1: Data helpers**

```ts
// lib/content.ts
import { getPrisma } from "@/lib/prisma";

export async function getServiceBySlug(slug: string) {
  return getPrisma().service.findUnique({ where: { slug } });
}
export async function getProjectBySlug(slug: string) {
  return getPrisma().project.findUnique({ where: { slug } });
}
export async function getAreaBySlug(slug: string) {
  return getPrisma().area.findUnique({ where: { slug } });
}
export async function getPostBySlug(slug: string) {
  return getPrisma().post.findFirst({
    where: { slug, status: "published" },
  });
}
```

- [ ] **Step 2: Implement pages**

- `/services` — list all services  
- `/services/[slug]` — hero, body, FAQs, related projects, EstimateCta; `generateMetadata`  
- `/projects` — `ProjectFilters` (type + area query params), gallery grid  
- `/projects/[slug]` — `ProjectGallery`, `BeforeAfter` if JSON present  
- `/about` — story + trust placeholders  
- `/blog`, `/blog/[slug]` — published only  
- `/areas/[slug]` — headline, body, nearby services, filtered projects by `areaSlug`  
- `notFound()` when slug missing  

- [ ] **Step 3: Manual smoke**

Visit each seeded slug; confirm 404 for `/areas/not-a-city`.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add services, projects, areas, blog, and about pages"
```

---

### Task 7: Contact form API + create lead + rate limit

**Files:**
- Create: `lib/leads/create-lead.ts`, `lib/rate-limit.ts`, `components/sections/ContactForm.tsx`, `app/(marketing)/contact/page.tsx`, `app/api/contact/route.ts`
- Test: `tests/api/contact.test.ts` (call `createLeadFromEstimate` with mocked prisma)

**Interfaces:**
- Consumes: `parseEstimateInput`, `mapBudgetToPrisma`, `getPrisma`
- Produces: `POST /api/contact` → `{ ok: true, leadId }` or errors; creates `Lead` + `Submission`; honeypot returns 200 without creating lead; rate limit 5/min/IP

- [ ] **Step 1: Write create-lead tests with prisma mock**

```ts
// tests/api/contact.test.ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const leadCreate = vi.fn();
const submissionCreate = vi.fn();

vi.mock("@/lib/prisma", () => ({
  getPrisma: () => ({
    lead: { create: leadCreate },
    submission: { create: submissionCreate },
  }),
}));

vi.mock("@/lib/email/send", () => ({
  sendLeadEmails: vi.fn().mockResolvedValue(undefined),
}));

import { createLeadFromEstimate } from "@/lib/leads/create-lead";

describe("createLeadFromEstimate", () => {
  beforeEach(() => {
    leadCreate.mockReset();
    submissionCreate.mockReset();
    leadCreate.mockResolvedValue({ id: "lead_1" });
  });

  it("skips persistence when honeypot filled", async () => {
    const res = await createLeadFromEstimate(
      {
        name: "Bot",
        phone: "3055550199",
        email: "bot@example.com",
        message: "spam message",
        honeypot: "x",
      },
      { ip: "1.1.1.1" },
    );
    expect(res).toEqual({ ok: true, spam: true });
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("creates lead and submission", async () => {
    const res = await createLeadFromEstimate(
      {
        name: "Alex Rivera",
        phone: "3055550199",
        email: "alex@example.com",
        message: "Need a kitchen remodel",
        projectType: "kitchen",
        budgetRange: "50_150k",
      },
      { ip: "1.1.1.1" },
    );
    expect(res.ok).toBe(true);
    expect(leadCreate).toHaveBeenCalled();
    expect(submissionCreate).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run — FAIL**

- [ ] **Step 3: Implement create-lead, rate-limit, API, form**

```ts
// lib/rate-limit.ts
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }
  if (row.count >= limit) return { ok: false };
  row.count += 1;
  return { ok: true };
}
```

`createLeadFromEstimate`: if honeypot non-empty → `{ ok: true, spam: true }`; else create lead status `new`, submission with payload+ip, then call `sendLeadEmails(lead)` in try/catch (never throw to client).

`POST /api/contact`: parse JSON, rate limit by IP header, `parseEstimateInput`, return 400 on validation fail, else createLead.

`ContactForm` client: fields name, phone, email, projectType select, area, budgetRange select, message, hidden honeypot `website`, submit to `/api/contact`, success/error UI. Orange submit button.

`/contact` page: headline + form + call/text sidebar.

- [ ] **Step 4: Run tests — PASS**

```bash
npx vitest run tests/api/contact.test.ts
```

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: add estimate form API with honeypot and rate limiting"
```

---

### Task 8: Resend email templates + send logging

**Files:**
- Create: `lib/email/resend.ts`, `lib/email/templates.ts`, `lib/email/send.ts`
- Test: `tests/email/send.test.ts`

**Interfaces:**
- Consumes: Resend SDK, EmailLog, SiteSettings, env `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_EMAIL`
- Produces: `sendLeadEmails(lead)`, `sendNurture(lead, templateKey)`, logs success/failure; missing API key logs `failed` with error `RESEND_API_KEY missing` without throwing

- [ ] **Step 1: Failing test — sendLeadEmails writes two logs when resend mocked**

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
const emailCreate = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

vi.mock("@/lib/prisma", () => ({
  getPrisma: () => ({
    emailLog: { create: emailCreate },
    siteSettings: {
      findUnique: vi.fn().mockResolvedValue({ email: "hello@norris.construction" }),
    },
  }),
}));

import { sendLeadEmails } from "@/lib/email/send";

describe("sendLeadEmails", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_FROM = "Norris <noreply@test.com>";
    process.env.LEAD_NOTIFY_EMAIL = "leads@test.com";
    send.mockResolvedValue({ data: { id: "1" }, error: null });
    emailCreate.mockResolvedValue({});
  });

  it("sends confirmation and notify", async () => {
    await sendLeadEmails({
      id: "lead_1",
      name: "Alex",
      email: "alex@example.com",
      phone: "305",
      message: "Hi",
    } as any);
    expect(send).toHaveBeenCalledTimes(2);
    expect(emailCreate).toHaveBeenCalledTimes(2);
  });
});
```

- [ ] **Step 2: Implement templates + send**

Templates: `lead_confirmation` (thanks + what happens next), `lead_notify` (admin dump of fields), `nurture_day2`, `nurture_day5` (simple HTML strings).

- [ ] **Step 3: Tests PASS; commit**

```bash
git commit -am "feat: add Resend lead confirmation and notify emails"
```

---

### Task 9: Admin auth (session login)

**Files:**
- Create: `lib/auth/session.ts`, `app/admin/login/page.tsx`, `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`, `app/admin/(dashboard)/layout.tsx`
- Test: `tests/auth/password.test.ts` verifying bcrypt compare helper

**Interfaces:**
- Consumes: `ADMIN_PASSWORD`, `SESSION_SECRET`
- Produces: `getSession()`, `requireAdmin()`, login POST sets cookie, dashboard layout redirects to `/admin/login` if unauthenticated

- [ ] **Step 1–4: TDD password verify helper + iron-session cookie `norris_admin` with `{ authenticated: true }`**

Login page: password-only form (single operator). On success redirect `/admin`.

Dashboard layout: dark admin chrome, nav links to all modules, logout button.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: add password-protected admin session auth"
```

---

### Task 10: Admin CMS CRUD (projects, services, areas, blog, testimonials, settings)

**Files:**
- Create: all `app/admin/(dashboard)/{projects,services,areas,blog,testimonials,settings}/**` and `components/admin/*` forms
- Create: API routes under `app/api/admin/...` as needed OR server actions — pick **server actions** in each page for speed, all calling `requireAdmin()`

**Interfaces:**
- Consumes: Prisma models, `requireAdmin()`
- Produces: list + create/edit/delete for each content type; settings singleton edit including `chatEnabled`, `chatEmbedHtml`, `nurtureEnabled`, phone/sms/email

- [ ] **Step 1: Admin home dashboard** counts: new leads, projects, posts draft/published

- [ ] **Step 2: Projects CRUD** with featured toggle, gallery as newline-separated URLs for v1, type select, areaSlug text

- [ ] **Step 3: Services / Areas / Blog / Testimonials CRUD** matching schema fields; blog status draft/published; testimonials published flag

- [ ] **Step 4: Settings form** save singleton

- [ ] **Step 5: Manual QA** — create project, appear on `/projects` after publish date set

- [ ] **Step 6: Commit**

```bash
git commit -am "feat: add admin CMS for content and site settings"
```

---

### Task 11: Admin lead pipeline + submissions + status emails

**Files:**
- Create: `app/admin/(dashboard)/leads/page.tsx`, `leads/[id]/page.tsx`, `submissions/page.tsx`, `app/api/admin/leads/[id]/route.ts`
- Test: reuse transitions; add `tests/leads/update-status.test.ts` for service wrapper

**Interfaces:**
- Consumes: `canTransition`, Prisma Lead/LeadNote
- Produces: lead inbox filterable by status; detail with notes; PATCH status; optional notify on status change via `sendStatusEmail`

- [ ] **Step 1: Leads list** — table: name, type, status, createdAt; filter chips by status

- [ ] **Step 2: Lead detail** — fields, status `<select>` only showing allowed next statuses, note textarea, timeline of notes

- [ ] **Step 3: Submissions page** — raw JSON log readonly

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add admin lead pipeline and submissions inbox"
```

---

### Task 12: Automations UI + nurture cron

**Files:**
- Create: `app/admin/(dashboard)/automations/page.tsx`, `app/api/cron/nurture/route.ts`
- Test: `tests/email/nurture-select.test.ts` selecting leads eligible for day2/day5

**Interfaces:**
- Consumes: `SiteSettings.nurtureEnabled`, EmailLog, Lead.createdAt
- Produces: cron `GET/POST /api/cron/nurture` authorized by `Authorization: Bearer CRON_SECRET`; sends day2 if age≥2d and no `nurture_day2` log; day5 similarly; admin page toggles nurture + shows recent EmailLog

- [ ] **Step 1: Implement eligibility helper + test**

```ts
export function nurtureDue(
  createdAt: Date,
  now: Date,
  sentTemplates: string[],
): "nurture_day2" | "nurture_day5" | null {
  const days = (now.getTime() - createdAt.getTime()) / 86_400_000;
  if (days >= 5 && !sentTemplates.includes("nurture_day5")) return "nurture_day5";
  if (days >= 2 && !sentTemplates.includes("nurture_day2")) return "nurture_day2";
  return null;
}
```

- [ ] **Step 2: Cron route + automations admin page**

- [ ] **Step 3: Document Vercel cron in `vercel.json`:**

```json
{
  "crons": [{ "path": "/api/cron/nurture", "schedule": "0 14 * * *" }]
}
```

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add nurture automations toggle and cron endpoint"
```

---

### Task 13: Visitor tracking + experiments + chat widget

**Files:**
- Create: `components/VisitorTracker.tsx`, `app/api/track/route.ts`, `app/admin/(dashboard)/visitors/page.tsx`, `lib/experiments/resolve.ts`, `app/admin/(dashboard)/experiments/page.tsx`, `components/ChatWidget.tsx`
- Modify: marketing layout (tracker + chat), Hero (experiment headline/CTA)

**Interfaces:**
- Consumes: VisitorEvent, Experiment, SiteSettings.chat*
- Produces: `POST /api/track` `{ path, referrer }`; `resolveExperiment(key, visitorId): variant`; ChatWidget renders `dangerouslySetInnerHTML` only when `chatEnabled` and html present

- [ ] **Step 1: Track API + client beacon on path change; visitors admin last 200 events**

- [ ] **Step 2: Experiments** — admin edit variants JSON + active flag; `resolveExperiment` picks stable hash of cookie `nid`; Hero uses variant when `hero_headline` active

- [ ] **Step 3: ChatWidget in marketing layout after StickyCallBar**

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add visitor tracking, hero A/B, and chat widget toggle"
```

---

### Task 14: SEO (JSON-LD, sitemap, robots) + final QA

**Files:**
- Create: `components/seo/JsonLd.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Modify: home + contact + project pages to include JSON-LD
- Test: `tests/seo/sitemap-paths.test.ts` building path list from mocked data

**Interfaces:**
- Produces: LocalBusiness JSON-LD (name Norris Construction, areaServed Miami, telephone from settings); Project JSON-LD on project pages; sitemap includes all published services/projects/areas/posts + static routes

- [ ] **Step 1: Implement JsonLd + sitemap + robots**

- [ ] **Step 2: Full QA checklist**

- [ ] Homepage first-viewport brand test  
- [ ] Estimate form happy path creates lead + email logs  
- [ ] Honeypot does not create lead  
- [ ] Sticky call/text on mobile  
- [ ] Admin CRUD publish → public visible  
- [ ] Lead status transition enforcement  
- [ ] `/sitemap.xml` and `/robots.txt`  
- [ ] `npm run build` succeeds  

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: add SEO JSON-LD, sitemap, robots; finish v1 QA"
```

---

## Spec coverage self-check

| Spec section | Tasks |
|--------------|-------|
| Brand / visual / homepage | 1, 4, 5 |
| Architecture / file layout | 1–14 |
| Public site map | 4–7, 6 |
| Admin modules | 9–13 |
| Data model | 2 |
| Lead flow + automations | 3, 7, 8, 11, 12 |
| Growth (visitors, A/B, chat) | 13 |
| Security / rate limit / honeypot | 7, 9 |
| Testing | 1–3, 7–8, 12, 14 |
| Launch env | Task 1 `.env.example` + Task 12 cron |

**Placeholder scan:** none intentional beyond client-supplied trust copy (explicit in Global Constraints).  
**Type consistency:** `ProjectType` / `BudgetRange` public strings `50_150k` etc. map to Prisma `s50_150k` via `mapBudgetToPrisma`.

---

## Execution notes

- Prefer **subagent-driven-development**: one fresh agent per task, review between tasks.  
- Keep commits per task as written.  
- If Postgres is unavailable locally, use Neon free DB and put URL in `.env`.  
- Real project photos: drop into `public/images/projects/` and update seed/admin galleries when client delivers.
