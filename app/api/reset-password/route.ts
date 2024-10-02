import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const data = await request.json()
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const resetToken = crypto.randomBytes(20).toString('hex')
  const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  })

  await sendPasswordResetEmail(user.email, resetToken)

  return NextResponse.json({ message: "Password reset email sent" })
}

export async function PUT(request: Request) {
  const data = await request.json()
  const user = await prisma.user.findFirst({
    where: {
      resetToken: data.token,
      resetTokenExpiry: { gt: new Date() },
    },
  })

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })

  return NextResponse.json({ message: "Password reset successfully" })
}