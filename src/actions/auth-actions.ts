'use server'

import { auth } from "@/lib/auth"
import db from "@/lib/db"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export async function isAuthenticated() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/login')

  return true
}

export async function hasPermission(userId: string, key: string) {

  //check if the user is an admin 
  const user = await db.user.findUnique({
    where: {
      id: userId
    },
    select: {
      role: true
    }
  })

  if (!user) throw new Error('Unauthorised')

  if (user.role === 'ADMIN') return true

  const permission = await db.userPermission.findFirst({
    where: {
      userId,
      permission: { key },
      status: "ACTIVE",
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    }
  })

  return !!permission
}
