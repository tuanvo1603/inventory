import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

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

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    // Kiểm tra user tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Không cho phép khóa admin cuối cùng
    if (existingUser.role === 'ADMIN' && existingUser.isActive) {
      const activeAdminCount = await prisma.user.count({
        where: { 
          role: 'ADMIN', 
          isActive: true 
        }
      })
      
      if (activeAdminCount <= 1) {
        return res.status(400).json({ 
          error: 'Cannot deactivate the last active admin user' 
        })
      }
    }

    // Toggle trạng thái active
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: !existingUser.isActive },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const action = updatedUser.isActive ? 'activated' : 'deactivated'
    
    res.status(200).json({
      message: `User ${action} successfully`,
      user: updatedUser
    })
  } catch (error) {
    console.error('Error toggling user status:', error)
    res.status(500).json({ error: 'Failed to toggle user status' })
  }
}
