'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Calendar, FileText, HelpCircle, LogOut, Menu, Shield } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Cabinet', href: '/admin/cabinet', icon: Users },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { data: session } = useSession()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        className={`md:hidden flex items-center justify-center p-2 bg-[#EEAE13] text-white fixed top-4 ${
          isSidebarOpen ? 'left-60' : 'left-4'
        } z-50 rounded-md transition-all duration-300 ease-in-out`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1f2937] text-white space-y-6 py-7 px-4 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <Link href="/admin" className="text-white flex items-center space-x-2 px-4 mb-6">
          <span className="text-2xl font-extrabold">TEC Admin</span>
        </Link>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-2.5 px-4 rounded-lg transition duration-200 ${
                pathname === item.href
                  ? 'bg-[#EEAE13] text-white'
                  : 'hover:bg-[#EEAE13] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
          {session?.user?.role === 'SUPER_ADMIN' && (
            <Link
              href="/admin/super"
              className={`block py-2.5 px-4 rounded-lg transition duration-200 ${
                pathname === '/admin/super'
                  ? 'bg-[#EEAE13] text-white'
                  : 'hover:bg-[#EEAE13] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Super Admin</span>
              </div>
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-[#EEAE13] hover:text-white w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}