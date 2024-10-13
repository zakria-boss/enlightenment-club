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
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Connect With Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information Section */}
          <motion.div
            ref={contactInfoRef}
            className="mt-10"
            initial={{ opacity: 0, x: -30 }}
            animate={isContactInfoInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl font-semibold mb-8 text-center text-gray-900">Get in Touch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Email */}
              <div className="flex flex-col items-center text-center">
                <Mail className="w-12 h-12 text-[#EEAE13] mb-4 transition-transform duration-300 transform hover:scale-110" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Email</h4>
                <a href="mailto:info@enlightenmentclub.org" className="text-gray-600 hover:text-[#EEAE13] transition-colors duration-300">
                  info@enlightenmentclub.org
                </a>
              </div>
              {/* Phone */}
              <div className="flex flex-col items-center text-center">
                <Phone className="w-12 h-12 text-[#EEAE13] mb-4 transition-transform duration-300 transform hover:scale-110" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Phone</h4>
                <a href="tel:+1234567890" className="text-gray-600 hover:text-[#EEAE13] transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </div>
              {/* Address */}
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-12 h-12 text-[#EEAE13] mb-4 transition-transform duration-300 transform hover:scale-110" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600">
                  123 Enlightenment Street,<br />Knowledge City, 12345
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Media Links Section */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, x: 30 }}
            animate={isContactInfoInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h3 className="text-3xl font-semibold mb-8 text-center text-gray-900">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="https://youtube.com/theenlightenmentclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#EEAE13] transition duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Youtube className="w-12 h-12" />
                <span className="sr-only">YouTube</span>
              </motion.a>
              <motion.a
                href="https://twitter.com/enlightenclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#EEAE13] transition duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter className="w-12 h-12" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://instagram.com/theenlightenmentclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#EEAE13] transition duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram className="w-12 h-12" />
                <span className="sr-only">Instagram</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

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
