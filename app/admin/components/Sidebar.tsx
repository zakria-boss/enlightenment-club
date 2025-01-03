'use client'

import { Calendar, FileText, HelpCircle, Home, LogOut, Menu, UserCircle, Users } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Cabinet', href: '/admin/cabinet', icon: Users },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <button
        className={`md:hidden flex items-center justify-center p-2 bg-primary text-white fixed top-4 ${
          isSidebarOpen ? 'left-60' : 'left-4'
        } z-50 rounded-md transition-all duration-300 ease-in-out`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white space-y-6 py-7 px-2 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <Link href="/admin" className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">TEC Admin</span>
        </Link>
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
                pathname === item.href
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          <Link
            href="/admin/profile"
            className={`flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
              pathname === '/admin/profile'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <UserCircle className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center space-x-2 py-2 px-4 rounded transition duration-200 text-gray-400 hover:bg-gray-800 hover:text-white w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}