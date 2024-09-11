import React from 'react'
import BecomeAMember from './BecomeAMember'
import MemberSeries from './MemberSeries'
import ApplicationForm from './ApplicationForm'

export default function MembershipSection() {
  return (
    <section id="membership" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Join the Enlightenment Club</h2>
        <BecomeAMember />
        <MemberSeries />
        <ApplicationForm />
      </div>
    </section>
  )
}
