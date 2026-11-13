export type AdminNavItem = {
  href: string;
  label: string;
  description?: string;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        description: "Pipeline and site pulse",
      },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { href: "/admin/leads", label: "Leads", description: "Estimate requests" },
      {
        href: "/admin/submissions",
        label: "Submissions",
        description: "Raw form payloads",
      },
      {
        href: "/admin/emails",
        label: "Emails",
        description: "Outbound email log",
      },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/areas", label: "Areas" },
      { href: "/admin/blog", label: "Blog" },
      { href: "/admin/testimonials", label: "Testimonials" },
    ],
  },
  {
    label: "Growth",
    items: [
      {
        href: "/admin/seo",
        label: "SEO health",
        description: "Titles, metas, coverage",
      },
      { href: "/admin/visitors", label: "Visitors" },
      { href: "/admin/experiments", label: "Experiments" },
      { href: "/admin/automations", label: "Automations" },
    ],
  },
  {
    label: "System",
    items: [{ href: "/admin/settings", label: "Settings" }],
  },
];

/** Flat list for backwards-compatible imports */
export const ADMIN_NAV = ADMIN_NAV_GROUPS.flatMap((group) => group.items);
