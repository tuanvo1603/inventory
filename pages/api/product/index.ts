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
        const products = await prisma.product.findMany({
          include: {
            category: true,
            warehouse: true,
            prices: true,
          },
        })
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' })
      }
      break

    case 'POST':
      try {
        const {
          name,
          model,
          description,
          categoryId,
          warehouseId,
          imei,
          serialNumber,
          condition,
          purchasePrice,
        } = req.body

        const product = await prisma.product.create({
          data: {
            name,
            model,
            description,
            categoryId,
            warehouseId,
            imei,
            serialNumber,
            condition,
            purchasePrice,
          },
          include: {
            category: true,
            warehouse: true,
            prices: true,
          },
        })

        res.status(201).json(product)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
