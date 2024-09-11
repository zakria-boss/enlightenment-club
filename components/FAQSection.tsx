import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What are the prerequisites for joining The Enlightenment Club?",
      answer: "There are no strict prerequisites for joining TEC. We welcome individuals from all backgrounds who have a genuine interest in Islamic intellectual discourse and a commitment to personal and community growth. However, a basic understanding of Islamic principles and a willingness to engage in critical thinking are beneficial."
    },
    {
      question: "How much time commitment is required for membership?",
      answer: "The time commitment can vary depending on your level of involvement. At a minimum, members are expected to complete the 8-week Member Series course, which typically requires 3-5 hours per week. Beyond that, members can choose to participate in various events, discussions, and projects according to their interests and availability."
    },
    {
      question: "What are the benefits of becoming a member?",
      answer: "Membership in TEC offers numerous benefits, including access to exclusive lectures and workshops, networking opportunities with like-minded individuals, participation in our annual conference, the ability to contribute to our publications and podcasts, and the opportunity to be part of a community dedicated to intellectual and spiritual growth."
    },
    {
      question: "Is The Enlightenment Club affiliated with any particular Islamic school of thought?",
      answer: "TEC is not affiliated with any specific Islamic school of thought. We encourage diverse perspectives and aim to provide a platform for respectful dialogue among various Islamic traditions. Our focus is on promoting critical thinking and intellectual discourse within the broader framework of Islamic principles."
    },
    {
      question: "How can I contribute to The Enlightenment Club if I'm not ready for full membership?",
      answer: "There are several ways to contribute without full membership. You can attend our public events, subscribe to our newsletter, follow our social media channels, and engage with our content. We also welcome guest contributions to our blog and podcast, subject to editorial review."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#30323B]">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full text-left p-4 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#30323B]">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#EEAE13]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#EEAE13]" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}