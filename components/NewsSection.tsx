import React from 'react'
import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

export default function NewsSection() {
  return (
    <section id="news" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Our Latest Thoughts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentArticles.map((article, index) => (
            <div key={index} className="bg-white text-[#30323B] rounded-lg shadow-md overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 mr-2 text-[#EEAE13]" />
                  <span className="text-sm">{article.author}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 mr-2 text-[#EEAE13]" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-[#EEAE13] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

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
