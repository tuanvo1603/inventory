import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { id } = req.query

  switch (method) {
    case 'GET':
      try {
        const product = await prisma.product.findUnique({
          where: { id: id as string },
          include: {
            category: true,
            warehouse: true,
            prices: true,
          },
        })

        if (!product) {
          return res.status(404).json({ error: 'Product not found' })
        }

        res.status(200).json(product)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' })
      }
      break

    case 'PUT':
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

        const product = await prisma.product.update({
          where: { id: id as string },
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

        res.status(200).json(product)
      } catch (error) {
        res.status(500).json({ error: 'Failed to update product' })
      }
      break

    case 'DELETE':
      try {
        await prisma.product.delete({
          where: { id: id as string },
        })

        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
