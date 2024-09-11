import React from 'react'

export default function MembershipSection() {
  return (
    <section id="membership" className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#30323B]">Join the Enlightenment Club</h2>
        <p className="text-xl mb-12 text-center">
          Interested in becoming part of our intellectual movement? The Enlightenment Club invites like-minded individuals to join us in our mission. Our membership process includes completing a membership series followed by an interview.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join?</label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#EEAE13] text-[#30323B] font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300 text-lg"
          >
            Apply for Membership
          </button>
        </form>
      </div>
    </section>
  )
}
