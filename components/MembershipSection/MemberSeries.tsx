import React from 'react'

export default function MemberSeries() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-[#30323B]">Member Series</h3>
      <p className="text-lg mb-4">
        Our Member Series is a comprehensive course designed to introduce you to the core principles and objectives of The Enlightenment Club. The series covers:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Foundations of Islamic intellectual tradition</li>
        <li>Critical thinking and logical reasoning</li>
        <li>Contemporary challenges facing the Muslim Ummah</li>
        <li>The role of political engagement in Islamic thought</li>
      </ul>
      <p className="mb-4">
        The course is conducted online and consists of weekly lectures, reading assignments, and discussion sessions. It typically takes 8 weeks to complete.
      </p>
      <button className="bg-[#EEAE13] text-[#30323B] font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300">
        Enroll in Member Series
      </button>
    </div>
  )
}