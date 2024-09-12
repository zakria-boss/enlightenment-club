import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  const events = await prisma.event.findMany()
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const newEvent = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      time: data.time,
      location: data.location,
      image: data.image,
    },
  })
  return NextResponse.json(newEvent)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const updatedEvent = await prisma.event.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      time: data.time,
      location: data.location,
      image: data.image,
    },
  })
  return NextResponse.json(updatedEvent)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  await prisma.event.delete({
    where: { id: data.id },
  })
  return NextResponse.json({ message: "Event deleted successfully" })
}