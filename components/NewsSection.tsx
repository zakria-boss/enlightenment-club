'use client'

import { motion, useAnimation } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
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
              <div className="relative overflow-hidden">
                <motion.iframe
                  src={activity.url}
                  title={activity.title}
                  className="w-full h-56 border-b-4 border-gray-200"
                  allowFullScreen
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                ></motion.iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 hover:text-[#EEAE13] transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>
                    <span className="text-[#EEAE13] font-semibold">Venue:</span> {activity.venue}
                  </div>
                  {activity.speaker && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-[#EEAE13]" />
                      <span>{activity.speaker}</span>
                    </div>
                  )}
                  {activity.host && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-[#EEAE13]" />
                      <span>Host: {activity.host}</span>
                    </div>
                  )}
                  {activity.guest && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-[#EEAE13]" />
                      <span>Guest: {activity.guest}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
