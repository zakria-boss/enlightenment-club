import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  const cabinetMembers = await prisma.cabinetMember.findMany()
  return NextResponse.json(cabinetMembers)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const newMember = await prisma.cabinetMember.create({
    data: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      image: data.image,
    },
  })
  return NextResponse.json(newMember)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const updatedMember = await prisma.cabinetMember.update({
    where: { id: data.id },
    data: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      image: data.image,
    },
  })
  return NextResponse.json(updatedMember)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  await prisma.cabinetMember.delete({
    where: { id: data.id },
  })
  return NextResponse.json({ message: "Member deleted successfully" })
}