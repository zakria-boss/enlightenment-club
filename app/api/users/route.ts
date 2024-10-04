import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
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
  const search = searchParams.get('search') || ''
  const role = searchParams.get('role') as Role | null
  const sort = searchParams.get('sort') || 'name'
  const order = searchParams.get('order') || 'asc'

  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          } : {},
          role ? { role } : {},
        ],
      },
      orderBy: { [sort]: order },
      select: { id: true, name: true, email: true, role: true },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const superAdminExists = await prisma.user.findFirst({
      where: { role: Role.SUPER_ADMIN },
    })

    if (data.role === Role.SUPER_ADMIN && superAdminExists) {
      return NextResponse.json({ error: 'A Super Admin already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const now = new Date()
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as Role,
        createdAt: now,
        updatedAt: now,
      },
    })
    return NextResponse.json({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const userToUpdate = await prisma.user.findUnique({ where: { id: data.id } })

    if (userToUpdate?.role === Role.SUPER_ADMIN) {
      if (session.user.role !== Role.SUPER_ADMIN) {
        return NextResponse.json({ error: "Only Super Admin can modify themselves" }, { status: 403 })
      }

      return await prisma.user.update({
        where: { id: data.id },
        data: { name: data.name, updatedAt: new Date() },
      })
    }

    if (session.user.id === data.id) {
      return NextResponse.json({ error: "Cannot modify your own role" }, { status: 403 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role as Role,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'ADMIN') ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const userToDelete = await prisma.user.findUnique({ where: { id: data.id } })
    if (userToDelete?.role === Role.SUPER_ADMIN) {
      return NextResponse.json({ error: "Cannot delete the Super Admin" }, { status: 403 })
    }

    await prisma.user.delete({
      where: { id: data.id },
    })
    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
