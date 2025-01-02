'use client'

import React, { useState } from 'react'

interface Event {
  title: string
  date?: string
  time?: string
  venue: string
}

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  events: Event[]
}

export function EventRegistrationModal({ isOpen, onClose, events }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    event: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here send the data to your backend
    // console.log('Form submitted:', formData)
    showToast("Registration Successful! We will contact you shortly.")
    onClose()
    setFormData({ name: '', email: '', contact: '', event: '' })
  }

  const showToast = (message: string) => {
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg'
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Event Registration</h2>
        <p className="mb-4">Please fill in your details to register for the event.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block mb-1">Contact Number</label>
            <input
              id="contact"
              type="tel"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Your contact number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="event" className="block mb-1">Select Event</label>
            <select
              id="event"
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={event.title}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#EEAE13] text-white rounded hover:bg-opacity-90"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
