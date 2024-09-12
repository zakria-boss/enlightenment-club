import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  })

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: `${blog.title} | The Enlightenment Club`,
    description: blog.content.substring(0, 160),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        By {blog.author} on {new Date(blog.publishedAt).toLocaleDateString()}
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  )
}