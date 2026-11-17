export type SeoBlogPost = {
  title: string;
  slug: string;
  cover: string;
  seoTitle: string;
  seoDescription: string;
  body: string;
};

/**
 * Local SEO guides for South Florida commercial construction queries.
 * Bodies use light markdown: ## / ### headings, - lists, [links](/path), **bold**.
 */
export const SEO_BLOG_POSTS: SeoBlogPost[] = [
  {
    title: "White Box Commercial Construction in South Florida",
    slug: "white-box-commercial-construction-florida",
    cover: "/images/services/whitebox.jpg",
    seoTitle: "White Box Commercial Construction Florida",
    seoDescription:
      "What white-box and vanilla-shell conversions include for landlords and property managers in Palm Beach and Broward Counties.",
    body: `## What is white-box commercial construction?

A **white-box** (or vanilla shell) returns a commercial suite to a clean, neutral, lease-ready condition. Landlords and property managers use white boxing so the next tenant can build out efficiently — and so vacant space looks showable immediately.

Typical work includes:

- Removal of existing tenant improvements
- Interior partition demolition
- Drywall repair and finishing
- Neutral interior repainting
- Ceiling restoration or replacement
- Flooring removal and concrete prep
- Lighting and electrical preparation
- Restroom restoration where required

Explore our [white boxing & tenant turnover](/services/white-boxing) service or [request a bid](/contact).

## Who needs white boxing?

Commercial landlords, leasing agents, and property managers preparing retail, office, and multi-tenant suites after a vacancy. It is also common before a new franchise or medical suite build-out.

## Tips for a clean turnover

- Define landlord vs tenant responsibility early
- Photograph the suite before demolition
- Align the schedule with leasing showings
- Keep finishes neutral and durable

Norris Construction delivers white-box conversions across **Palm Beach, Broward, and Martin Counties**.
`,
  },
  {
    title: "Commercial Tenant Improvements: What Owners Should Expect",
    slug: "commercial-tenant-improvement-guide",
    cover: "/images/services/office.jpg",
    seoTitle: "Commercial Tenant Improvement Contractor Guide",
    seoDescription:
      "How commercial TI projects work in South Florida — scopes, timelines, and what landlords and tenants should plan for.",
    body: `## What is a commercial tenant improvement?

**Tenant improvements (TI)** customize a commercial suite for a specific business — offices, retail, medical, restaurants, or light industrial. The work sits between base-building conditions and the finishes needed to open.

Common TI scopes include partitions, ceilings, flooring, painting, doors and hardware, millwork, restrooms, and coordinated MEP modifications.

See our [commercial tenant improvements](/services/tenant-improvements) page or [request a commercial construction estimate](/contact).

## Timeline drivers

- Suite size and remaining prior improvements
- Permit and inspection requirements
- Long-lead finishes and millwork
- Occupied-building access rules

## Best practices

- Start from a written scope and walkthrough
- Upload plans, drawings, or photos with your bid request
- Document change orders before work continues
- Plan punch list time before lease commencement

Norris supports TI projects for tenants, franchise operators, and property managers throughout South Florida.
`,
  },
  {
    title: "Office Build-Outs in West Palm Beach & Palm Beach County",
    slug: "office-buildouts-west-palm-beach",
    cover: "/images/projects/office.jpg",
    seoTitle: "Office Renovation Contractor West Palm Beach",
    seoDescription:
      "Planning an office build-out in West Palm Beach or Jupiter — layouts, finishes, and practical construction tips.",
    body: `## Office renovations that support real work

A strong office build-out balances open collaboration with private meeting space, durable finishes, and lighting that feels professional — not temporary.

Typical spaces we renovate:

- Corporate offices and professional suites
- Medical and dental offices
- Conference rooms and lobbies
- Breakrooms and restrooms
- Multi-tenant office improvements

Learn more about [office build-outs](/services/office-buildouts) or [request a bid](/contact).

## Layout decisions that matter

- Glass vs solid partitions for acoustics and daylight
- Reception flow for clients and deliveries
- Storage and IT closet planning
- ADA-conscious restrooms and entries

We serve **West Palm Beach, Jupiter, Boca Raton**, and surrounding Palm Beach County commercial corridors.
`,
  },
  {
    title: "Restaurant Renovations in Fort Lauderdale & Broward",
    slug: "restaurant-renovation-fort-lauderdale",
    cover: "/images/services/restaurant.jpg",
    seoTitle: "Restaurant Renovation Contractor Fort Lauderdale",
    seoDescription:
      "How restaurant and bar renovations get delivered in Broward County — dining rooms, bars, and opening-date coordination.",
    body: `## Hospitality renovations built for service

Restaurant renovations succeed when front-of-house atmosphere and back-of-house durability are planned as one project. Sequencing around equipment, inspections, and opening dates is as important as finishes.

Common scopes:

- Dining room and seating reconfigurations
- Bar and lounge build-outs
- Café and fast-casual interiors
- Franchise location renovations
- Finish carpentry and specialty lighting coordination

See [restaurant renovations](/services/restaurant-renovations) or [request a bid](/contact).

## What operators should prepare

- Brand standards or reference images
- Equipment lists and utility needs
- Landlord criteria and access rules
- Target opening date with buffer for punch list

Norris Construction renovates restaurants and hospitality spaces across **Fort Lauderdale** and greater Broward County.
`,
  },
  {
    title: "Self-Storage & Warehouse Renovations in South Florida",
    slug: "self-storage-warehouse-renovation",
    cover: "/images/services/storage.jpg",
    seoTitle: "Self-Storage Facility Renovation Contractor South Florida",
    seoDescription:
      "Self-storage corridors, warehouse interiors, epoxy flooring, and industrial facility improvements across South Florida.",
    body: `## Industrial spaces that stay clean and durable

Self-storage and warehouse renovations prioritize durability, lighting, circulation, and life-safety details. Operators need corridors that photograph well for leasing and floors that survive carts, pallets, and daily traffic.

Typical work includes:

- Self-storage unit and corridor upgrades
- Epoxy flooring systems
- Warehouse interior renovations
- Warehouse office and breakroom build-outs
- Loading and service-area improvements

Explore [storage & warehouse renovations](/services/storage-warehouse) or [request a bid](/contact).

Norris serves industrial and storage facilities across Palm Beach, Broward, and Martin Counties.
`,
  },
];
