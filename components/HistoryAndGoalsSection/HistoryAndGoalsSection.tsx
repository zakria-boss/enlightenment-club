import React from 'react'
import Goals from './Goals'
import Cabinet from './Cabinet'
import RulesAndRegulations from './RulesAndRegulations'
import JourneyGallery from './Journey'

export default function HistoryAndGoalsSection() {
  return (
    <section
      id="history-and-goals"
      className="pt-10 pb-1 bg-gradient-to-r from-[#fdfcfb] via-[#f8f8f8] to-[#ece9e6] shadow-xl"
      // style={{ backgroundImage: 'url("/images/slider/slide4.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <JourneyGallery />
        <Goals />
        <Cabinet />
        <RulesAndRegulations />
      </div>
    </section>
  )
}