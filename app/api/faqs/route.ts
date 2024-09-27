import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany()
    return NextResponse.json(faqs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.question || !data.answer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newFaq = await prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
      },
    })
    return NextResponse.json(newFaq)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.id || !data.question || !data.answer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updatedFaq = await prisma.fAQ.update({
      where: { id: data.id },
      data: {
        question: data.question,
        answer: data.answer,
      },
    })
    return NextResponse.json(updatedFaq)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const faq = await prisma.fAQ.findUnique({
      where: { id: data.id },
    })

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 })
    }

    await prisma.fAQ.delete({
      where: { id: data.id },
    })
    return NextResponse.json({ message: "FAQ deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
