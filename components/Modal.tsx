'use client'

import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  onCancel?: () => void
  title?: string
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
  showCloseIcon?: boolean
  canCloseOnOutsideClick?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  size = 'medium',
  children,
  showCloseIcon = true,
  canCloseOnOutsideClick = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (canCloseOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-1/4 max-w-sm'
      case 'medium':
        return 'w-1/2 max-w-md'
      case 'large':
        return 'w-3/4 max-w-lg'
      default:
        return 'w-1/2'
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg p-6 shadow-lg relative ${getSizeClasses()} transition-transform transform ease-in-out duration-300`}
      >
        {title && (
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            {showCloseIcon && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="mb-4">{children}</div>

        {(onConfirm || onCancel) && (
          <div className="flex justify-end mt-4 space-x-2">
            {onCancel && <Button onClick={onCancel} variant="secondary">Cancel</Button>}
            {onConfirm && <Button onClick={onConfirm} variant="default">Confirm</Button>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
