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
      <h3 className="text-3xl font-semibold mb-4 text-[#30323B]">Join as an Affiliate</h3>
      <p className="text-lg mb-4 text-gray-700">
        Our Affiliate Program offers individuals and organizations the opportunity to collaborate with The Enlightenment Club and benefit from its resources.
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-4">
        <li>Access to exclusive events and discussions</li>
        <li>Opportunities to network with like-minded individuals</li>
        <li>Support in organizing educational initiatives</li>
        <li>Collaboration on intellectual projects</li>
      </ul>
      <motion.button
        className="bg-primary text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-opacity-90 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Become an Affiliate
      </motion.button>
    </motion.div>
  )
}
