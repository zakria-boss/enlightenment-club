'use client'

import { Calendar, Home, Info, Mail, Menu, Newspaper, Users, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logos/Logo';

interface NavigationProps {
  activeSection?: string;
  scrollToSection?: (sectionId: string) => void;
}

export default function Navigation({ activeSection = "", scrollToSection = () => {} }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: 'home', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'About', href: 'about', icon: <Info className="h-5 w-5 mr-2" /> },
    { name: 'Membership', href: 'membership', icon: <Users className="h-5 w-5 mr-2" /> },
    { name: 'Events', href: 'events', icon: <Calendar className="h-5 w-5 mr-2" /> },
    { name: 'News', href: 'news', icon: <Newspaper className="h-5 w-5 mr-2" /> },
    { name: 'Contact', href: 'contact', icon: <Mail className="h-5 w-5 mr-2" /> },
  ]

  return (
    <nav className="bg-gray-900 top-0 left-0 right-0 z-50 sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button onClick={() => scrollToSection('home')} className="flex-shrink-0 flex items-center">
              <Logo className="h-[5rem] w-auto" />
            </button>
          </div>
          <div className="hidden lg:flex lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium flex items-center transition-colors duration-300 ${
                  activeSection === item.href
                    ? 'text-primary'
                    : 'text-white hover:text-primary hover:scale-105'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-transform duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6 transform rotate-180 transition-transform duration-300" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6 transform rotate-0 transition-transform duration-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white bg-opacity-10 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                scrollToSection(item.href);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center ${
                activeSection === item.href
                  ? 'text-primary'
                  : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-primary'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
