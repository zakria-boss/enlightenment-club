'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'

export default function MemberSeries() {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <h3 className="text-3xl font-semibold mb-4 text-[#30323B]">Member Series</h3>
      <p className="text-lg mb-4 text-gray-700">
        Our Member Series is a comprehensive course designed to introduce you to the core principles and objectives of The Enlightenment Club.
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-4">
        <li>Foundations of Islamic intellectual tradition</li>
        <li>Critical thinking and logical reasoning</li>
        <li>Contemporary challenges facing the Muslim Ummah</li>
        <li>The role of political engagement in Islamic thought</li>
      </ul>
      <p className="text-lg text-gray-700 mb-4">
        The course is conducted online and consists of weekly lectures, reading assignments, and discussion sessions. It typically takes 8 weeks to complete.
      </p>
      <motion.button
        className="bg-primary text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-opacity-90 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enroll in Member Series
      </motion.button>
    </motion.div>
  )
}
