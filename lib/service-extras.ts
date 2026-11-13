export type ServiceExtra = {
  eyebrow: string;
  longSummary: string;
  paragraphs: string[];
  includes: string[];
  process: { title: string; body: string }[];
  gallery: { src: string; alt: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  "custom-homes": {
    eyebrow: "Ground-up luxury",
    longSummary:
      "Architecture partnerships, permitting mastery, and finish standards that photograph like a magazine — built for Miami’s climate and your daily life.",
    paragraphs: [
      "A custom home should feel inevitable on the lot — oriented for light, privacy, breeze, and how you actually live. Norris coordinates architecture partners, structural and MEP engineering, and a curated trades bench so decisions stay aligned from concept sketches through certificate of occupancy.",
      "We treat the schedule as a product: clear milestones, photo updates, and one project lead who owns the conversation. Selections are locked before we mobilize so change orders stay intentional — never last-minute surprises on the job site.",
      "South Florida details matter: impact glass, drainage, stucco and roof assemblies, outdoor rooms that survive summer storms, and interiors that stay cool without fighting the climate. The result is a residence that feels custom on day one and durable for decades.",
    ],
    includes: [
      "Architecture & engineering coordination",
      "Permitting and inspections management",
      "Structural, MEP, and envelope detailing",
      "Premium millwork and finish supervision",
      "Outdoor living integration",
      "Punch list and warranty walkthrough",
    ],
    process: [
      {
        title: "Site & vision",
        body: "Lot analysis, lifestyle brief, and budget band — so the design starts honest.",
      },
      {
        title: "Design & numbers",
        body: "Drawings, specifications, and a transparent estimate before groundbreaking.",
      },
      {
        title: "Build & handover",
        body: "Dedicated supervision, weekly updates, and a clean, documented closeout.",
      },
    ],
    gallery: [
      { src: "/images/services/custom-homes.jpg", alt: "Custom coastal residence" },
      { src: "/images/hero.jpg", alt: "Luxury South Florida facade" },
      { src: "/images/projects/estate-1.jpg", alt: "Estate interior living space" },
      { src: "/images/projects/outdoor.jpg", alt: "Integrated outdoor living" },
      { src: "/images/cta-band.jpg", alt: "Finished custom home exterior" },
      { src: "/images/services/additions.jpg", alt: "Architectural massing detail" },
    ],
    faqs: [
      {
        q: "How long does a custom home take?",
        a: "Most ground-up homes run 12–18 months after permits, depending on scope, finishes, and site conditions.",
      },
      {
        q: "Do you work with our architect?",
        a: "Yes. We partner with your design team or introduce trusted architecture partners who understand coastal construction.",
      },
      {
        q: "Can you handle waterfront lots?",
        a: "We regularly build with coastal code, flood considerations, and durable envelope detailing for Miami-Dade and Broward sites.",
      },
    ],
  },
  renovations: {
    eyebrow: "Whole-home & selective",
    longSummary:
      "Refresh the bones without losing the soul — phased remodels that keep your home livable while we modernize layout, systems, and finishes.",
    paragraphs: [
      "Renovations succeed when logistics are as thoughtful as the finishes. We plan dust control, temporary kitchens, and neighbor-aware schedules so occupied homes stay functional through the work.",
      "Whether it’s a selective refresh or a whole-home transformation, we document scope, allowances, and lead times before demolition. Structural openings, MEP upgrades, and finish packages are coordinated so trades don’t collide.",
      "The goal is a home that feels newly built — while respecting the character that made you buy it. Period millwork, improved flow, and modern systems that disappear into daily life.",
    ],
    includes: [
      "Occupied-home phasing plans",
      "Dust and noise control standards",
      "Structural & systems upgrades",
      "Finish selections guidance",
      "Permit coordination",
      "Weekly progress photo updates",
    ],
    process: [
      {
        title: "Walkthrough & scope",
        body: "We map priorities, keep/replace decisions, and a realistic budget band.",
      },
      {
        title: "Selections & schedule",
        body: "Allowances locked, lead times confirmed, and a phased calendar you can live with.",
      },
      {
        title: "Build & reveal",
        body: "Clean sites, accountable supervision, and a punch list that actually closes.",
      },
    ],
    gallery: [
      { src: "/images/services/renovations.jpg", alt: "Renovated living space" },
      { src: "/images/projects/estate-1.jpg", alt: "Estate remodel interior" },
      { src: "/images/projects/estate-2.jpg", alt: "Updated dining and millwork" },
      { src: "/images/projects/after-kitchen.jpg", alt: "Kitchen after remodel" },
      { src: "/images/projects/bath.jpg", alt: "Updated primary bath" },
      { src: "/images/services/kitchens.jpg", alt: "Connected kitchen living area" },
    ],
    faqs: [
      {
        q: "Can we stay in the house?",
        a: "Often yes. We phase kitchens and baths, set temporary workarounds, and keep pathways clear so daily life continues.",
      },
      {
        q: "How do you handle surprises behind walls?",
        a: "We budget contingencies and document discoveries as written change orders before work continues.",
      },
      {
        q: "Do renovations include permits?",
        a: "Scopes that require permits are managed end-to-end — applications, inspections, and closeout.",
      },
    ],
  },
  kitchens: {
    eyebrow: "Chef-ready & entertaining",
    longSummary:
      "Layouts that cook, surfaces that survive Miami humidity, and lighting that flatters every dinner — kitchens built for how you actually host.",
    paragraphs: [
      "Great kitchens start with flow: prep, cook, serve, clean. We optimize islands, appliance placement, and storage so the room works hard on weeknights and weekends alike.",
      "Cabinetry, stone, and lighting are specified for coastal conditions — materials that clean easily, resist humidity, and still feel luxurious. Integrated appliances and discreet layers of light keep the room calm until you turn the party up.",
      "Many Miami kitchens open to outdoor living. We design thresholds, ventilation, and sightlines so indoor and outdoor entertaining feel like one continuous experience.",
    ],
    includes: [
      "Layout & workflow design",
      "Custom cabinetry coordination",
      "Countertops and backsplash installs",
      "Appliance & plumbing integration",
      "Layered lighting plans",
      "Occupied-home kitchen phasing",
    ],
    process: [
      {
        title: "Cooking interview",
        body: "How you cook, store, and entertain drives every layout decision.",
      },
      {
        title: "Selections lock",
        body: "Cabinets, surfaces, fixtures, and appliances confirmed before demo.",
      },
      {
        title: "Build & reveal",
        body: "Precise installs, punch-perfect finishes, and a kitchen ready to host.",
      },
    ],
    gallery: [
      { src: "/images/services/kitchens.jpg", alt: "Luxury Miami kitchen" },
      { src: "/images/projects/kitchen.jpg", alt: "Open-concept penthouse kitchen" },
      { src: "/images/projects/after-kitchen.jpg", alt: "Kitchen after transformation" },
      { src: "/images/projects/before-kitchen.jpg", alt: "Kitchen before remodel" },
      { src: "/images/projects/estate-2.jpg", alt: "Connected dining area" },
      { src: "/images/services/renovations.jpg", alt: "Kitchen living flow" },
    ],
    faqs: [
      {
        q: "How long does a kitchen remodel take?",
        a: "Most kitchens run 8–14 weeks of construction after selections and permits, depending on cabinetry lead times.",
      },
      {
        q: "Can you match a look I saved online?",
        a: "Bring the references. We’ll translate aesthetics into buildable details, budgets, and realistic lead times.",
      },
      {
        q: "Do you handle temporary kitchens?",
        a: "Yes — we set up temporary cooking zones so you can stay in the home during construction.",
      },
    ],
  },
  bathrooms: {
    eyebrow: "Spa-level suites",
    longSummary:
      "Primary baths and guest suites engineered for humidity — waterproofing first, then the stone, steam, and quiet luxury.",
    paragraphs: [
      "Bathrooms fail when moisture detailing is an afterthought. We prioritize waterproofing, ventilation, and substrate prep before tile patterns and fixtures steal the spotlight.",
      "Primary suites get spa-level intention: double vanities, niche storage, rain and body spray options, heated floors where it makes sense, and lighting that works for mornings and evenings.",
      "Guest baths stay durable and elegant — finishes that clean quickly and materials that hold up to South Florida humidity without looking utilitarian.",
    ],
    includes: [
      "Waterproofing & vapor detailing",
      "Ventilation upgrades",
      "Custom tile and niche work",
      "Vanity and plumbing fixture installs",
      "Glass, mirrors, and lighting",
      "Accessibility-friendly options",
    ],
    process: [
      {
        title: "Ritual mapping",
        body: "How you start and end the day shapes layout, storage, and lighting.",
      },
      {
        title: "Wet-area engineering",
        body: "Waterproofing assemblies and ventilation designed before finishes.",
      },
      {
        title: "Finish & polish",
        body: "Precise tile, glass, and fixture installs with a meticulous punch list.",
      },
    ],
    gallery: [
      { src: "/images/services/bathrooms.jpg", alt: "Spa primary bathroom" },
      { src: "/images/projects/bath.jpg", alt: "Stone and steam primary bath" },
      { src: "/images/placeholders/gallery-3.jpg", alt: "Bath remodel detail" },
      { src: "/images/projects/estate-1.jpg", alt: "Suite adjacency" },
      { src: "/images/services/renovations.jpg", alt: "Updated bath vanity area" },
      { src: "/images/projects/after-kitchen.jpg", alt: "Connected suite finishes" },
    ],
    faqs: [
      {
        q: "How long is a primary bath remodel?",
        a: "Typical primary baths run 6–10 weeks of construction once tile and fixtures are on site.",
      },
      {
        q: "Can you add a steam shower?",
        a: "Yes — with proper waterproofing, glass, and ventilation designed into the assembly from day one.",
      },
      {
        q: "Do you remodel occupied baths?",
        a: "We sequence work so you retain at least one functioning bath whenever possible.",
      },
    ],
  },
  additions: {
    eyebrow: "Expand without looking added-on",
    longSummary:
      "Room additions and second stories that match existing architecture — structural engineering, seamless tie-ins, and finishes that feel original.",
    paragraphs: [
      "The best additions disappear into the original home. We match roof lines, window rhythms, and exterior materials so neighbors assume the space was always there.",
      "Structurally, we engineer foundations, connections, and load paths carefully — especially for second-story expansions. Inside, we align flooring, millwork, and ceilings so transitions feel intentional.",
      "Permitting and HOA coordination are part of the package. We keep documentation tight so the project moves from design to inspection without unnecessary stalls.",
    ],
    includes: [
      "Structural engineering coordination",
      "Matching exterior finishes",
      "Roof and envelope tie-ins",
      "Interior finish continuity",
      "Permit & HOA support",
      "Site protection during build",
    ],
    process: [
      {
        title: "Program & massing",
        body: "Define the rooms you need and how they attach to the existing home.",
      },
      {
        title: "Engineering & permits",
        body: "Structural drawings, applications, and a schedule that respects your household.",
      },
      {
        title: "Build & blend",
        body: "Seamless exteriors, continuous interiors, and a clean site throughout.",
      },
    ],
    gallery: [
      { src: "/images/services/additions.jpg", alt: "Home addition exterior" },
      { src: "/images/services/custom-homes.jpg", alt: "Architectural volume" },
      { src: "/images/projects/estate-1.jpg", alt: "Expanded living interior" },
      { src: "/images/projects/estate-2.jpg", alt: "Connected rooms" },
      { src: "/images/areas/coral-gables.jpg", alt: "Neighborhood-scale addition context" },
      { src: "/images/hero.jpg", alt: "Completed residential exterior" },
    ],
    faqs: [
      {
        q: "Can you add a second story?",
        a: "Yes, when structure and zoning allow. We engineer foundations and framing before design aesthetics lock in.",
      },
      {
        q: "Will it match my existing home?",
        a: "Matching materials, proportions, and detailing is a core part of our addition process.",
      },
      {
        q: "How disruptive is an addition?",
        a: "We protect the occupied home, stage materials carefully, and sequence tie-ins to minimize downtime.",
      },
    ],
  },
  "outdoor-living": {
    eyebrow: "Year-round Florida rooms",
    longSummary:
      "Summer kitchens, covered lounges, and poolside pavilions engineered for sun, storms, and the way you host.",
    paragraphs: [
      "Outdoor living only works if drainage, shade, and durable materials are designed first. We build outdoor rooms that stay comfortable in August and elegant after a storm passes.",
      "Summer kitchens get full appliance planning, ventilation, and surfaces that shrug off salt air. Lounges and pavilions balance breeze, privacy, and lighting for evenings that stretch late.",
      "We coordinate pools, decks, and landscaping partners so the whole backyard reads as one composition — not a collection of disconnected upgrades.",
    ],
    includes: [
      "Covered structures & pavilions",
      "Outdoor kitchens and bars",
      "Drainage and grading coordination",
      "Weather-ready materials",
      "Lighting and ceiling fans",
      "Pool deck and lounge tie-ins",
    ],
    process: [
      {
        title: "Host map",
        body: "How you entertain outdoors drives kitchen, lounge, and shade layout.",
      },
      {
        title: "Structure & systems",
        body: "Roofing, drainage, gas, electric, and finishes specified for coastal durability.",
      },
      {
        title: "Build & style",
        body: "Precise installs and layered lighting so the space photographs and performs.",
      },
    ],
    gallery: [
      { src: "/images/services/outdoor-living.jpg", alt: "Outdoor living pavilion" },
      { src: "/images/projects/outdoor.jpg", alt: "Poolside summer kitchen" },
      { src: "/images/areas/miami-beach.jpg", alt: "Coastal outdoor setting" },
      { src: "/images/areas/fort-lauderdale.jpg", alt: "Waterfront outdoor living" },
      { src: "/images/cta-band.jpg", alt: "Evening outdoor lounge" },
      { src: "/images/services/custom-homes.jpg", alt: "Residence with outdoor rooms" },
    ],
    faqs: [
      {
        q: "Can you build an outdoor kitchen?",
        a: "Yes — with weather-rated appliances, proper ventilation, and surfaces chosen for sun and salt.",
      },
      {
        q: "Do you work around existing pools?",
        a: "We design decks, shade, and kitchens to integrate with existing pools or coordinate new builds with pool partners.",
      },
      {
        q: "How do you handle storms?",
        a: "Structures, fasteners, and finishes are specified with South Florida weather in mind, including drainage that actually works.",
      },
    ],
  },
};

export function getServiceExtra(slug: string): ServiceExtra | null {
  return SERVICE_EXTRAS[slug] ?? null;
}
