'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import MembershipSection from '@/components/MembershipSection'
import EventsSection from '@/components/EventsSection'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'membership', 'events', 'news', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="flex-grow">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <MembershipSection />
        <EventsSection />
        <NewsSection />
        <ContactSection />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}
