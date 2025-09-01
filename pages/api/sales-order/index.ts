import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const salesOrders = await prisma.salesOrder.findMany({
          include: {
            customer: true,
            user: true,
            items: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
                warehouse: true,
              },
            },
            payments: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
        res.status(200).json(salesOrders)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sales orders' })
      }
      break

    case 'POST':
      try {
        const { customerId, userId, items } = req.body

        // Calculate total amount
        const totalAmount = items.reduce(
          (sum: number, item: any) => sum + item.unitPrice * item.quantity,
          0
        )

        // Generate order number
        const orderNumber = `SO-${Date.now()}`

        const salesOrder = await prisma.salesOrder.create({
          data: {
            orderNumber,
            customerId,
            userId,
            totalAmount,
            items: {
              create: items.map((item: any) => ({
                productId: item.productId,
                warehouseId: item.warehouseId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.unitPrice * item.quantity,
              })),
            },
          },
          include: {
            customer: true,
            user: true,
            items: {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
                warehouse: true,
              },
            },
            payments: true,
          },
        })

        res.status(201).json(salesOrder)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create sales order' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
