import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const data = await request.json()

  if (!data.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (!user) {
    return NextResponse.json(
      {
        error: "User with this email does not exists!",
      },
      { status: 400 }
    )
  }

  const resetToken = crypto.randomBytes(20).toString('hex')
  const resetTokenExpiry = new Date(Date.now() + 3600000)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  })

  await sendPasswordResetEmail(user.email, resetToken)

  return NextResponse.json(
    {
      message: "User with this email exists, a password reset link has been sent.",
    },
    { status: 200 }
  )
}

export async function PUT(request: Request) {
  const data = await request.json()

  if (!data.token || !data.password) {
    return NextResponse.json({ error: "Token and new password are required" }, { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: data.token,
      resetTokenExpiry: { gt: new Date() },
    },
  })

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired reset token. Please request a new password reset." },
      { status: 400 }
    )
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

  return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
}
