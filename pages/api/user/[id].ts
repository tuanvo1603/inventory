import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'User ID is required' })
  }

  switch (req.method) {
    case 'GET':
      return await getUserById(req, res, id)
    case 'PUT':
      return await updateUser(req, res, id)
    case 'DELETE':
      return await deleteUser(req, res, id)
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

// Lấy thông tin user theo ID
async function getUserById(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

// Cập nhật thông tin user
async function updateUser(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const { email, name, role, isActive, password } = req.body

    // Kiểm tra user tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
      }

      // Kiểm tra email đã tồn tại (trừ user hiện tại)
      const emailExists = await prisma.user.findFirst({
        where: {
          email,
          id: { not: id }
        }
      })

      if (emailExists) {
        return res.status(409).json({ error: 'Email already exists' })
      }
    }

    if (role) {
      const validRoles = ['ADMIN', 'MANAGER', 'STAFF', 'USER']
      if (!validRoles.includes(role)) {
        return res.status(400).json({ 
          error: 'Invalid role',
          details: `Role must be one of: ${validRoles.join(', ')}`
        })
      }
    }

    // Chuẩn bị data để update
    const updateData: any = {}
    
    if (email !== undefined) updateData.email = email
    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role
    if (isActive !== undefined) updateData.isActive = isActive

    // Hash password nếu có
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ 
          error: 'Password must be at least 6 characters long' 
        })
      }
      updateData.password = await bcrypt.hash(password, 12)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
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

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    })
  } catch (error: any) {
    console.error('Error updating user:', error)
    
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' })
    }
    
    res.status(500).json({ error: 'Failed to update user' })
  }
}

// Xóa user
async function deleteUser(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    // Kiểm tra user tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Không cho phép xóa admin cuối cùng
    if (existingUser.role === 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN', isActive: true }
      })
      
      if (adminCount <= 1) {
        return res.status(400).json({ 
          error: 'Cannot delete the last active admin user' 
        })
      }
    }

    // Kiểm tra user có liên kết với dữ liệu khác không
    const salesOrdersCount = await prisma.salesOrder.count({
      where: { userId: id }
    })

    const purchaseOrdersCount = await prisma.purchaseOrder.count({
      where: { userId: id }
    })

    if (salesOrdersCount > 0 || purchaseOrdersCount > 0) {
      // Soft delete - chỉ vô hiệu hóa user
      const deactivatedUser = await prisma.user.update({
        where: { id },
        data: { isActive: false },
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

      return res.status(200).json({
        message: 'User deactivated successfully (has associated data)',
        user: deactivatedUser
      })
    }

    // Hard delete - xóa hoàn toàn
    await prisma.user.delete({
      where: { id }
    })

    res.status(200).json({
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
}
