export type ProjectExtra = {
  highlights: string[];
  paragraphs: string[];
  scope: string[];
  testimonial?: { quote: string; name: string };
};

export const PROJECT_EXTRAS: Record<string, ProjectExtra> = {
  "coral-gables-estate-remodel": {
    highlights: [
      "1920s estate refreshed for modern living",
      "Kitchen + primary suite transformation",
      "Garden-facing living spaces reopened",
    ],
    paragraphs: [
      "This Coral Gables estate needed structural reinforcement and a full interior refresh without erasing its Mediterranean character. We opened living spaces to the garden, rebuilt the kitchen for entertaining, and delivered a primary suite that feels spa-level while matching period millwork elsewhere in the home.",
      "MEP systems were upgraded quietly behind the walls. Dust control and phased schedules kept the household functional. Finish selections balanced historic warmth with surfaces that handle South Florida humidity.",
      "The result photographs as a modern classic — familiar from the curb, transformed where life happens every day.",
    ],
    scope: [
      "Structural reinforcement",
      "Kitchen remodel",
      "Primary bath suite",
      "Millwork restoration",
      "MEP upgrades",
      "Garden-facing openings",
    ],
    testimonial: {
      quote:
        "The team handled permitting and finishes flawlessly. Our Gables home feels brand new.",
      name: "Daniel R.",
    },
  },
  "miami-beach-penthouse-kitchen": {
    highlights: [
      "Atlantic-view open kitchen",
      "Custom rift oak cabinetry",
      "Integrated appliance package",
    ],
    paragraphs: [
      "High-rise kitchens demand precision: freight logistics, building rules, and finishes that survive salt air. This Miami Beach penthouse kitchen was rebuilt as an open entertaining hub with Atlantic sightlines and discreet lighting layers.",
      "Custom rift oak cabinetry, porcelain surfaces, and integrated appliances keep the room calm until dinner starts. We coordinated building management, protected corridors, and delivered a clean install that met condo standards.",
      "Before-and-after tells the story — from a dated galley to a chef-ready showpiece designed for hosting.",
    ],
    scope: [
      "Full kitchen demolition & rebuild",
      "Custom cabinetry",
      "Porcelain surfaces",
      "Lighting redesign",
      "Appliance integration",
      "Condo logistics coordination",
    ],
    testimonial: {
      quote:
        "Norris transformed our kitchen without disrupting family life. Communication was clear every week.",
      name: "Patricia M.",
    },
  },
  "fort-lauderdale-outdoor-pavilion": {
    highlights: [
      "Poolside summer kitchen",
      "Covered lounge pavilion",
      "Storm-ready materials",
    ],
    paragraphs: [
      "This Fort Lauderdale backyard needed a true outdoor room — not just a grill on a slab. We built a covered pavilion with a summer kitchen, lounge zone, and lighting designed for long humid evenings.",
      "Drainage, ceiling fans, and weather-rated finishes keep the space usable year-round. The structure ties into the existing pool deck so the whole yard reads as one composition.",
    ],
    scope: [
      "Pavilion structure",
      "Outdoor kitchen",
      "Lounge finishes",
      "Drainage coordination",
      "Lighting & fans",
      "Pool deck tie-in",
    ],
  },
  "brickell-spa-bath": {
    highlights: [
      "Primary spa bath",
      "Steam-ready wet area",
      "High-rise logistics",
    ],
    paragraphs: [
      "Brickell high-rises require quiet precision — freight windows, waterproofing that never fails, and finishes that feel residential rather than hotel-generic. This primary bath was rebuilt as a steam-ready spa with stone, niche storage, and layered lighting.",
      "We sequenced work so the home retained a functioning bath, coordinated building management, and delivered a punch list that closed cleanly.",
    ],
    scope: [
      "Full bath remodel",
      "Waterproofing assembly",
      "Steam shower glass",
      "Custom vanity",
      "Tile & niche work",
      "Ventilation upgrade",
    ],
  },
};

export function getProjectExtra(slug: string): ProjectExtra | null {
  return PROJECT_EXTRAS[slug] ?? null;
}
