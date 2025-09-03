import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const { newPassword } = req.body

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'User ID is required' })
  }

  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ 
      error: 'Password must be at least 6 characters long' 
    })
  }

  try {
    // Kiểm tra user tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Hash password mới
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    })

    res.status(200).json({
      message: 'Password reset successfully'
    })
  } catch (error) {
    console.error('Error resetting password:', error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
}
