'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Home,
  Info,
  Users,
  Calendar,
  Newspaper,
  Mail,
  Phone,
  MapPin,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'

interface FooterProps {
  scrollToSection?: (sectionId: string) => void
}

export default function Footer({ scrollToSection = () => {} }: FooterProps) {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.3 })

  const navItems = [
    { name: 'Home', href: 'home', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'About', href: 'about', icon: <Info className="h-5 w-5 mr-2" /> },
    {
      name: 'Membership',
      href: 'membership',
      icon: <Users className="h-5 w-5 mr-2" />,
    },
    { name: 'Events', href: 'events', icon: <Calendar className="h-5 w-5 mr-2" /> },
    { name: 'News', href: 'news', icon: <Newspaper className="h-5 w-5 mr-2" /> },
    { name: 'Contact', href: 'contact', icon: <Mail className="h-5 w-5 mr-2" /> },
  ]

  const socialPlatforms = [
    {
      name: 'YouTube',
      url: 'https://youtube.com/theenlightenmentclub',
      icon: <Youtube />,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/theenlightenmentclub',
      icon: <Twitter />,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/theenlightenmentclub',
      icon: <Instagram />,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/theenlightenmentclub',
      icon: <Facebook />,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/theenlightenmentclub',
      icon: <Linkedin />,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const socialLinkVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement form submission logic here (e.g., send data to an API endpoint)
  }

  return (
    <motion.footer
      ref={footerRef}
      className="bg-gray-900 text-white py-16"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Us Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-[#EEAE13]">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              The Enlightenment Club is dedicated to fostering critical thinking and
              intellectual discourse within the Islamic community. Join us on our journey
              towards enlightenment and personal growth.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-[#EEAE13]">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center hover:text-[#EEAE13] transition-colors duration-300"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect With Us */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-[#EEAE13]">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-6">
              {socialPlatforms.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.name}
                  className="text-white hover:text-[#EEAE13] transition-colors duration-300"
                  variants={socialLinkVariants}
                  whileHover="hover"
                >
                  {React.cloneElement(platform.icon, { className: 'h-6 w-6' })}
                </motion.a>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#EEAE13]" />
                <span>info@enlightenmentclub.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#EEAE13]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#EEAE13]" />
                <span>123 Wisdom Street, Enlightenment City, EC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Get in Touch */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-[#EEAE13]">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="footer-name" className="text-white">
                  Name
                </Label>
                <Input
                  id="footer-name"
                  name="name"
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="footer-email" className="text-white">
                  Email
                </Label>
                <Input
                  id="footer-email"
                  name="email"
                  type="email"
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="footer-message" className="text-white">
                  Message
                </Label>
                <Textarea
                  id="footer-message"
                  name="message"
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  rows={3}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#EEAE13] text-gray-900 hover:bg-[#d99d11]"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
