import { PostStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.post.updateMany({
    where: {
      slug: {
        in: [
          "planning-a-miami-kitchen-remodel",
          "miami-primary-bath-remodel",
          "south-florida-outdoor-living",
        ],
      },
    },
    data: { status: PostStatus.draft },
  });
  console.log("unpublished", result.count);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
