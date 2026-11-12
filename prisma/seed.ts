import "dotenv/config";
import { db } from "@/lib/db";

const categories = [
  { name: "Food & Drink", slug: "food-drink", icon: "utensils" },
  { name: "Shopping & Retail", slug: "shopping-retail", icon: "shopping-bag" },
  {
    name: "Trades & Home Services",
    slug: "trades-home-services",
    icon: "hammer",
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    icon: "scissors",
  },
  { name: "Health & Wellbeing", slug: "health-wellbeing", icon: "heart-pulse" },
  {
    name: "Sport, Fitness & Leisure",
    slug: "sport-fitness-leisure",
    icon: "dumbbell",
  },
  {
    name: "Motoring & Transport",
    slug: "motoring-transport",
    icon: "car-front",
  },
  {
    name: "Property & Accommodation",
    slug: "property-accommodation",
    icon: "house",
  },
  {
    name: "Professional & Business Services",
    slug: "professional-business-services",
    icon: "briefcase-business",
  },
  { name: "Pets & Animals", slug: "pets-animals", icon: "paw-print" },
  {
    name: "Education & Childcare",
    slug: "education-childcare",
    icon: "graduation-cap",
  },
  {
    name: "Entertainment & Events",
    slug: "entertainment-events",
    icon: "party-popper",
  },
];

async function main() {
  console.log("Seeding business categories...");

  for (const [index, category] of categories.entries()) {
    await db.businessCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        icon: category.icon,
        sortOrder: index + 1,
      },
      create: {
        ...category,
        sortOrder: index + 1,
      },
    });
  }

  console.log("Successfully seeded 12 business categories.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
