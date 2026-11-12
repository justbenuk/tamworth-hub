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

// Public business details checked against the businesses' own sites or
// local listings in November 2026. Optional details are omitted when not
// published by the business. Coordinates are postcode-centre approximations.
const businesses = [
  {
    name: "Tudor House Café",
    slug: "tudor-house-cafe",
    categorySlug: "food-drink",
    description:
      "An independently owned café in one of Tamworth's historic town-centre buildings, serving breakfast, brunch, lunch, homemade cakes and afternoon tea.",
    phone: "07862 260548",
    email: "tudorhousetamworth@gmail.com",
    website: "https://tudorhousecafetamworth.com/",
    addressLine1: "111 Lichfield Street",
    town: "Tamworth",
    postcode: "B79 7QB",
    latitude: 52.634045,
    longitude: -1.699633,
    openingHours: [
      { dayOfWeek: 2, openTime: "09:00", closeTime: "15:00" },
      { dayOfWeek: 3, openTime: "09:00", closeTime: "15:00" },
      { dayOfWeek: 4, openTime: "09:00", closeTime: "15:00" },
      { dayOfWeek: 5, openTime: "09:00", closeTime: "15:00" },
      { dayOfWeek: 6, openTime: "09:00", closeTime: "15:00" },
      { dayOfWeek: 0, openTime: "10:00", closeTime: "15:00" },
    ],
  },
  {
    name: "Bake 180 Coffee Shop",
    slug: "bake-180-coffee-shop",
    categorySlug: "food-drink",
    description:
      "An independent coffee shop at Middleton Hall Courtyard, serving breakfast, afternoon tea and cakes, with vegan, gluten-free and dairy-free options.",
    phone: "01827 286053",
    website: "https://bake180coffeeshop.co.uk/",
    addressLine1: "Units 4–6, Middleton Hall Courtyard, Middleton",
    town: "Tamworth",
    postcode: "B78 2AE",
    latitude: 52.581018,
    longitude: -1.716066,
    openingHours: [
      { dayOfWeek: 0, openTime: "09:30", closeTime: "16:00" },
      { dayOfWeek: 1, openTime: "10:00", closeTime: "16:00" },
      { dayOfWeek: 3, openTime: "10:00", closeTime: "16:00" },
      { dayOfWeek: 4, openTime: "10:00", closeTime: "16:00" },
      { dayOfWeek: 5, openTime: "10:00", closeTime: "16:00" },
      { dayOfWeek: 6, openTime: "09:30", closeTime: "16:00" },
    ],
  },
  {
    name: "Senses of Siam",
    slug: "senses-of-siam",
    categorySlug: "beauty-personal-care",
    description:
      "An independent Thai beauty salon and spa at Middleton Hall Courtyard, offering facials, massage, Thai therapies and spa treatments.",
    phone: "01827 286888",
    email: "hello@sensesofsiam.co.uk",
    website: "https://sensesofsiam.co.uk/",
    addressLine1: "10 The Courtyard Centre, Middleton Hall",
    town: "Tamworth",
    postcode: "B78 2AE",
    latitude: 52.581018,
    longitude: -1.716066,
    openingHours: [
      { dayOfWeek: 0, openTime: "09:30", closeTime: "16:00" },
      { dayOfWeek: 1, openTime: "09:30", closeTime: "16:00" },
      { dayOfWeek: 3, openTime: "09:30", closeTime: "16:00" },
      { dayOfWeek: 4, openTime: "09:30", closeTime: "16:00" },
      { dayOfWeek: 5, openTime: "09:30", closeTime: "16:00" },
      { dayOfWeek: 6, openTime: "09:30", closeTime: "16:00" },
    ],
  },
  {
    name: "Odonata Studios",
    slug: "odonata-studios",
    categorySlug: "shopping-retail",
    description:
      "A local silversmith's studio and shop featuring handmade sterling silver and gemstone jewellery, minerals and work by British designer-makers.",
    phone: "01827 287294",
    email: "gillian@odonatastudios.co.uk",
    website: "https://www.odonatastudios.co.uk/",
    addressLine1: "Unit 8, Middleton Hall Courtyard, Middleton Hall",
    town: "Tamworth",
    postcode: "B78 2AE",
    latitude: 52.581018,
    longitude: -1.716066,
    openingHours: [],
  },
  {
    name: "Hooray Today",
    slug: "hooray-today",
    categorySlug: "shopping-retail",
    description:
      "A Tamworth family-run studio creating handmade cards, prints and keepsakes for life's special moments.",
    website: "https://www.hooraytoday.co.uk/",
    town: "Tamworth",
    openingHours: [],
  },
  {
    name: "Brew",
    slug: "brew-tamworth",
    categorySlug: "food-drink",
    description:
      "A health and wellness café at Town Hall Place serving nourishing food and drinks, including bagels, salads, acai bowls, matcha and protein shakes.",
    addressLine1: "Unit 7, Town Hall Place, Market Street",
    town: "Tamworth",
    postcode: "B79 7FJ",
    openingHours: [],
  },
  {
    name: "Castle Notions",
    slug: "castle-notions",
    categorySlug: "shopping-retail",
    description:
      "An independent haberdashery with fabrics, wool, buttons, threads and sewing supplies, alongside creative workshops and community sessions.",
    phone: "07814 600826",
    website: "https://www.castlenotions.co.uk/",
    addressLine1: "Unit 4, Town Hall Place, Market Street",
    town: "Tamworth",
    postcode: "B79 7FJ",
    openingHours: [],
  },
  {
    name: "The Paint Pot Studio",
    slug: "the-paint-pot-studio",
    categorySlug: "entertainment-events",
    description:
      "A creative studio at Town Hall Place offering pottery painting and changing arts and crafts activities for all ages.",
    addressLine1: "Unit 6, Town Hall Place, Market Street",
    town: "Tamworth",
    postcode: "B79 7FJ",
    openingHours: [],
  },
  {
    name: "Tropical Market",
    slug: "tropical-market",
    categorySlug: "shopping-retail",
    description:
      "A local grocery shop stocking African and Caribbean ingredients, including plantain, yam, spices and other specialist foods.",
    addressLine1: "Unit 2, Town Hall Place, Market Street",
    town: "Tamworth",
    postcode: "B79 7FJ",
    openingHours: [],
  },
  {
    name: "Adelia & Rose",
    slug: "adelia-and-rose",
    categorySlug: "shopping-retail",
    description:
      "A Tamworth jewellery studio specialising in permanent jewellery, custom-fitted bracelets and anklets, charms and hand-picked pieces.",
    website: "https://adeliaandrose.com/",
    addressLine1: "Unit 3, Town Hall Place, Market Street",
    town: "Tamworth",
    postcode: "B79 7FJ",
    openingHours: [
      { dayOfWeek: 3, openTime: "09:30", closeTime: "16:30" },
      { dayOfWeek: 4, openTime: "09:30", closeTime: "16:30" },
      { dayOfWeek: 5, openTime: "09:30", closeTime: "16:30" },
      { dayOfWeek: 6, openTime: "09:00", closeTime: "16:00" },
    ],
  },
  {
    name: "The Saxon Studio",
    slug: "the-saxon-studio",
    categorySlug: "professional-business-services",
    description:
      "A Tamworth maker studio producing custom 3D-printed and laser-cut products, with in-store collection.",
    email: "info@thesaxonstudio.co.uk",
    website: "https://www.thesaxonstudio.co.uk/",
    addressLine1: "Unit 5, Town Hall Place",
    town: "Tamworth",
    postcode: "B79 7FJ",
    openingHours: [],
  },
  {
    name: "HoT Community Café",
    slug: "hot-community-cafe",
    categorySlug: "food-drink",
    description:
      "A volunteer-run community café at Sacred Heart House. Café profits are reinvested in local community support.",
    phone: "07305 093623",
    email: "kerrieyoung@heartoftamworth.org",
    website: "https://www.heartoftamworth.org/",
    addressLine1: "Sacred Heart House, Silver Link Road, Glascote Heath",
    town: "Tamworth",
    postcode: "B77 2EA",
    latitude: 52.624539,
    longitude: -1.661465,
    openingHours: [
      { dayOfWeek: 1, openTime: "08:00", closeTime: "15:00" },
      { dayOfWeek: 2, openTime: "08:00", closeTime: "15:00" },
      { dayOfWeek: 3, openTime: "08:00", closeTime: "15:00" },
      { dayOfWeek: 4, openTime: "08:00", closeTime: "15:00" },
      { dayOfWeek: 5, openTime: "08:00", closeTime: "15:00" },
    ],
  },
  {
    name: "Roasters",
    slug: "roasters-tamworth",
    categorySlug: "food-drink",
    description:
      "A family-run Tamworth café serving freshly prepared food on George Street, with takeaway and outside catering.",
    phone: "01827 311631",
    website: "https://www.roaster-online.co.uk/",
    addressLine1: "35B George Street",
    town: "Tamworth",
    postcode: "B79 7LJ",
    latitude: 52.6333,
    longitude: -1.6933,
    openingHours: [],
  },
  {
    name: "The Book Nook Bakery & Coffee Shop",
    slug: "the-book-nook-bakery-coffee-shop",
    categorySlug: "shopping-retail",
    description:
      "A local bookshop and coffee shop in Bolebridge Mews, bringing together new and pre-loved books, coffee and baked treats.",
    addressLine1: "4–6 Bolebridge Mews, Bolebridge Street",
    town: "Tamworth",
    postcode: "B79 7PA",
    latitude: 52.633324,
    longitude: -1.691784,
    openingHours: [],
  },
  {
    name: "Fuzion Food & Mood",
    slug: "fuzion-food-and-mood",
    categorySlug: "food-drink",
    description:
      "A locally listed café in Glascote serving seasonal breakfasts, brunch and wholesome dishes.",
    addressLine1: "247 Glascote Road, Glascote",
    town: "Tamworth",
    postcode: "B77 2AU",
    openingHours: [],
  },
  {
    name: "Distinctive Dentistry",
    slug: "distinctive-dentistry",
    categorySlug: "health-wellbeing",
    description:
      "An independent private dental practice in Tamworth offering family, preventative and cosmetic dental care.",
    phone: "01827 62112",
    email: "info@distinctivedentistry.co.uk",
    website: "https://www.distinctivedentistry.co.uk/",
    addressLine1: "25 Lower Gungate",
    town: "Tamworth",
    postcode: "B79 7AT",
    openingHours: [
      { dayOfWeek: 1, openTime: "08:45", closeTime: "17:30" },
      { dayOfWeek: 2, openTime: "08:45", closeTime: "17:30" },
      { dayOfWeek: 3, openTime: "08:45", closeTime: "17:30" },
      { dayOfWeek: 4, openTime: "08:45", closeTime: "17:30" },
      { dayOfWeek: 5, openTime: "08:45", closeTime: "17:30" },
    ],
  },
  {
    name: "Mark Evans & Co",
    slug: "mark-evans-and-co",
    categorySlug: "professional-business-services",
    description:
      "A locally established independent estate agency serving Tamworth and nearby villages with property sales and advice.",
    phone: "01827 311300",
    email: "info@markevanstamworth.com",
    website: "https://www.markevansestateagents.co.uk/",
    addressLine1: "8 Victoria Road",
    town: "Tamworth",
    postcode: "B79 7HL",
    openingHours: [],
  },
  {
    name: "PDH Plumbing & Heating",
    slug: "pdh-plumbing-and-heating",
    categorySlug: "trades-home-services",
    description:
      "A Tamworth plumbing and heating business providing boiler, central heating and plumbing work, including air source heat pump installation.",
    phone: "01827 289900",
    email: "enquiries@pdhplumbingandheating.co.uk",
    website: "https://pdhplumbingandheating.co.uk/",
    addressLine1: "105 Valley Drive",
    town: "Tamworth",
    postcode: "B77 5FL",
    openingHours: [],
  },
  {
    name: "Pickerings Solicitors",
    slug: "pickerings-solicitors",
    categorySlug: "professional-business-services",
    description:
      "A Tamworth-based independent law firm advising individuals, families and businesses across the Midlands.",
    phone: "01827 317070",
    email: "mail@pickerings-solicitors.com",
    website: "https://www.pickerings-solicitors.com/",
    addressLine1: "Etchell House, Etchell Court, Bonehill Road",
    town: "Tamworth",
    postcode: "B78 3HQ",
    openingHours: [],
  },
  {
    name: "Smiths Estate Agents",
    slug: "smiths-estate-agents",
    categorySlug: "professional-business-services",
    description:
      "A local estate agency helping buyers and sellers in Tamworth and the surrounding area.",
    phone: "01827 66206",
    website: "https://www.tamworth-homes.co.uk/",
    addressLine1: "5A Victoria Road",
    town: "Tamworth",
    postcode: "B79 7HL",
    openingHours: [],
  },
  {
    name: "Wilkins Estate Agents",
    slug: "wilkins-estate-agents",
    categorySlug: "professional-business-services",
    description:
      "An independently family-run estate agency serving Tamworth and nearby villages with property sales and lettings.",
    phone: "01827 50386",
    email: "info@wilkinsestateagents.co.uk",
    website: "https://wilkinsestateagents.co.uk/",
    addressLine1: "9 Bolebridge Street",
    town: "Tamworth",
    postcode: "B79 7PA",
    latitude: 52.633324,
    longitude: -1.691784,
    openingHours: [],
  },
  {
    name: "The Tamworth Tap",
    slug: "the-tamworth-tap",
    categorySlug: "food-drink",
    description:
      "An independent microbrewery and taproom in Tamworth, serving its own beers alongside guest ales, craft cider and regular community events.",
    email: "info@tamworthbrewing.co.uk",
    website: "https://tamworthtap.co.uk/",
    addressLine1: "29 Market Street",
    town: "Tamworth",
    postcode: "B79 7LR",
    latitude: 52.63298,
    longitude: -1.69593,
    openingHours: [
      { dayOfWeek: 2, openTime: "16:00", closeTime: "21:00" },
      { dayOfWeek: 3, openTime: "16:00", closeTime: "22:00" },
      { dayOfWeek: 4, openTime: "16:00", closeTime: "23:00" },
      { dayOfWeek: 5, openTime: "14:00", closeTime: "23:00" },
      { dayOfWeek: 6, openTime: "12:00", closeTime: "22:00" },
      { dayOfWeek: 0, openTime: "12:00", closeTime: "20:00" },
    ],
  },
] as const;

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

  console.log("Seeding local independent businesses...");

  for (const business of businesses) {
    const {
      categorySlug,
      openingHours,
      ...businessData
    } = business;

    const categoryLink = {
      deleteMany: {},
      create: [{ category: { connect: { slug: categorySlug } } }],
    };
    const hoursLink = {
      deleteMany: {},
      create: openingHours.map((hours) => ({ ...hours })),
    };

    await db.business.upsert({
      where: { slug: business.slug },
      update: {
        ...businessData,
        categories: categoryLink,
        openingHours: hoursLink,
      },
      create: {
        ...businessData,
        isPublished: true,
        isFeatured: false,
        image: "/images/business-placeholder.svg",
        categories: {
          create: [{ category: { connect: { slug: categorySlug } } }],
        },
        openingHours: {
          create: openingHours.map((hours) => ({ ...hours })),
        },
      },
    });
  }

  console.log(`Successfully seeded ${businesses.length} local businesses.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
