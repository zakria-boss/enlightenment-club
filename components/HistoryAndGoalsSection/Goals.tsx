'use client'

import React, { useRef } from 'react'
import { Brain, Lightbulb, Users, MessageCircle, Link2 } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

export default function Goals() {
  const goals = [
    {
      icon: <Brain size={32} className="text-[#EEAE13]" />,
      title: "Revival of Islamic Intellect",
      description: "We aim to reignite the spirit of intellectual curiosity and critical thinking that characterized the Islamic Golden Age."
    },
    {
      icon: <Lightbulb size={32} className="text-[#EEAE13]" />,
      title: "Combating Misconceptions",
      description: "Our goal is to address and correct common misconceptions about Islam, both within the Muslim community and in broader society."
    },
    {
      icon: <Users size={32} className="text-[#EEAE13]" />,
      title: "Empowering the Ummah",
      description: "We strive to equip Muslims with the knowledge and tools to engage meaningfully with contemporary issues from an Islamic perspective."
    },
    {
      icon: <MessageCircle size={32} className="text-[#EEAE13]" />,
      title: "Promoting Intellectual Discourse",
      description: "We aim to create spaces for respectful and productive dialogue on important theological, philosophical, and societal issues."
    },
    {
      icon: <Link2 size={32} className="text-[#EEAE13]" />,
      title: "Bridging Tradition and Modernity",
      description: "Our goal is to demonstrate the relevance and applicability of Islamic thought to modern challenges and opportunities."
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
  }

  return (
    <motion.section
      ref={ref} // Attach ref to the section for inView detection
      className="mb-12 py-20"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'} // Trigger the animation based on inView status
      variants={containerVariants}
    >
      <motion.h3
        className="text-3xl font-bold mb-8 text-center text-[#30323B]"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} // Animate only when inView
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Our Goals
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-white to-[#F5F5F5] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="flex-shrink-0 mr-4"
                whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
              >
                {goal.icon}
              </motion.div>
              <motion.h4
                className="text-2xl font-semibold text-[#30323B]"
                whileHover={{ color: '#EEAE13' }}
                transition={{ duration: 0.4 }}
              >
                {goal.title}
              </motion.h4>
            </div>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
            >
              {goal.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
