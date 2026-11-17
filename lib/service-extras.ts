export type ServiceExtra = {
  eyebrow: string;
  longSummary: string;
  paragraphs: string[];
  includes: string[];
  process: { title: string; body: string }[];
  gallery: { src: string; alt: string }[];
  faqs: { q: string; a: string }[];
};

const sharedProcess = [
  {
    title: "Scope & walkthrough",
    body: "Site review, goals, and a clear written scope so bids stay comparable and schedules stay honest.",
  },
  {
    title: "Build & coordinate",
    body: "Dedicated supervision, sequenced trades, and updates tied to your lease or opening date.",
  },
  {
    title: "Punch & handover",
    body: "Inspection-ready closeout, documented punch list, and a space ready for occupants or leasing.",
  },
];

export function getServiceExtra(slug: string): ServiceExtra | null {
  return SERVICE_EXTRAS[slug] ?? null;
}

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  "commercial-renovations": {
    eyebrow: "Commercial interiors",
    longSummary:
      "Full commercial interior renovations and facility upgrades for property owners and businesses across South Florida.",
    paragraphs: [
      "Norris Construction specializes in commercial renovations that take vacant or outdated spaces to their next stage — offices, retail, restaurants, warehouses, and multi-unit commercial properties.",
      "We handle interior demolition, framing, drywall, ceilings, flooring, painting, doors and hardware, and coordinated MEP improvements through appropriately licensed trades where required.",
      "Projects are planned around leasing calendars, franchise openings, and occupied-building constraints so your property stays marketable and operational.",
    ],
    includes: [
      "Full commercial interior renovations",
      "Space reconfigurations and multi-unit work",
      "Demolition and reconstruction",
      "Interior finishes and modernization",
      "Permit-related renovation coordination",
      "Punch-list and inspection corrections",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/warehouse.jpg", alt: "Commercial warehouse interior" },
      { src: "/images/projects/whitebox.jpg", alt: "Renovated commercial suite" },
      { src: "/images/projects/office.jpg", alt: "Office renovation" },
      { src: "/images/hero.jpg", alt: "White-box commercial space" },
      { src: "/images/cta-band.jpg", alt: "Industrial facility interior" },
      { src: "/images/projects/restaurant.jpg", alt: "Hospitality renovation" },
    ],
    faqs: [
      {
        q: "What types of commercial properties do you renovate?",
        a: "Offices, medical suites, restaurants, retail, shopping centers, self-storage, warehouses, and light-industrial facilities across Palm Beach, Broward, and Martin Counties.",
      },
      {
        q: "Can you work in occupied buildings?",
        a: "Yes. We phase work, coordinate access, and protect adjacent tenants when renovations happen in active commercial properties.",
      },
    ],
  },
  "office-buildouts": {
    eyebrow: "Professional spaces",
    longSummary:
      "Corporate offices, medical and dental suites, conference rooms, lobbies, and multi-tenant office improvements.",
    paragraphs: [
      "From open-plan corporate floors to medical and dental suites, we build professional interiors that support how your team works and how clients experience your brand.",
      "Typical scopes include partitions, glass offices, reception and lobbies, conference rooms, breakrooms, restrooms, acoustical ceilings, flooring, and finish carpentry.",
      "Whether you are a tenant building out a new lease or a landlord modernizing common areas, we deliver practical construction with clear communication.",
    ],
    includes: [
      "Corporate office renovations",
      "Medical and dental office build-outs",
      "Conference rooms and meeting spaces",
      "Reception areas and lobbies",
      "Partition and layout modifications",
      "Breakrooms, kitchens, and restrooms",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/office.jpg", alt: "Open-plan commercial office" },
      { src: "/images/projects/medical-office.jpg", alt: "Medical office reception" },
      { src: "/images/projects/office.jpg", alt: "Office workstations" },
      { src: "/images/areas/west-palm-beach.jpg", alt: "Professional suite interior" },
      { src: "/images/services/medical-office.jpg", alt: "Dental waiting area" },
      { src: "/images/hero.jpg", alt: "Commercial interior ready for tenants" },
    ],
    faqs: [
      {
        q: "Do you build medical and dental offices?",
        a: "Yes. We renovate and build out professional medical and dental suites, including reception, waiting areas, and clinical support spaces.",
      },
      {
        q: "Can you reconfigure an existing office layout?",
        a: "Absolutely — partition changes, glass offices, open-plan conversions, and finish upgrades are common tenant improvement scopes.",
      },
    ],
  },
  "restaurant-renovations": {
    eyebrow: "Hospitality & F&B",
    longSummary:
      "Restaurant interiors, commercial kitchens, bars, cafés, and franchise hospitality renovations.",
    paragraphs: [
      "Hospitality spaces need durable finishes, smart sequencing, and coordination around equipment, health requirements, and opening dates.",
      "We renovate dining rooms, bars and lounges, cafés, fast-casual concepts, and franchise locations — including seating reconfigurations and finish packages that hold up under daily service.",
      "Commercial kitchen and MEP work is coordinated with appropriately licensed trades so the front-of-house and back-of-house come together as one project.",
    ],
    includes: [
      "Restaurant interior renovations",
      "Bar and lounge build-outs",
      "Café and coffee shop interiors",
      "Fast-casual and franchise renovations",
      "Dining room reconfigurations",
      "Finish carpentry and specialty lighting coordination",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/restaurant.jpg", alt: "Restaurant bar renovation" },
      { src: "/images/projects/restaurant.jpg", alt: "Hospitality dining interior" },
      { src: "/images/areas/fort-lauderdale.jpg", alt: "Commercial dining space" },
      { src: "/images/projects/office.jpg", alt: "Modern commercial finishes" },
      { src: "/images/cta-band.jpg", alt: "Large commercial interior" },
      { src: "/images/hero.jpg", alt: "Ready commercial space" },
    ],
    faqs: [
      {
        q: "Do you renovate commercial kitchens?",
        a: "We handle kitchen-area renovations and coordinate plumbing, electrical, and HVAC modifications through licensed trades as required.",
      },
      {
        q: "Can you work with franchise brand standards?",
        a: "Yes. We build to brand packages and landlord criteria so franchise locations open on schedule.",
      },
    ],
  },
  "retail-shopping": {
    eyebrow: "Retail & centers",
    longSummary:
      "Retail storefronts, shopping center TI, showrooms, and plaza renovations for South Florida commercial properties.",
    paragraphs: [
      "Retail success depends on a space that looks ready for customers and meets landlord and brand requirements.",
      "We deliver storefront renovations, shopping center tenant improvements, showroom build-outs, and common-area upgrades for plazas and strip centers.",
      "Scopes often include demolition of prior tenant finishes, new partitions, flooring, lighting, storefront repairs, and lease-ready interiors.",
    ],
    includes: [
      "Retail storefront renovations",
      "Shopping center tenant improvements",
      "Showroom renovations",
      "Salon, spa, and fitness studio build-outs",
      "Strip mall and plaza improvements",
      "Storefront repairs and replacements",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/whitebox.jpg", alt: "Retail white-box suite" },
      { src: "/images/projects/whitebox.jpg", alt: "Vacant commercial retail space" },
      { src: "/images/projects/restaurant.jpg", alt: "Customer-facing commercial interior" },
      { src: "/images/hero.jpg", alt: "Lease-ready commercial suite" },
      { src: "/images/projects/office.jpg", alt: "Finished commercial interiors" },
      { src: "/images/areas/west-palm-beach.jpg", alt: "Professional commercial space" },
    ],
    faqs: [
      {
        q: "Do you handle shopping center tenant turnovers?",
        a: "Yes — from removing prior tenant improvements to delivering a clean suite ready for the next lease.",
      },
      {
        q: "Can you renovate only the storefront?",
        a: "We can scope storefront repairs and replacements as standalone work or as part of a full retail build-out.",
      },
    ],
  },
  "white-boxing": {
    eyebrow: "Landlord ready",
    longSummary:
      "White-box conversions, vacant space preparation, and commercial property turnovers for landlords and property managers.",
    paragraphs: [
      "White boxing and tenant turnovers are among the highest-value services we provide for commercial landlords, leasing agents, and property managers.",
      "Typical work includes complete removal of existing tenant improvements, partition demolition, flooring and ceiling restoration, drywall repair, neutral repainting, lighting prep, and restroom restoration.",
      "The goal is a lease-ready commercial suite — clean, code-conscious, and easy to show — whether you are preparing for a new tenant or resetting after a vacancy.",
    ],
    includes: [
      "Complete tenant space demolition",
      "White-box and vanilla-shell conversions",
      "Flooring, ceiling, and drywall restoration",
      "Neutral interior repainting",
      "Electrical and lighting preparation",
      "Pre-lease and post-lease construction",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/whitebox.jpg", alt: "White-box commercial conversion" },
      { src: "/images/projects/whitebox.jpg", alt: "Vacant commercial suite" },
      { src: "/images/hero.jpg", alt: "Lease-ready commercial interior" },
      { src: "/images/projects/warehouse.jpg", alt: "Open commercial floor plate" },
      { src: "/images/cta-band.jpg", alt: "Industrial white-box space" },
      { src: "/images/projects/storage.jpg", alt: "Clean commercial corridor" },
    ],
    faqs: [
      {
        q: "What is a white-box conversion?",
        a: "A white-box (or vanilla shell) returns a commercial suite to a clean, neutral, lease-ready condition so the next tenant can build out efficiently.",
      },
      {
        q: "How fast can a turnover be completed?",
        a: "Timelines depend on suite size and remaining improvements. We schedule turnovers around leasing needs and provide a clear duration in the bid.",
      },
    ],
  },
  "storage-warehouse": {
    eyebrow: "Industrial & storage",
    longSummary:
      "Self-storage facilities, warehouse interiors, epoxy flooring, and light-industrial tenant improvements.",
    paragraphs: [
      "Warehouses, distribution spaces, and self-storage facilities need durable materials, clear circulation, and practical detailing that holds up under commercial use.",
      "We renovate storage corridors and units, warehouse interiors, warehouse offices, loading and service areas, and industrial restrooms and breakrooms.",
      "Industrial flooring and epoxy coatings, partition and unit construction, and facility modernization are common scopes for owners and operators across South Florida.",
    ],
    includes: [
      "Self-storage facility renovations",
      "Storage unit conversions and expansions",
      "Warehouse interior renovations",
      "Industrial flooring and epoxy coatings",
      "Warehouse office build-outs",
      "Loading and service-area improvements",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/storage.jpg", alt: "Self-storage facility corridor" },
      { src: "/images/projects/warehouse.jpg", alt: "Warehouse interior" },
      { src: "/images/projects/storage.jpg", alt: "Storage unit hallway" },
      { src: "/images/cta-band.jpg", alt: "Industrial warehouse space" },
      { src: "/images/services/warehouse.jpg", alt: "Commercial warehouse renovation" },
      { src: "/images/hero.jpg", alt: "Open commercial facility" },
    ],
    faqs: [
      {
        q: "Do you renovate self-storage facilities?",
        a: "Yes — corridors, unit doors, epoxy floors, lighting, and related facility upgrades for self-storage operators.",
      },
      {
        q: "Can you add a warehouse office or breakroom?",
        a: "We commonly build warehouse offices, restrooms, and breakrooms as part of industrial tenant improvements.",
      },
    ],
  },
  "tenant-improvements": {
    eyebrow: "Commercial TI",
    longSummary:
      "Tenant improvement packages for new and renewing commercial tenants across offices, retail, medical, and industrial spaces.",
    paragraphs: [
      "Commercial tenant improvements bridge landlord base building conditions and the finishes a business needs to operate.",
      "We deliver TI scopes that may include partitions, ceilings, flooring, painting, doors and hardware, millwork, restrooms, and coordinated electrical, plumbing, and HVAC modifications.",
      "Clear scopes and accountable supervision help tenants open on time and help landlords protect building standards.",
    ],
    includes: [
      "New and renewal tenant improvement packages",
      "Grey-shell and white-box follow-on build-outs",
      "Interior partitions and finishes",
      "Franchise location build-outs",
      "MEP coordination through licensed trades",
      "Inspection punch-list corrections",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/office.jpg", alt: "Tenant office improvement" },
      { src: "/images/projects/office.jpg", alt: "Commercial TI workspace" },
      { src: "/images/projects/medical-office.jpg", alt: "Professional suite TI" },
      { src: "/images/projects/restaurant.jpg", alt: "Hospitality tenant build-out" },
      { src: "/images/projects/whitebox.jpg", alt: "Base commercial suite" },
      { src: "/images/areas/coral-springs.jpg", alt: "Medical suite renovation" },
    ],
    faqs: [
      {
        q: "Who typically hires you for TI work?",
        a: "Commercial tenants, franchise operators, landlords, and property managers — depending on lease responsibility.",
      },
      {
        q: "Do you work from architectural drawings?",
        a: "Yes. We bid from plans when available and can also develop scopes from walkthroughs and landlord criteria.",
      },
    ],
  },
  "property-management": {
    eyebrow: "Portfolio & CAPEX",
    longSummary:
      "Capital improvements, common areas, ADA upgrades, and turnover renovations for commercial property managers and landlords.",
    paragraphs: [
      "Property managers need contractors who understand portfolios, recurring turnovers, and capital improvement calendars.",
      "We support shopping plazas, multi-tenant offices, corridors, lobbies, restrooms, façade and storefront repairs, exterior commercial painting, and ADA accessibility improvements.",
      "Whether it is one suite or a rolling schedule of vacancies, we focus on dependable results that keep spaces leasable.",
    ],
    includes: [
      "Property management capital improvement projects",
      "Common-area and corridor renovations",
      "Lobby and entrance improvements",
      "Commercial restroom renovations",
      "ADA accessibility improvements",
      "Commercial property turnover renovations",
    ],
    process: sharedProcess,
    gallery: [
      { src: "/images/services/medical-office.jpg", alt: "Commercial lobby and reception" },
      { src: "/images/projects/medical-office.jpg", alt: "Professional common area" },
      { src: "/images/projects/whitebox.jpg", alt: "Suite turnover space" },
      { src: "/images/hero.jpg", alt: "Prepared commercial interior" },
      { src: "/images/projects/office.jpg", alt: "Multi-tenant office finishes" },
      { src: "/images/areas/west-palm-beach.jpg", alt: "Office property renovation" },
    ],
    faqs: [
      {
        q: "Do you support ongoing property management work?",
        a: "Yes. We handle one-off CAPEX projects and recurring suite turnovers for commercial portfolios.",
      },
      {
        q: "Can you help with ADA-related renovations?",
        a: "We perform ADA accessibility improvement work as part of restroom, entrance, and common-area renovations.",
      },
    ],
  },
};
