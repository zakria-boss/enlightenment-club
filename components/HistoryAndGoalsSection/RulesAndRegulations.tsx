import React from 'react'

export default function RulesAndRegulations() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-[#30323B]">Rules & Regulations</h3>
      <ul className="list-disc list-inside space-y-4">
        <li className="text-lg">
          <span className="font-semibold">Membership Eligibility:</span> Open to all individuals who share our values and commit to our code of conduct.
        </li>
        <li className="text-lg">
          <span className="font-semibold">Cabinet Selection:</span> Cabinet members are elected by the general membership for two-year terms.
        </li>
        <li className="text-lg">
          <span className="font-semibold">Decision Making:</span> Major decisions are made through consensus in cabinet meetings, with input from the general membership.
        </li>
        <li className="text-lg">
          <span className="font-semibold">Code of Conduct:</span> All members are expected to engage in respectful dialogue, maintain academic integrity, and uphold Islamic ethics.
        </li>
        <li className="text-lg">
          <span className="font-semibold">Content Creation:</span> All content published under TEC's name must be approved by the relevant cabinet member and align with our mission and values.
        </li>
      </ul>
    </div>
  )
}