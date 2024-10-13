'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Users, BookOpen, CheckCircle, FileText } from 'lucide-react'

export default function RulesAndRegulations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-[#F5F5F5] to-[#E6E6E6] p-8 rounded-lg shadow-md mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.h3
        className="text-3xl font-bold mb-6 text-center text-[#30323B]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      >
        Rules & Regulations
      </motion.h3>
      <ul className="space-y-6">
        <li className="flex items-start space-x-4 text-lg">
          <motion.span
            className="text-primary w-8 h-8 flex-shrink-0 animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
          >
            <ShieldCheck />
          </motion.span>
          <div>
            <span className="font-semibold">Membership Eligibility:</span> Open to all individuals who share our values and commit to our code of conduct.
          </div>
        </li>
        <li className="flex items-start space-x-4 text-lg">
          <motion.span
            className="text-primary w-8 h-8 flex-shrink-0 animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
          >
            <Users />
          </motion.span>
          <div>
            <span className="font-semibold">Cabinet Selection:</span> Cabinet members are elected by the general membership for two-year terms.
          </div>
        </li>
        <li className="flex items-start space-x-4 text-lg">
          <motion.span
            className="text-primary w-8 h-8 flex-shrink-0 animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
          >
            <BookOpen />
          </motion.span>
          <div>
            <span className="font-semibold">Decision Making:</span> Major decisions are made through consensus in cabinet meetings, with input from the general membership.
          </div>
        </li>
        <li className="flex items-start space-x-4 text-lg">
          <motion.span
            className="text-primary w-8 h-8 flex-shrink-0 animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
          >
            <CheckCircle />
          </motion.span>
          <div>
            <span className="font-semibold">Code of Conduct:</span> All members are expected to engage in respectful dialogue, maintain academic integrity, and uphold Islamic ethics.
          </div>
        </li>
        <li className="flex items-start space-x-4 text-lg">
          <motion.span
            className="text-primary w-8 h-8 flex-shrink-0 animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.7 }}
          >
            <FileText />
          </motion.span>
          <div>
            <span className="font-semibold">Content Creation:</span> All content published under TEC's name must be approved by the relevant cabinet member and align with our mission and values.
          </div>
        </li>
      </ul>
    </motion.div>
  )
}