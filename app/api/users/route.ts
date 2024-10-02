import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const role = searchParams.get('role')
  const sort = searchParams.get('sort') || 'name'
  const order = searchParams.get('order') || 'asc'

  const users = await prisma.user.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        role ? { role: role as any } : {},
      ],
    },
    orderBy: { [sort]: order },
    select: { id: true, name: true, email: true, role: true },
  })

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  })
  return NextResponse.json({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role })
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()

  // Prevent users from modifying their own role
  if (session.user.id === data.id) {
    return NextResponse.json({ error: "Cannot modify your own role" }, { status: 403 })
  }

  const updatedUser = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
    },
  })
  return NextResponse.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role })
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()

  // Prevent users from deleting themselves
  if (session.user.id === data.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 403 })
  }

  await prisma.user.delete({
    where: { id: data.id },
  })
  return NextResponse.json({ message: "User deleted successfully" })
}
