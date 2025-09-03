import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return await getUsers(req, res)
    case 'POST':
      return await createUser(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).json({ error: 'Method not allowed' })
  }
}

// Lấy danh sách tài khoản với tìm kiếm và phân trang
async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      search, 
      role, 
      isActive, 
      page = '1', 
      limit = '10' 
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // Xây dựng điều kiện where
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ]
    }
    
    if (role && role !== 'ALL') {
      where.role = role
    }
    
    if (isActive !== undefined && isActive !== 'ALL') {
      where.isActive = isActive === 'true'
    }

    // Lấy tổng số bản ghi
    const total = await prisma.user.count({ where })

    // Lấy danh sách users
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // Không trả về password
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNum
    })

    // Thống kê
    const stats = {
      total: await prisma.user.count(),
      active: await prisma.user.count({ where: { isActive: true } }),
      admin: await prisma.user.count({ where: { role: 'ADMIN' } }),
      staff: await prisma.user.count({ where: { role: 'STAFF' } })
    }

    res.status(200).json({
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      },
      stats
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

// Tạo tài khoản mới
async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, name, password, role = 'USER', isActive = true } = req.body

    // Validation
    if (!email || !name || !password) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Email, name, and password are required'
      })
    }

    // Kiểm tra email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      })
    }

    // Kiểm tra password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      })
    }

    // Kiểm tra role hợp lệ
    const validRoles = ['ADMIN', 'MANAGER', 'STAFF', 'USER']
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        error: 'Invalid role',
        details: `Role must be one of: ${validRoles.join(', ')}`
      })
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already exists',
        details: 'A user with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Tạo user mới
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        isActive
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
        // Không trả về password
      }
    })

    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    })
  } catch (error: any) {
    console.error('Error creating user:', error)
    
    // Handle Prisma unique constraint violation
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        error: 'Email already exists' 
      })
    }
    
    res.status(500).json({ error: 'Failed to create user' })
  }
}
