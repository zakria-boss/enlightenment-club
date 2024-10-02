'use client'

import { ToastProvider } from "@/contexts/ToastProvider"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider><SessionProvider>{children}</SessionProvider></ToastProvider>
}