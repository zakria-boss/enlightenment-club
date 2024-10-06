import { BlogList } from '@/components/BlogList'
import { PrismaClient } from '@prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | The Enlightenment Club',
  description: 'Read the latest articles from The Enlightenment Club',
}

const prisma = new PrismaClient()

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <BlogList blogs={blogs} />
    </div>
  )
}