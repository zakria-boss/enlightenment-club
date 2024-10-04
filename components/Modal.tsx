import React from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, onConfirm, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end space-x-2 border-t p-4">
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button onClick={onConfirm} >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
