'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  duration?: number
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  position = 'top-right',
  duration = 3000,
  onClose,
}) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration)

    const interval = setInterval(() => {
      setProgress((prev) => prev - 100 / (duration / 100))
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [duration, id, onClose])

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" />
      case 'error':
        return <XCircle className="text-red-500" />
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />
      case 'info':
        return <Info className="text-blue-500" />
      default:
        return null
    }
  }

  const toastPositionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  }

  return (
    <div
      className={`fixed p-4 rounded-lg shadow-md bg-white border border-gray-200 z-50 w-80 flex items-center space-x-2 ${
        toastPositionStyles[position]
      }`}
    >
      <div>{getToastIcon()}</div>
      <div className="flex-grow">
        <p className="text-gray-800">{message}</p>
        <div className="h-1 mt-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
          ></div>
        </div>
      </div>
      <button className="ml-4 text-gray-400 hover:text-gray-600" onClick={() => onClose(id)}>
        ✖
      </button>
    </div>
  )
}

export default Toast
