'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Textarea } from '@/components/ui/Textarea'

interface CabinetMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export default function CabinetManagement() {
  const [cabinetMembers, setCabinetMembers] = useState<CabinetMember[]>([]) // Correct typing for array
  const [newMember, setNewMember] = useState<Partial<CabinetMember>>({ name: '', role: '', bio: '', image: '' }) // Partial since we might not need all fields at once
  const [editingMember, setEditingMember] = useState<Partial<CabinetMember> | null>(null) // Editing mode state

  useEffect(() => {
    fetchCabinetMembers()
  }, [])

  const fetchCabinetMembers = async () => {
    const response = await fetch('/api/cabinet')
    const data: CabinetMember[] = await response.json()
    setCabinetMembers(data)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingMember) {
      setEditingMember({ ...editingMember, [name]: value })
    } else {
      setNewMember({ ...newMember, [name]: value })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editingMember) {
      await fetch('/api/cabinet', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMember),
      })
      setEditingMember(null)
    } else {
      await fetch('/api/cabinet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      })
      setNewMember({ name: '', role: '', bio: '', image: '' })
    }
    fetchCabinetMembers()
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/cabinet', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchCabinetMembers()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Cabinet Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="name"
          value={editingMember ? editingMember.name || '' : newMember.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <Input
          name="role"
          value={editingMember ? editingMember.role || '' : newMember.role}
          onChange={handleInputChange}
          placeholder="Role"
          required
        />
        <Textarea
          name="bio"
          value={editingMember ? editingMember.bio || '' : newMember.bio}
          onChange={handleInputChange}
          placeholder="Bio"
          required
        />
        <Input
          name="image"
          value={editingMember ? editingMember.image || '' : newMember.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <Button type="submit">
          {editingMember ? 'Update Member' : 'Add Member'}
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cabinetMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingMember(member)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(member.id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
