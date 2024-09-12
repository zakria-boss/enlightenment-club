import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  const faqs = await prisma.fAQ.findMany()
  return NextResponse.json(faqs)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const newFaq = await prisma.fAQ.create({
    data: {
      question: data.question,
      answer: data.answer,
    },
  })
  return NextResponse.json(newFaq)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const updatedFaq = await prisma.fAQ.update({
    where: { id: data.id },
    data: {
      question: data.question,
      answer: data.answer,
    },
  })
  return NextResponse.json(updatedFaq)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  await prisma.fAQ.delete({
    where: { id: data.id },
  })
  return NextResponse.json({ message: "FAQ deleted successfully" })
}