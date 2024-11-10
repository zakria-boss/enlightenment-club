'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'

export default function BecomeAMember() {
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
      <h3 className="text-3xl font-semibold mb-4 text-[#30323B]">Membership Criteria</h3>
      <p className="text-lg mb-4 text-gray-700">
        Joining The Enlightenment Club is a journey of intellectual growth and community engagement. Our membership process consists of two main steps:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-lg text-gray-700">
        <li>Complete the Membership Series</li>
        <li>Participate in an interview with our cabinet members</li>
      </ol>
      <p className="mt-4 text-lg text-gray-700">
        This process ensures that new members align with our values and are ready to contribute to our mission of fostering Islamic intellectual discourse.
      </p>
    </motion.div>
  )
}