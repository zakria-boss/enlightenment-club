'use client'

import { useState, useEffect } from 'react'
import { BlogList } from './BlogList'

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  slug: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Latest Blogs</h2>
        {blogs.length > 0 ? (
          <BlogList blogs={blogs} />
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </section>
  )
}
