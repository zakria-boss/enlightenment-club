'use client'

import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ApplicationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')

  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', { name, email, reason })
    setName('')
    setEmail('')
    setReason('')
  }

  return (
    <motion.div
      ref={ref}
      className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <h3 className="text-3xl font-semibold mb-6 text-[#30323B]">Apply for Membership</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-lg font-medium text-gray-700 mb-2">Why do you want to join The Enlightenment Club?</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          ></textarea>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-primary text-white font-bold py-4 px-6 rounded-md shadow-md hover:bg-opacity-90 transition duration-300 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Application
        </motion.button>
      </form>
    </motion.div>
  )
}
