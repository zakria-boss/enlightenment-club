'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Textarea } from '@/components/ui/Textarea'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

interface Blog {
  id: string
  title: string
  content: string
  author: string
  image: string
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]) // Proper typing for blogs array
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({ title: '', content: '', author: '', image: '' })
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const response = await fetch('/api/blogs')
    const data: Blog[] = await response.json()
    setBlogs(data)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (editingBlog) {
      setEditingBlog({ ...editingBlog, [name]: value })
    } else {
      setNewBlog({ ...newBlog, [name]: value })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editingBlog) {
      await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      })
      setEditingBlog(null)
    } else {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      })
      setNewBlog({ title: '', content: '', author: '', image: '' })
    }
    fetchBlogs()
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/blogs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchBlogs()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Blog Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input
          name="title"
          value={editingBlog ? editingBlog.title : newBlog.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <Textarea
          name="content"
          value={editingBlog ? editingBlog.content : newBlog.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <Input
          name="author"
          value={editingBlog ? editingBlog.author : newBlog.author}
          onChange={handleInputChange}
          placeholder="Author"
          required
        />
        <Input
          name="image"
          value={editingBlog ? editingBlog.image : newBlog.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <Button type="submit">
          {editingBlog ? 'Update Blog' : 'Add Blog'}
        </Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingBlog(blog)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(blog.id)} variant="destructive">
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
