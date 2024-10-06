import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const events = await prisma.event.findMany()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.title || !data.description || !data.date || !data.time || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.id || !data.title || !data.description || !data.date || !data.time || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const event = await prisma.event.findUnique({
      where: { id: data.id },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    await prisma.event.delete({
      where: { id: data.id },
    })
    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
