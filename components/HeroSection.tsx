import React from 'react'

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="bg-[#30323B] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to The Enlightenment Club</h1>
        <p className="text-xl mb-8">Fostering intellectual and political understanding from an Islamic perspective</p>
        <button
          onClick={() => scrollToSection('membership')}
          className="bg-[#EEAE13] text-[#30323B] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition duration-300 text-lg"
        >
          Join Us
        </button>
      </div>
    </section>
  )
}
