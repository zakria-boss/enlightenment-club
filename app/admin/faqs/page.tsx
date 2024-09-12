'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Textarea } from '@/components/ui/Textarea'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]) // Properly typed FAQ array
  const [newFaq, setNewFaq] = useState<Partial<FAQ>>({ question: '', answer: '' }) // Partial FAQ for form input
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null) // Editing FAQ state

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    const response = await fetch('/api/faqs')
    const data: FAQ[] = await response.json()
    setFaqs(data)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingFaq) {
      setEditingFaq({ ...editingFaq, [name]: value })
    } else {
      setNewFaq({ ...newFaq, [name]: value })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editingFaq) {
      await fetch('/api/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      })
      setEditingFaq(null)
    } else {
      await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaq),
      })
      setNewFaq({ question: '', answer: '' })
    }
    fetchFaqs()
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/faqs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchFaqs()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">FAQ Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="question"
          value={editingFaq ? editingFaq.question || '' : newFaq.question}
          onChange={handleInputChange}
          placeholder="Question"
          required
        />
        <Textarea
          name="answer"
          value={editingFaq ? editingFaq.answer || '' : newFaq.answer}
          onChange={handleInputChange}
          placeholder="Answer"
          required
        />
        <Button type="submit">
          {editingFaq ? 'Update FAQ' : 'Add FAQ'}
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell>{faq.question}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingFaq(faq)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(faq.id)} variant="destructive">
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
