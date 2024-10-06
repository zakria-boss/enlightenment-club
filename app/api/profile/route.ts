import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const updateData = {
    name: data.name,
    email: data.email,
    password: "",
  }

  if (data.currentPassword && data.newPassword) {
    const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password || '')
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }
    updateData.password = await bcrypt.hash(data.newPassword, 10)
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
    select: { id: true, name: true, email: true }
  })

  return NextResponse.json({ message: "Profile updated successfully", user: updatedUser })
}
