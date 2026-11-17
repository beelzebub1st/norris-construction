export type ProjectExtra = {
  highlights: string[];
  paragraphs: string[];
  scope: string[];
  testimonial?: { quote: string; name: string };
};

export const PROJECT_EXTRAS: Record<string, ProjectExtra> = {
  "west-palm-white-box-turnover": {
    highlights: [
      "Vacated retail suite returned to lease-ready white box",
      "Prior tenant improvements fully removed",
      "Neutral finishes ready for leasing showings",
    ],
    paragraphs: [
      "This West Palm Beach retail suite needed a complete landlord turnover after the previous tenant vacated. Norris demolished remaining partitions and finishes, repaired drywall, restored ceilings where required, and prepared concrete floors for the next build-out.",
      "Neutral paint, lighting preparation, and a broom-clean closeout let the property manager start showing the suite immediately.",
      "The project demonstrates the white-box and tenant turnover work Norris delivers for commercial landlords across Palm Beach County.",
    ],
    scope: [
      "Tenant improvement demolition",
      "Partition removal",
      "Drywall repair and finishing",
      "Neutral repainting",
      "Floor and ceiling preparation",
      "Lease-ready closeout",
    ],
    testimonial: {
      quote:
        "Norris turned a vacated retail suite into a clean white box on schedule. Leasing could show the space immediately.",
      name: "Marcus T. · Property Manager, West Palm Beach",
    },
  },
  "jupiter-corporate-office-buildout": {
    highlights: [
      "Open-plan office with glass conference rooms",
      "Reception and professional finishes",
      "Sequenced TI for a northern Palm Beach suite",
    ],
    paragraphs: [
      "This Jupiter corporate office build-out combined open workstations with glass conference rooms, a reception area, and durable commercial finishes.",
      "Metal stud framing, acoustical ceilings, LVP flooring, LED lighting, and finish carpentry were coordinated to hit the tenant’s move-in date.",
      "The result is a professional suite that supports daily operations and client visits without feeling temporary.",
    ],
    scope: [
      "Metal stud framing",
      "Glass partitions",
      "Acoustical ceilings",
      "Commercial flooring",
      "LED lighting",
      "Finish carpentry",
    ],
  },
  "fort-lauderdale-restaurant-bar": {
    highlights: [
      "Full hospitality interior renovation",
      "Custom bar and dining seating",
      "Specialty lighting and durable finishes",
    ],
    paragraphs: [
      "This Fort Lauderdale restaurant and bar renovation refreshed the dining room and bar for high-traffic hospitality use.",
      "Interior demolition, millwork, stone countertops, flooring, and finish packages were sequenced around the operator’s opening goals.",
      "Front-of-house atmosphere and durable materials were treated as one coordinated commercial project.",
    ],
    scope: [
      "Interior demolition",
      "Bar millwork",
      "Dining finishes",
      "Flooring installation",
      "Specialty lighting coordination",
      "Punch-list closeout",
    ],
    testimonial: {
      quote:
        "Our bar and dining renovation stayed coordinated from demo through final finishes. Clear updates and a space ready for service.",
      name: "Dana L. · Restaurant Operator, Fort Lauderdale",
    },
  },
  "coral-springs-medical-dental": {
    highlights: [
      "Medical and dental suite build-out",
      "Reception and waiting area finishes",
      "Professional clinical support spaces",
    ],
    paragraphs: [
      "This Coral Springs medical and dental suite required a welcoming reception and waiting area with durable, cleanable finishes for clinical operations.",
      "Millwork, corridor finishes, lighting, and code-conscious detailing were delivered as a complete professional office package.",
      "The suite supports patient flow while presenting a polished brand experience from the front door.",
    ],
    scope: [
      "Reception millwork",
      "Waiting area finishes",
      "Corridor upgrades",
      "Lighting",
      "Paint and flooring",
      "Professional suite closeout",
    ],
  },
  "palm-beach-self-storage-renovation": {
    highlights: [
      "Self-storage corridor modernization",
      "Unit doors and epoxy flooring",
      "Commercial lighting upgrades",
    ],
    paragraphs: [
      "This Palm Beach self-storage renovation upgraded corridors for durability, cleanliness, and leasing presentation.",
      "Work included metal roll-up doors, epoxy flake flooring, LED lighting, and life-safety detailing appropriate to a commercial storage facility.",
      "The finished corridors photograph well and hold up under carts, traffic, and daily operations.",
    ],
    scope: [
      "Corridor renovations",
      "Storage unit doors",
      "Epoxy flooring",
      "LED lighting",
      "Corner protection",
      "Life-safety detailing",
    ],
  },
  "broward-warehouse-interior": {
    highlights: [
      "Large-scale warehouse interior preparation",
      "Lighting and industrial readiness",
      "Broom-clean facility modernization",
    ],
    paragraphs: [
      "This Broward warehouse interior renovation prepared a large industrial floor plate for distribution and light-industrial use.",
      "Lighting, polished concrete readiness, and loading-area coordination delivered a move-in-ready commercial facility.",
      "The project reflects Norris’ warehouse and industrial renovation capabilities across South Florida.",
    ],
    scope: [
      "Warehouse interior improvements",
      "Lighting upgrades",
      "Floor preparation",
      "Loading-area coordination",
      "Facility cleanup",
      "Industrial closeout",
    ],
  },
};

export function getProjectExtra(slug: string): ProjectExtra | null {
  return PROJECT_EXTRAS[slug] ?? null;
}
