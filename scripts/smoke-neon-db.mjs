import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [settings, services, areas, projects, posts, testimonials] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
      prisma.service.count(),
      prisma.area.count(),
      prisma.project.count(),
      prisma.post.count({ where: { status: "published" } }),
      prisma.testimonial.count({ where: { published: true } }),
    ]);

  if (!settings?.phone?.includes("483-6046")) {
    throw new Error(`Unexpected settings phone: ${settings?.phone}`);
  }
  if (services < 8) throw new Error(`Expected >=8 services, got ${services}`);
  if (areas < 6) throw new Error(`Expected >=6 areas, got ${areas}`);
  if (projects < 6) throw new Error(`Expected >=6 projects, got ${projects}`);
  if (posts < 5) throw new Error(`Expected >=5 posts, got ${posts}`);
  if (testimonials < 3) {
    throw new Error(`Expected >=3 testimonials, got ${testimonials}`);
  }

  const lead = await prisma.lead.create({
    data: {
      name: "Neon Smoke Test",
      phone: "3124836046",
      email: "smoke@norrisconstruction.co",
      message: "End-to-end Neon DB smoke lead — safe to delete.",
      source: "neon_smoke",
    },
  });

  await prisma.lead.delete({ where: { id: lead.id } });

  console.log(
    JSON.stringify(
      {
        ok: true,
        phone: settings.phone,
        email: settings.email,
        services,
        areas,
        projects,
        posts,
        testimonials,
        leadRoundTrip: true,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
