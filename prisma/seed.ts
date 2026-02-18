import db from "@/lib/db"

async function main() {
  console.log('🌱 Starting seed...')

  // Create categories first
  const categories = await createCategories()
  console.log('✅ Categories created')

  // Create permissions
  const permissions = await createPermissions()
  console.log('✅ Permissions created')

  // Grant admin all permissions
  for (const permission of permissions) {
    await db.userPermission.upsert({
      where: {
        userId_permissionId: {
          userId: "aTDC5kRr4NdRwoFgqPli3C1SYbzGTC5L",
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        userId: "aTDC5kRr4NdRwoFgqPli3C1SYbzGTC5L",
        permissionId: permission.id,
        status: 'ACTIVE',
        grantedAt: new Date(),
      },
    })
  }
  console.log('✅ Admin permissions granted')

  // Create Tamworth businesses
  await createBusinesses("aTDC5kRr4NdRwoFgqPli3C1SYbzGTC5L", categories)
  console.log('✅ Businesses created')

  console.log('🎉 Seed completed!')
}

async function createCategories() {
  // Parent categories
  const foodDrink = await db.category.upsert({
    where: { slug: 'food-drink' },
    update: {},
    create: {
      name: 'Food & Drink',
      slug: 'food-drink',
    },
  })

  const retail = await db.category.upsert({
    where: { slug: 'retail-shopping' },
    update: {},
    create: {
      name: 'Retail & Shopping',
      slug: 'retail-shopping',
    },
  })

  const healthBeauty = await db.category.upsert({
    where: { slug: 'health-beauty' },
    update: {},
    create: {
      name: 'Health & Beauty',
      slug: 'health-beauty',
    },
  })

  const services = await db.category.upsert({
    where: { slug: 'services-trades' },
    update: {},
    create: {
      name: 'Services & Trades',
      slug: 'services-trades',
    },
  })

  const leisure = await db.category.upsert({
    where: { slug: 'leisure-entertainment' },
    update: {},
    create: {
      name: 'Leisure & Entertainment',
      slug: 'leisure-entertainment',
    },
  })

  // Child categories
  const restaurants = await db.category.upsert({
    where: { slug: 'restaurants' },
    update: {},
    create: {
      name: 'Restaurants',
      slug: 'restaurants',
      parentId: foodDrink.id,
    },
  })

  const cafes = await db.category.upsert({
    where: { slug: 'cafes' },
    update: {},
    create: {
      name: 'Cafés',
      slug: 'cafes',
      parentId: foodDrink.id,
    },
  })

  const pubs = await db.category.upsert({
    where: { slug: 'pubs-bars' },
    update: {},
    create: {
      name: 'Pubs & Bars',
      slug: 'pubs-bars',
      parentId: foodDrink.id,
    },
  })

  const clothing = await db.category.upsert({
    where: { slug: 'clothing-fashion' },
    update: {},
    create: {
      name: 'Clothing & Fashion',
      slug: 'clothing-fashion',
      parentId: retail.id,
    },
  })

  const gyms = await db.category.upsert({
    where: { slug: 'gyms-fitness' },
    update: {},
    create: {
      name: 'Gyms & Fitness',
      slug: 'gyms-fitness',
      parentId: healthBeauty.id,
    },
  })

  return {
    foodDrink,
    retail,
    healthBeauty,
    services,
    leisure,
    restaurants,
    cafes,
    pubs,
    clothing,
    gyms,
  }
}

async function createPermissions() {
  const directory = await db.permission.upsert({
    where: { key: 'directory' },
    update: {},
    create: {
      key: 'directory',
      name: 'Business Directory',
      description: 'Create and manage business listings',
      isActive: true,
    },
  })

  const jobs = await db.permission.upsert({
    where: { key: 'jobs' },
    update: {},
    create: {
      key: 'jobs',
      name: 'Job Postings',
      description: 'Post and manage job listings',
      isActive: true,
    },
  })

  const events = await db.permission.upsert({
    where: { key: 'events' },
    update: {},
    create: {
      key: 'events',
      name: 'Event Listings',
      description: 'Create and manage events',
      isActive: true,
    },
  })

  const premiumAds = await db.permission.upsert({
    where: { key: 'premium_ads' },
    update: {},
    create: {
      key: 'premium_ads',
      name: 'Premium Advertising',
      description: 'Access premium advertising features',
      isActive: true,
    },
  })

  return [directory, jobs, events, premiumAds]
}

async function createBusinesses(adminUserId: string, categories: any) {
  const businesses = [
    {
      name: 'Tamworth Castle',
      slug: 'tamworth-castle',
      description: 'Historic Norman castle offering tours, exhibitions, and events showcasing over 900 years of history.',
      address: 'The Holloway, Tamworth, B79 7NA',
      phone: '01827 709629',
      website: 'https://www.tamworthcastle.co.uk',
      categoryId: categories.leisure.id,
    },
    {
      name: 'Snowdome',
      slug: 'snowdome',
      description: 'The UK\'s premier indoor ski and snowboard centre with real snow, lessons, and equipment hire.',
      address: 'Leisure Island, River Drive, Tamworth, B79 7ND',
      phone: '0843 509 3111',
      website: 'https://www.snowdome.co.uk',
      categoryId: categories.leisure.id,
    },
    {
      name: 'The Bole Bridge',
      slug: 'bole-bridge',
      description: 'Traditional Wetherspoon pub in central Tamworth serving affordable food and drinks.',
      address: 'Bolebridge Street, Tamworth, B79 7PA',
      phone: '01827 66610',
      website: 'https://www.jdwetherspoon.com',
      categoryId: categories.pubs.id,
    },
    {
      name: 'Ankerside Shopping Centre',
      slug: 'ankerside-shopping-centre',
      description: 'Main shopping destination in Tamworth with high street brands, food court, and services.',
      address: 'George Street, Tamworth, B79 7LG',
      phone: '01827 66766',
      website: 'https://www.ankerside.co.uk',
      categoryId: categories.retail.id,
    },
    {
      name: 'Costa Coffee',
      slug: 'costa-coffee-tamworth',
      description: 'Popular coffee chain serving hot drinks, iced coolers, sweet snacks, and sandwiches.',
      address: 'Ventura Park, Tamworth, B78 3HL',
      phone: '01827 310845',
      categoryId: categories.cafes.id,
    },
    {
      name: 'Drayton Manor Resort',
      slug: 'drayton-manor',
      description: 'Major theme park and zoo featuring thrilling rides, Thomas Land, and diverse wildlife.',
      address: 'Drayton Manor Drive, Tamworth, B78 3TW',
      phone: '01827 287979',
      website: 'https://www.draytonmanor.co.uk',
      categoryId: categories.leisure.id,
    },
    {
      name: 'PureGym Tamworth',
      slug: 'puregym-tamworth',
      description: '24/7 gym with modern equipment, free classes, and flexible membership options.',
      address: 'Ventura Park Road, Tamworth, B78 3HL',
      phone: '0344 477 0005',
      website: 'https://www.puregym.com',
      categoryId: categories.gyms.id,
    },
    {
      name: 'Nando\'s',
      slug: 'nandos-tamworth',
      description: 'Afro-Portuguese chain restaurant specialising in flame-grilled PERi-PERi chicken.',
      address: 'Ventura Park Road, Tamworth, B78 3HL',
      phone: '01827 310688',
      website: 'https://www.nandos.co.uk',
      categoryId: categories.restaurants.id,
    },
    {
      name: 'Wilko',
      slug: 'wilko-tamworth',
      description: 'High street retailer selling homeware, health, beauty, gardening, and DIY products.',
      address: 'Ankerside Shopping Centre, Tamworth, B79 7LG',
      phone: '01827 68999',
      categoryId: categories.retail.id,
    },
    {
      name: 'Tamworth Snowdome Gym',
      slug: 'tamworth-snowdome-gym',
      description: 'Modern fitness facility with cardio equipment, weights, classes, and swimming pool.',
      address: 'Leisure Island, River Drive, Tamworth, B79 7ND',
      phone: '01827 66066',
      website: 'https://www.freedom-leisure.co.uk',
      categoryId: categories.gyms.id,
    },
  ]

  for (const business of businesses) {
    const { categoryId, ...businessData } = business
    const created = await db.business.upsert({
      where: { slug: business.slug },
      update: {},
      create: {
        ...businessData,
        ownerId: adminUserId,
      },
    })

    // Link to category via BusinessCategory join table
    await db.businessCategory.upsert({
      where: {
        businessId_categoryId: {
          businessId: created.id,
          categoryId,
        },
      },
      update: {},
      create: {
        businessId: created.id,
        categoryId,
        isPrimary: true,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
