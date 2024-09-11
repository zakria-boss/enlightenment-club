import React from 'react'
import History from './History'
import Goals from './Goals'
import Cabinet from './Cabinet'
import RulesAndRegulations from './RulesAndRegulations'

export default function HistoryAndGoalsSection() {
  return (
    <section id="history-and-goals" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Our History and Goals</h2>
        <History />
        <Goals />
        <Cabinet />
        <RulesAndRegulations />
      </div>
    </section>
  )
}