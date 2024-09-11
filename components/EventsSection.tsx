import React from 'react'

export default function EventsSection() {
  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Upcoming Seminars and Meetups</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-gray-100 text-[#30323B] rounded-lg shadow-md overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Date:</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-[#EEAE13] mr-2">Time:</span>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-[#EEAE13] mr-2">Location:</span>
                  <span>{event.location}</span>
                </div>
                <button
                  className="w-full bg-[#EEAE13] text-[#30323B] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const upcomingEvents = [
  {
    title: "Islamic Philosophy Seminar",
    description: "Explore the rich tradition of Islamic philosophy and its relevance in the modern world.",
    date: "June 15, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Online (Zoom)",
    image: "/images/placeholder.svg"
  },
  {
    title: "Interfaith Dialogue Workshop",
    description: "Join us for a workshop on fostering understanding and cooperation between different faith communities.",
    date: "July 2, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Community Center, 123 Main St",
    image: "/images/placeholder.svg"
  },
  {
    title: "Islamic Art and Architecture Tour",
    description: "A virtual tour exploring the beauty and significance of Islamic art and architecture throughout history.",
    date: "July 20, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Online (Virtual Tour)",
    image: "/images/placeholder.svg"
  }
]
