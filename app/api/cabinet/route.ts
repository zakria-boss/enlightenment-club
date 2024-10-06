import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cabinetMembers = await prisma.cabinetMember.findMany()
    return NextResponse.json(cabinetMembers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cabinet members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.name || !data.role || !data.bio) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMember = await prisma.cabinetMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        image: data.image,
      },
    })
    return NextResponse.json(newMember)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create cabinet member" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.id || !data.name || !data.role || !data.bio) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cabinet member" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const member = await prisma.cabinetMember.findUnique({
      where: { id: data.id },
    })

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    await prisma.cabinetMember.delete({
      where: { id: data.id },
    })
    return NextResponse.json({ message: "Member deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete cabinet member" }, { status: 500 })
  }
}
