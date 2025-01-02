import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AboutSection() {
  const [cabinetIndex, setCabinetIndex] = useState(0)

  const nextCabinetMember = () => {
    setCabinetIndex((prevIndex) => (prevIndex + 1) % cabinetMembers.length)
  }

  const prevCabinetMember = () => {
    setCabinetIndex((prevIndex) => (prevIndex - 1 + cabinetMembers.length) % cabinetMembers.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#30323B]">Our Journey and Purpose</h2>
        <p className="text-xl mb-12 text-center">
          Founded with the aim to revive the Islamic intellect, TEC has grown into a community of passionate individuals working together to combat misconceptions about Islam. Our mission is rooted in upholding truth and challenging false creeds, with a long-term goal of empowering the Muslim Ummah through knowledge and understanding.
        </p>
        <h3 className="text-2xl font-bold mb-8 text-center text-[#30323B]">Meet Our Team</h3>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${cabinetIndex * 100}%)` }}
          >
            {cabinetMembers.map((member, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mb-4 border-4 border-[#EEAE13]"
                  />
                  <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                  <p className="text-[#EEAE13] mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevCabinetMember}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#EEAE13] text-[#30323B] p-2 rounded-full"
            aria-label="Previous cabinet member"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextCabinetMember}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#EEAE13] text-[#30323B] p-2 rounded-full"
            aria-label="Next cabinet member"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

const cabinetMembers = [
  {
    name: "Abdus Salam",
    role: "President",
    bio: "Abdus Salam leads The Enlightenment Club (TEC), driving strategic initiatives and ensuring intellectual growth within the organization.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Asad Yasin",
    role: "Chairman General Counsel",
    bio: "Asad Yasin advises on legal matters and ensures compliance with The Enlightenment Club's (TEC) governing policies and regulations.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Asad Ashraf",
    role: "Chairman ESF",
    bio: "Asad Ashraf manages the Enlightenment Student Federation (ESF), providing guidance on academic resources and financial support for students.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Ali",
    role: "President ESF PU",
    bio: "Ali leads the Enlightenment Student Federation (ESF) chapter at Punjab University, overseeing operations and educational initiatives at the campus level.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Mehran Tariq",
    role: "Treasurer",
    bio: "Mehran Tariq manages The Enlightenment Club's (TEC) finances, including budgeting, accounting, and financial planning.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Talha",
    role: "Events Coordinator",
    bio: "Talha is responsible for organizing and executing The Enlightenment Club's (TEC) events, workshops, and seminars.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Dawood",
    role: "Media Manager",
    bio: "Dawood manages The Enlightenment Club's (TEC) online presence, including social media content, branding, and promotional materials.",
    image: "/images/placeholder.svg"
  }
];
