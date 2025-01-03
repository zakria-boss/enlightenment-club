'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Trash2, Loader2 } from 'lucide-react'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import Modal from '@/components/Modal'
import { useToast } from '@/contexts/ToastProvider'
import { Role } from '@prisma/client'

interface User {
  id: string
  name: string
  email: string
  role: Role
}

type NewUserType = {
  name: string
  email: string
  password: string
  role: Role
}

export default function UserManagement() {
  const { data: session } = useSession()
  const { addToast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<NewUserType>({
    name: '',
    email: '',
    password: '',
    role: Role.USER,
  })
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('asc')
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const isSuperAdminExists = users.some(user => user.role === Role.SUPER_ADMIN)

  useEffect(() => {
    fetchUsers()
  }, [search, roleFilter, sort, order])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users?search=${search}&role=${roleFilter === 'ALL' ? '' : roleFilter}&sort=${sort}&order=${order}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      addToast('Failed to fetch users', 'error')
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const validateForm = () => {
    if (!newUser.name.trim()) {
      addToast('Name is required', 'error')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      addToast('Invalid email format', 'error')
      return false
    }
    if (newUser.password.length < 6) {
      addToast('Password must be at least 6 characters long', 'error')
      return false
    }
    if (newUser.role === Role.SUPER_ADMIN && isSuperAdminExists) {
      addToast('A Super Admin already exists', 'error')
      return false
    }
    return true
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (!response.ok) throw new Error('Failed to add user')
      setNewUser({ name: '', email: '', password: '', role: Role.USER })
      fetchUsers()
      addToast('User added successfully', 'success')
    } catch (error) {
      if (error instanceof Error) {
        addToast(error.message || 'Failed to update user', 'error')
      } else {
        addToast('An unexpected error occurred', 'error')
      }
    }
    setLoading(false)
  }

  const handleUpdateUser = async (user: User) => {
    console.log("🚀 ~ handleUpdateUser ~ user:", user)
    if (user.role === Role.SUPER_ADMIN && session?.user?.id !== user.id) {
      addToast('Cannot modify another Super Admin', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      })
      if (!response.ok) throw new Error('Failed to update user')
      fetchUsers()
      addToast('User updated successfully', 'success')
    } catch (error) {
      console.error('Error updating user:', error)
      addToast('Failed to update user', 'error')
    }
    setLoading(false)
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return
    const userToBeDeleted = users.find(user => user.id === userToDelete)
    if (userToBeDeleted?.role === Role.SUPER_ADMIN) {
      addToast('Cannot delete the Super Admin', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userToDelete }),
      })
      if (!response.ok) throw new Error('Failed to delete user')
      fetchUsers()
      addToast('User deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting user:', error)
      addToast('Failed to delete user', 'error')
    }
    setUserToDelete(null)
    setShowDeleteModal(false)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <RoleBasedAccess allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="space-y-4">
              <Input name="name" value={newUser.name} onChange={handleInputChange} placeholder="Name" required />
              <Input name="email" type="email" value={newUser.email} onChange={handleInputChange} placeholder="Email" required />
              <Input name="password" type="password" value={newUser.password} onChange={handleInputChange} placeholder="Password" required />
              <Select name="role" value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as Role })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Role.USER}>User</SelectItem>
                  <SelectItem value={Role.EDITOR}>Editor</SelectItem>
                  <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                  {session?.user?.role === Role.SUPER_ADMIN && (
                    <SelectItem value={Role.SUPER_ADMIN}>Super Admin</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add User'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </RoleBasedAccess>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
            />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value={Role.USER}>User</SelectItem>
                <SelectItem value={Role.EDITOR}>Editor</SelectItem>
                <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                <SelectItem value={Role.SUPER_ADMIN}>Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
              {order === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
          {loading ? (
            <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <RoleBasedAccess allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
                    <TableHead>Actions</TableHead>
                    <TableHead>Delete</TableHead>
                  </RoleBasedAccess>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <RoleBasedAccess allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
                      <TableCell className="space-x-2">
                          <Select
                            value={user.role}
                            onValueChange={(value) => handleUpdateUser({ ...user, role: value as Role })}
                            disabled={session?.user?.id === user.id || user.role === Role.SUPER_ADMIN}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Change role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={Role.USER}>User</SelectItem>
                              <SelectItem value={Role.EDITOR}>Editor</SelectItem>
                              <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                              {session?.user?.role === Role.SUPER_ADMIN && (
                                <SelectItem value={Role.SUPER_ADMIN}>Super Admin</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                      </TableCell>
                    </RoleBasedAccess>
                    <TableCell>
                      <RoleBasedAccess allowedRoles={[Role.ADMIN, Role.SUPER_ADMIN]}>
                        <Button
                          onClick={() => { setShowDeleteModal(true); setUserToDelete(user.id) }}
                          variant="destructive"
                          disabled={user.role === Role.SUPER_ADMIN || session?.user?.id === user.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </RoleBasedAccess>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  )
}
