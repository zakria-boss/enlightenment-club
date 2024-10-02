import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
  }

  const hashedNewPassword = await bcrypt.hash(data.newPassword, 10)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedNewPassword }
  })

  return NextResponse.json({ message: "Password changed successfully" })
}