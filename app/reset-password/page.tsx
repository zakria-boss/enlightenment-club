'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastProvider'
import Link from 'next/link'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { addToast } = useToast()

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return regex.test(password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword(password)) {
      addToast('Password must be at least 8 characters long, include a number, and a special character', 'error')
      return
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await response.json()
      if (response.ok) {
        addToast('Password reset successfully', 'success')
        setPasswordReset(true)
        setTimeout(() => router.push('/login'), 3000)
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
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        {passwordReset ? (
          <div className="text-center space-y-4">
            <p className="text-lg">Your password has been reset successfully!</p>
            <p>You will be redirected to the login page shortly.</p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Password must be 8+ characters long, with a number and a special character.</p>
            </div>
            <div className="relative">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default function ResetPassword() {
  return (
    <div className="mx-auto p-4 flex items-center justify-center min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}