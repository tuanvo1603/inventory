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
        const customers = await prisma.customer.findMany({
          include: {
            salesOrders: {
              include: {
                items: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        })
        res.status(200).json(customers)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' })
      }
      break

    case 'POST':
      try {
        const { name, email, phone, address } = req.body

        const customer = await prisma.customer.create({
          data: {
            name,
            email,
            phone,
            address,
          },
        })

        res.status(201).json(customer)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
