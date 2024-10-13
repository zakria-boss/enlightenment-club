'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import BecomeAMember from './BecomeAMember'
import MemberSeries from './MemberSeries'
import ApplicationForm from './ApplicationForm'

export default function MembershipSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.8, ease: 'easeInOut' }
    }
  }

  return (
    <motion.section
      id="membership"
      className="py-20 bg-gradient-to-r from-[#fdfcfb] via-[#f8f8f8] to-[#ece9e6] shadow-xl"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-12 text-center text-[#30323B]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join the Enlightenment Club
        </motion.h2>
        <BecomeAMember />
        <MemberSeries />
        <ApplicationForm />
      </div>
    </motion.section>
  )
}
