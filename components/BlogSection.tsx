'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Blog } from '@prisma/client'
import Loading from './Loading/Loading'

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3, })

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs')
        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, duration: 0.6 } }
  }

  const blogListVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.section
      id="blog"
      className="py-20 bg-gradient-to-b from-[#fafafa] to-[#f4f4f4]"
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#30323B]"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest Blogs
        </motion.h2>

        {loading ? (
          <Loading />
        ) : blogs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={blogListVariants}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-[#30323B] mb-4">{blog.title}</h3>
                <p className="text-gray-600">{blog.content.substring(0, 150)}...</p>
                <a
                  href={`/blog/${blog.slug}`}
                  className="text-primary font-semibold hover:underline mt-4 block"
                >
                  Read More
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No blogs available.
          </motion.p>
        )}
      </div>
    </motion.section>
  )
}
