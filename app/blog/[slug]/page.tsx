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
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <a href="/" className="text-gray-600 hover:text-[#EEAE13] transition duration-300 ease-in-out">
            Home
          </a>{' '}
          /{' '}
          <a href="/blog" className="text-gray-600 hover:text-[#EEAE13] transition duration-300 ease-in-out">
            Blog
          </a>{' '}
          /{' '}
          <span className="text-gray-500">{blog.title}</span>
        </nav>

        {/* Blog Header */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-10">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
        </div>

        {/* Blog Image (Optional) */}
        {blog.image && (
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose lg:prose-xl max-w-none text-gray-800 mb-10">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Divider */}
        <hr className="my-12 border-gray-300" />

        {/* Social Sharing Buttons */}
        <div className="mt-12 flex space-x-4 justify-center">
          <button className="bg-[#EEAE13] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300">
            Share on Twitter
          </button>
          <button className="bg-[#30323B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300">
            Share on Facebook
          </button>
        </div>
      </div>
    </div>
  )
}
