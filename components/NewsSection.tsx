'use client'

import { motion, useAnimation } from 'framer-motion'
import { MapPin, User } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function NewsSection() {
  const controls = useAnimation()
  const { ref: newsRef, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const recentActivities = [
    {
      title: "Podcast: Syria Issue",
      description: "Historical Background and Current Reality: A comprehensive analysis of the Syrian conflict, examining its historical origins and the current geopolitical situation.",
      venue: "Lahore",
      host: "Dawood Ahmad",
      guest: "Muhammad Asad Ashraf",
      url: "https://www.youtube.com/embed/DUg1w2SikgQ",
    },
    {
      title: "Global Crisis and its Solution",
      description: "An insightful session exploring the interconnected global crises and proposing actionable solutions from a global perspective.",
      venue: "Lahore",
      speaker: "Muhammad Asad Yaseen",
      url: "https://www.youtube.com/embed/xCrxRpG-jLc",
    },
    {
      title: "Energy Crisis in Pakistan and its Solution",
      description: "A detailed discussion on Pakistan's ongoing energy crisis, its root causes, and potential solutions for a sustainable future.",
      venue: "Lahore",
      speaker: "Abdus Salam",
      url: "https://www.youtube.com/embed/nNYNriO-Vg0",
    }
  ]

  return (
    <section id="news" className="py-20 bg-gradient-to-r from-white to-gray-100" ref={newsRef}>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
        }}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#30323B]">Recent Activities</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              className="bg-white text-[#30323B] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative w-full h-56 flex-shrink-0">
                <motion.iframe
                  src={activity.url}
                  title={activity.title}
                  className="w-full h-full border-none"
                  allowFullScreen
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                ></motion.iframe>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-1 h-16 line-clamp-2 text-[#30323B] hover:text-[#EEAE13] transition-colors duration-300">
                  {activity.title}
                </h3>

                <div className="mb-5 h-24">
                  <p className="text-gray-600 line-clamp-4">
                    {activity.description}
                  </p>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#EEAE13] flex-shrink-0" />
                    <span className="text-gray-600">{activity.venue}</span>
                  </div>
                  <div className="space-y-2">
                    {activity.speaker && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#EEAE13] flex-shrink-0" />
                        <span className="text-gray-600 line-clamp-1">{activity.speaker}</span>
                      </div>
                    )}
                    {activity.host && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#EEAE13] flex-shrink-0" />
                        <span className="text-gray-600 line-clamp-1">Host: {activity.host}</span>
                      </div>
                    )}
                    {activity.guest && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#EEAE13] flex-shrink-0" />
                        <span className="text-gray-600 line-clamp-1">Guest: {activity.guest}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
