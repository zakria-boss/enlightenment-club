'use client'

import React, { useRef } from 'react'
import { Globe, BookOpen, Lightbulb, ShieldAlert, Book } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

export default function Goals() {
  const goals = [
    {
      icon: <Globe size={48} className="text-[#EEAE13]" />,
      title: "Understanding Diverse Worldviews",
      description: "Encouraging a broader understanding of different global perspectives and cultures."
    },
    {
      icon: <BookOpen size={48} className="text-[#EEAE13]" />,
      title: "Comparative Study of Islam",
      description: "Facilitating an insightful study of Islam alongside other philosophies and ideologies."
    },
    {
      icon: <Lightbulb size={48} className="text-[#EEAE13]" />,
      title: "Promoting Enlightened Thinking",
      description: "Cultivating critical thinking and reflection on complex, contemporary issues."
    },
    {
      icon: <ShieldAlert size={48} className="text-[#EEAE13]" />,
      title: "Rational Discourse",
      description: "Encouraging logical and respectful dialogue to address misconceptions and biases."
    },
    {
      icon: <Book size={48} className="text-[#EEAE13]" />,
      title: "Promoting Islamic Teachings",
      description: "Advocating for the core principles of Islam to inspire compassion and justice in society."
    }
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        duration: 0.6, ease: 'easeOut', staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
  }

  return (
    <motion.section
      ref={ref}
      className="mb-5 py-10 px-2 w-100 mx-auto"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.h3
        className="text-4xl font-extrabold mb-5 text-center text-[#30323B]"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Our Objectives
      </motion.h3>

      <div className="space-y-5">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-100 mx-auto transition-transform transform hover:scale-105 hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 p-4 rounded-full">
                {goal.icon}
              </div>
              <div className="ml-4">
                <h4 className="text-2xl font-semibold text-[#30323B] mb-2">
                  {goal.title}
                </h4>
                <p className="text-lg text-gray-600">
                  {goal.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
