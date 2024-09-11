import React, { useState } from 'react'
import { Mail, Phone, MapPin, Youtube, Twitter, Instagram } from 'lucide-react'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#EEAE13] text-[#30323B] font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300 text-lg"
          >
            Send Message
          </button>
        </form>

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#30323B]">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Mail className="w-12 h-12 text-[#EEAE13] mb-4" />
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <a href="mailto:info@enlightenmentclub.org" className="text-[#30323B] hover:text-[#EEAE13] transition duration-300">
                info@enlightenmentclub.org
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 text-[#EEAE13] mb-4" />
              <h4 className="text-xl font-semibold mb-2">Phone</h4>
              <a href="tel:+1234567890" className="text-[#30323B] hover:text-[#EEAE13] transition duration-300">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 text-[#EEAE13] mb-4" />
              <h4 className="text-xl font-semibold mb-2">Address</h4>
              <p className="text-center">123 Enlightenment Street,<br />Knowledge City, 12345</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#30323B]">Connect With Us</h3>
          <div className="flex justify-center space-x-8">
            <a href="https://youtube.com/theenlightenmentclub" target="_blank" rel="noopener noreferrer" className="text-[#30323B] hover:text-[#EEAE13] transition duration-300">
              <Youtube className="w-12 h-12" />
              <span className="sr-only">YouTube</span>
            </a>
            <a href="https://twitter.com/enlightenclub" target="_blank" rel="noopener noreferrer" className="text-[#30323B] hover:text-[#EEAE13] transition duration-300">
              <Twitter className="w-12 h-12" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://instagram.com/theenlightenmentclub" target="_blank" rel="noopener noreferrer" className="text-[#30323B] hover:text-[#EEAE13] transition duration-300">
              <Instagram className="w-12 h-12" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
