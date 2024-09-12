import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET() {
  const blogs = await prisma.blog.findMany()
  return NextResponse.json(blogs)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const newBlog = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      author: data.author,
      image: data.image,
      slug: data.slug,
      publishedAt: new Date(),
    },
  })
  return NextResponse.json(newBlog)
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const updatedBlog = await prisma.blog.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
      author: data.author,
      image: data.image,
      slug: data.slug,
    },
  })
  return NextResponse.json(updatedBlog)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  await prisma.blog.delete({
    where: { id: data.id },
  })
  return NextResponse.json({ message: "Blog deleted successfully" })
}