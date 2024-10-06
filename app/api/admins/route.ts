import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { id: true, name: true, email: true }
  })
  return NextResponse.json(admins)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newAdmin = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'ADMIN'
    }
  })
  return NextResponse.json({ id: newAdmin.id, name: newAdmin.name, email: newAdmin.email })
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  await prisma.user.delete({
    where: { id: data.id }
  })
  return NextResponse.json({ message: "Admin deleted successfully" })
}