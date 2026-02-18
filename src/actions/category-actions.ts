'use server'

import db from "@/lib/db"

export async function fetchParentCategories() {
  try {
    const categories = await db.category.findMany({
      where: { parentId: null },
      include: {
        _count: {
          select: {
            children: true
          }
        }
      }
    })

    //return an error if something is wrong
    if (!categories) throw new Error('Something Went Wrong')
    return categories
  } catch (error) {
    throw new Error(`Error: ${error}`)
  }
}

export async function fetchCategoryBySlug(slug: string) {
  return await db.category.findUnique({
    where: { slug },
    include: {
      parent: true,
      children: {
        include: {
          _count: {
            select: {
              businessCategories: true
            },
          },
        },
      },
    },
  })
}

export async function fetchBusinessesByCategory(categoryId: string) {
  return await db.business.findMany({
    where: {
      categories: {
        some: {
          categoryId,
        },
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  })
}

export async function fetchBusinessBySlug(slug: string) {
  return await db.business.findFirst({
    where: {
      slug
    }
  })
}
