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
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Upcoming Seminars and Meetups</h2>
        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 text-[#30323B] rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Date:</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Time:</span>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-[#EEAE13] mr-2">Location:</span>
                  <span>{event.location}</span>
                </div>
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

const upcomingEvents = [
  {
    title: "Islamic Philosophy Seminar",
    description: "Explore the rich tradition of Islamic philosophy and its relevance in the modern world.",
    date: "June 15, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Online (Zoom)",
    image: "/images/placeholder.svg"
  },
  {
    title: "Interfaith Dialogue Workshop",
    description: "Join us for a workshop on fostering understanding and cooperation between different faith communities.",
    date: "July 2, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Community Center, 123 Main St",
    image: "/images/placeholder.svg"
  },
  {
    title: "Islamic Art and Architecture Tour",
    description: "A virtual tour exploring the beauty and significance of Islamic art and architecture throughout history.",
    date: "July 20, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Online (Virtual Tour)",
    image: "/images/placeholder.svg"
  }
]
