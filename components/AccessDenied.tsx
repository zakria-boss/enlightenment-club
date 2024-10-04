'use client'

import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AccessDenied() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <Lock className="h-16 w-16 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! You don’t have permission to access this page. Please log in with the correct account or return to the homepage.
        </p>
        <div className="space-x-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg" onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg" onClick={() => router.push('/')}>
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
