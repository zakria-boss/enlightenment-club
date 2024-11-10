'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Youtube, Twitter, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle form submission logic
    setName('')
    setEmail('')
    setMessage('')
  }

  const { ref: contactInfoRef, inView: isContactInfoInView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  })

  const { ref: formRef, inView: isFormInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <section id="contact" className="pb-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Contact Form Section */}
        <motion.div
          ref={formRef}
          className="mt-20"
          initial={{ opacity: 0, y: -50 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Send Us a Message</h2>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-900">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-900">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-900">Message</label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-[#EEAE13] text-gray-900 font-bold py-3 px-8 rounded-md shadow-md hover:bg-opacity-90 transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
