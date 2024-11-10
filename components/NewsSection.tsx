'use client'

import { motion, useAnimation } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function NewsSection() {
  const controls = useAnimation()
  const { ref: newsRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const recentArticles = [
    {
      title: "The Role of Islamic Intellectualism in Today's World",
      excerpt: "Exploring the importance of Islamic thought and scholarship in addressing contemporary challenges.",
      author: "Dr. Amina Khan",
      date: "June 1, 2023",
      image: "/images/placeholder.svg",
      slug: "islamic-intellectualism-today"
    },
    {
      title: "How Political Engagement Can Strengthen the Ummah",
      excerpt: "Examining the ways in which political participation can empower Muslim communities globally.",
      author: "Prof. Yusuf Ali",
      date: "May 25, 2023",
      image: "/images/placeholder.svg",
      slug: "political-engagement-ummah"
    },
    {
      title: "The Intersection of Science and Islamic Ethics",
      excerpt: "Investigating the harmonious relationship between scientific progress and Islamic moral principles.",
      author: "Dr. Fatima Ahmed",
      date: "May 18, 2023",
      image: "/images/placeholder.svg",
      slug: "science-islamic-ethics"
    }
  ]

  return (
    <section id="news" className="py-20 bg-gradient-to-r from-[#fdfcfb] via-[#f8f8f8] to-[#ece9e6]" ref={newsRef}>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } }
        }}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#30323B]">Our Latest Thoughts</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {recentArticles.map((article, index) => (
            <motion.div
              key={index}
              className="bg-white text-[#30323B] rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden" // Adding scale on hover
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut', delay: index * 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative overflow-hidden group">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" // Image zoom effect
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeInOut', delay: index * 0.2 } }
                  }}
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 hover:text-[#EEAE13] transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-6">{article.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User className="w-5 h-5 mr-2 text-[#EEAE13]" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-5 h-5 mr-2 text-[#EEAE13]" />
                  <span>{article.date}</span>
                </div>
                <Link
                  href={`#news`}
                  className="inline-block text-[#EEAE13] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
