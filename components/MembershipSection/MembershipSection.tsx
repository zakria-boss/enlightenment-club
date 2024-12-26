'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Button } from "../ui/Button"
import { CheckCircle } from 'lucide-react'
import { Card } from '../ui/Card'
import { Label } from '../ui/Label'

export default function MembershipSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  const criteria = [
    "Enroll in Membership Course",
    "Complete Membership Course successfully",
    "Support TEC’s mission and goals",
    "Attend TEC events and sessions",
    "Adhere to TEC rules and conduct"
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-serif font-bold text-center text-[#30323B] mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join the Enlightenment Club
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Membership Criteria */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 h-full bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-[#30323B]">
                Membership Criteria
              </h3>
              <ul className="space-y-4 mb-8">
                {criteria.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#EEAE13] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{criterion}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h4 className="text-xl font-serif font-semibold mb-4 text-[#30323B]">
                  Join as an Affiliate
                </h4>
                <p className="text-gray-700 mb-4">
                  Can't commit to full membership? Join as an affiliate to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Access selected resources and events</li>
                  <li>• Participate in open discussions</li>
                  <li>• Receive our newsletter</li>
                </ul>
                <Button
                  className="mt-6 bg-[#EEAE13] hover:bg-[#d99d11] text-white"
                  variant="default"
                >
                  Learn More About Affiliation
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-[#30323B]">
                Membership Application
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University/Institution</Label>
                  <Input
                    id="university"
                    placeholder="Enter your university or institution"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Why do you want to join?</Label>
                  <Textarea
                    id="reason"
                    placeholder="Tell us why you'd like to join The Enlightenment Club..."
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <Textarea
                    id="interests"
                    placeholder="What topics or areas of Islamic thought interest you most?"
                    className="w-full min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#EEAE13] hover:bg-[#d99d11] text-white"
                  size="lg"
                >
                  Submit Application
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
