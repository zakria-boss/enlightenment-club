'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, Info, Users, Calendar, Newspaper, Mail } from 'lucide-react'

interface FooterProps {
  scrollToSection?: (sectionId: string) => void
}

export default function Footer({ scrollToSection = () => {} }: FooterProps) {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.3 })

  const navItems = [
    { name: 'Home', href: 'home', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'About', href: 'about', icon: <Info className="h-5 w-5 mr-2" /> },
    { name: 'Membership', href: 'membership', icon: <Users className="h-5 w-5 mr-2" /> },
    { name: 'Events', href: 'events', icon: <Calendar className="h-5 w-5 mr-2" /> },
    { name: 'News', href: 'news', icon: <Newspaper className="h-5 w-5 mr-2" /> },
    { name: 'Contact', href: 'contact', icon: <Mail className="h-5 w-5 mr-2" /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 1,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delayChildren: 0.1
      }
    }
  }

  const newsletterVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.95],
        delay: 0.8
      }
    }
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  const socialLinkVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="bg-gray-900 text-white py-12"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center hover:text-[#EEAE13] transition-colors duration-300 ease-in-out"
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3 variants={headingVariants} className="text-lg font-semibold mb-4">Connect With Us</motion.h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://youtube.com/theenlightenmentclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white hover:text-[#EEAE13] transition-colors duration-300 ease-in-out"
                variants={socialLinkVariants}
                whileHover="hover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </motion.a>
              <motion.a
                href="https://twitter.com/enlightenclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white hover:text-[#EEAE13] transition-colors duration-300 ease-in-out"
                variants={socialLinkVariants}
                whileHover="hover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com/theenlightenmentclub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white hover:text-[#EEAE13] transition-colors duration-300 ease-in-out"
                variants={socialLinkVariants}
                whileHover="hover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={newsletterVariants}>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest events and articles.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13] text-black"
                required
              />
              <button
                type="submit"
                className="bg-[#EEAE13] text-[#30323B] px-4 py-2 rounded-r-md hover:bg-opacity-90 transition duration-300 ease-in-out font-semibold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-gray-700 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
        >
          <p>© {new Date().getFullYear()} The Enlightenment Club. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
