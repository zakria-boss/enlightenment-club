'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/contexts/ToastProvider'
import { Eye, EyeOff } from 'lucide-react'
import AccessDenied from '@/components/AccessDenied'
import Loading from '@/components/Loading/Loading'

export default function UpdateProfile() {
  const { data: session, status, update } = useSession();
  const { addToast } = useToast()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setProfile(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
      }))
    }
  }, [session])

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateNewPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
    setHasChanges(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateEmail(profile.email)) {
      addToast('Please enter a valid email address', 'error')
      setIsLoading(false)
      return
    }

    if (profile.newPassword) {
      if (!validateNewPassword(profile.newPassword)) {
        addToast('Password must be at least 8 characters long, include a number, a special character, and a letter', 'error')
        setIsLoading(false)
        return
      }

      if (profile.newPassword !== profile.confirmNewPassword) {
        addToast('New passwords do not match', 'error')
        setIsLoading(false)
        return
      }
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          currentPassword: profile.currentPassword,
          newPassword: profile.newPassword,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        addToast('Profile updated successfully', 'success')

        await update({
          name: data.user.name,
        })

        setProfile(prev => ({
          ...prev,
          name: data.user.name,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }))
        setHasChanges(false)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update profile')
      }
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'An unexpected error occurred', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <Loading/>
    )
  }

  if (status === 'unauthenticated') {
    return <AccessDenied />
  }

  return (
    <div className="container mx-auto p-6 flex justify-center items-center bg-gray-100">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-8">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-bold text-center">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Profile Information</h2>
              <Input
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="p-4 border rounded-lg"
              />
              <Input
                name="email"
                type="email"
                value={profile.email}
                disabled
                placeholder="Email"
                required
                className="p-4 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold">Change Password</h2>
              <div className="relative">
                <Input
                  name="currentPassword"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={profile.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password"
                  className="p-4 border rounded-lg"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </div>
              </div>

              <div className="relative">
                <Input
                  name="newPassword"
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  value={profile.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password (leave blank to keep current)"
                  className="p-4 border rounded-lg"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                >
                  {isNewPasswordVisible ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </div>
              </div>

              <div className="relative">
                <Input
                  name="confirmNewPassword"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  value={profile.confirmNewPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className="p-4 border rounded-lg"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                  {isConfirmPasswordVisible ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading || !hasChanges} className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg">
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
