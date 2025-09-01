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
        const warehouses = await prisma.warehouse.findMany({
          include: {
            products: {
              include: {
                category: true,
                prices: true,
              },
            },
          },
        })
        res.status(200).json(warehouses)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch warehouses' })
      }
      break

    case 'POST':
      try {
        const { name, address, description } = req.body

        const warehouse = await prisma.warehouse.create({
          data: {
            name,
            address,
            description,
          },
        })

        res.status(201).json(warehouse)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create warehouse' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
