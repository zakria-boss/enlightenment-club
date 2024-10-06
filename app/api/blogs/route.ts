import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany()
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.title || !data.content || !data.author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    if (!data.id || !data.title || !data.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()
    const blog = await prisma.blog.findUnique({ where: { id: data.id } })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    await prisma.blog.delete({ where: { id: data.id } })
    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
