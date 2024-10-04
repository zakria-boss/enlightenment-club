'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useToast } from '@/contexts/ToastProvider'
import { Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { addToast } = useToast()

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      addToast('Please enter a valid email address', 'error')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (response.ok) {
        addToast('Password reset link sent successfully', 'success')
        setEmailSent(true)
      } else {
        throw new Error(data.error || 'An error occurred')
      }
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'An unexpected error occurred', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=" mx-auto p-4 flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {emailSent ? 'Check Your Email' : 'Forgot Password'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="space-y-4 text-center">
              <p>
                We’ve sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </p>
              <p>
                Can’t find the email? Check your spam folder, or{' '}
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open your email client
                </a>
                {' '}or{' '}
                <a
                  href="https://mail.google.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open Gmail
                </a>
              </p>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
