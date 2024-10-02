'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import ChangePasswordForm from '@/components/ChangePasswordForm'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'

interface Admin {
  id: string
  name: string
  email: string
}

export default function SuperAdminDashboard() {
  const { data: session, status } = useSession()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    if (session?.user?.role === 'SUPER_ADMIN') {
      fetchAdmins()
    }
  }, [session])

  const fetchAdmins = async () => {
    const response = await fetch('/api/admins')
    const data = await response.json()
    setAdmins(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAdmin({ ...newAdmin, [name]: value })
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAdmin),
    })
    setNewAdmin({ name: '', email: '', password: '' })
    fetchAdmins()
  }

  const handleDeleteAdmin = async (id: string) => {
    await fetch('/api/admins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchAdmins()
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return <div>Access Denied</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <Input
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <Input
                name="email"
                type="email"
                value={newAdmin.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <Input
                name="password"
                type="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <Button type="submit">Add Admin</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Admin List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteAdmin(admin.id)} variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}