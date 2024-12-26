'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EventsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.4,
  })

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Upcoming Activities</h2>
        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingActivities.map((activity, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 text-[#30323B] rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Date:</span>
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Time:</span>
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Venue:</span>
                  <span>{activity.venue}</span>
                </div>
                {activity.speaker && (
                  <div className="flex items-center mb-4">
                    <span className="text-[#EEAE13] mr-2">Speaker:</span>
                    <span>{activity.speaker}</span>
                  </div>
                )}
                <motion.button
                  className="w-full bg-[#EEAE13] text-[white] font-bold py-2 px-4 rounded-md shadow-md hover:bg-opacity-90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const upcomingActivities = [
  {
    title: "Islam vs. Capitalism",
    description: "Explore the ideological clash between Islamic principles and Capitalist systems in this thought-provoking session.",
    date: "26-01-2025 (Sunday)",
    time: "6-8 pm",
    venue: "Lahore",
    speaker: "Muhammad Asad Ashraf"
  },
  {
    title: "TEC Convention 2025",
    description: "Join us for our annual convention featuring renowned speakers, engaging debates, and impactful discussions on pressing global issues.",
    date: "18-02-2025 (Tuesday)",
    time: "9am - 4 pm",
    venue: "Lahore"
  },
  {
    title: "Neo-Colonialism",
    description: "Delve into the modern dynamics of colonialism and its impact on societies, with insights from expert speakers.",
    date: "23-02-2025 (Sunday)",
    time: "6-8 pm",
    venue: "Lahore",
    speaker: "Rafi Ullah"
  }
]
