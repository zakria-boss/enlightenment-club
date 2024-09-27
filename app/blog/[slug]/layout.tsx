'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
