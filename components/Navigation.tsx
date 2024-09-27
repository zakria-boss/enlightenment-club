'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

export default function Navigation({ activeSection="", scrollToSection = () => {} }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Membership', href: 'membership' },
    { name: 'Events', href: 'events' },
    { name: 'News', href: 'news' },
    { name: 'Contact', href: 'contact' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => scrollToSection('home')} className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/images/placeholder.svg" alt="The Enlightenment Club Logo" />
              <span className="ml-2 text-xl font-bold text-[#30323B]">The Enlightenment Club</span>
            </button>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeSection === item.href
                    ? 'border-[#EEAE13] text-[#30323B]'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EEAE13]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                scrollToSection(item.href)
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-3 py-2 text-base font-medium ${
                activeSection === item.href
                  ? 'bg-[#EEAE13] bg-opacity-50 border-l-4 border-[#EEAE13] text-[#30323B]'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}