import React from 'react'
import MissionStatement from './MissionStatement'
import IntroVideo from './IntroVideo'

export default function HeroSection() {
  return (
    <section id="home" className="bg-[#30323B] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">Welcome to The Enlightenment Club</h1>
        <MissionStatement />
        <IntroVideo />
      </div>
    </section>
  )
}