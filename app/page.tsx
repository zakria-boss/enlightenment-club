'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection/HeroSection'
import MembershipSection from '@/components/MembershipSection/MembershipSection'
import HistoryAndGoalsSection from '@/components/HistoryAndGoalsSection/HistoryAndGoalsSection'
import EventsSection from '@/components/EventsSection'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import BlogSection from '@/components/BlogSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'membership', 'history-and-goals', 'events', 'news', 'contact', 'faq']
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
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      <main className="flex-grow">
        <HeroSection />
        <MembershipSection />
        <HistoryAndGoalsSection />
        <EventsSection />
        <NewsSection />
        <BlogSection />
        <ContactSection />
        <FAQSection />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}
