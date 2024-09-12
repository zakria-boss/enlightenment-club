'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Textarea } from '@/components/ui/Textarea'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
}

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ title: '', description: '', date: '', time: '', location: '', image: '' })
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const response = await fetch('/api/events')
    const data = await response.json()
    setEvents(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value })
    } else {
      setNewEvent({ ...newEvent, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEvent) {
      await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent),
      })
      setEditingEvent(null)
    } else {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      })
      setNewEvent({ title: '', description: '', date: '', time: '', location: '', image: '' })
    }
    fetchEvents()
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/events', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchEvents()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Event Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="title"
          value={editingEvent ? editingEvent.title : newEvent.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <Textarea
          name="description"
          value={editingEvent ? editingEvent.description : newEvent.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <Input
          name="date"
          type="date"
          value={editingEvent ? editingEvent.date : newEvent.date}
          onChange={handleInputChange}
          required
        />
        <Input
          name="time"
          type="time"
          value={editingEvent ? editingEvent.time : newEvent.time}
          onChange={handleInputChange}
          required
        />
        <Input
          name="location"
          value={editingEvent ? editingEvent.location : newEvent.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <Input
          name="image"
          value={editingEvent ? editingEvent.image : newEvent.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <Button type="submit">
          {editingEvent ? 'Update Event' : 'Add Event'}
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingEvent(event)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(event.id)} variant="destructive">
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