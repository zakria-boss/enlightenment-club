import React, { useState } from 'react'

export default function ApplicationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Application submitted:', { name, email, reason })
    // Reset form fields
    setName('')
    setEmail('')
    setReason('')
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-[#30323B]">Apply for Membership</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join The Enlightenment Club?</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EEAE13]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#EEAE13] text-[#30323B] font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-300 text-lg"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}