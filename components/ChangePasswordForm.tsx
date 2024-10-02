'use client'

import { useState } from 'react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

export default function ChangePasswordForm() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords({ ...passwords, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setMessage('New passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      })

      if (response.ok) {
        setMessage('Password changed successfully')
        setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
      } else {
        const data = await response.json()
        setMessage(data.error || 'Failed to change password')
      }
    } catch (error) {
      setMessage('An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="currentPassword"
        type="password"
        value={passwords.currentPassword}
        onChange={handleInputChange}
        placeholder="Current Password"
        required
      />
      <Input
        name="newPassword"
        type="password"
        value={passwords.newPassword}
        onChange={handleInputChange}
        placeholder="New Password"
        required
      />
      <Input
        name="confirmNewPassword"
        type="password"
        value={passwords.confirmNewPassword}
        onChange={handleInputChange}
        placeholder="Confirm New Password"
        required
      />
      <Button type="submit">Change Password</Button>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </form>
  )
}