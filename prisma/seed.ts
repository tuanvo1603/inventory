import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 12)
  const staffPassword = await bcrypt.hash('staff123', 12)
  const managerPassword = await bcrypt.hash('manager123', 12)

  // Create default admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@inventory.com' },
    update: {},
    create: {
      email: 'admin@inventory.com',
      name: 'System Administrator',
      password: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create staff user
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@inventory.com' },
    update: {},
    create: {
      email: 'staff@inventory.com',
      name: 'Staff User',
      password: staffPassword,
      role: 'STAFF',
      isActive: true,
    },
  })

  console.log('✅ Created staff user:', staffUser.email)

  // Create manager user
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@inventory.com' },
    update: {},
    create: {
      email: 'manager@inventory.com',
      name: 'Manager User',
      password: managerPassword,
      role: 'MANAGER',
      isActive: true,
    },
  })

  console.log('✅ Created manager user:', managerUser.email)

  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Full system access',
    },
  })

  const managerRole = await prisma.role.upsert({
    where: { name: 'MANAGER' },
    update: {},
    create: {
      name: 'MANAGER',
      description: 'Management access to inventory and orders',
    },
  })

  const staffRole = await prisma.role.upsert({
    where: { name: 'STAFF' },
    update: {},
    create: {
      name: 'STAFF',
      description: 'Basic access to daily operations',
    },
  })

  console.log('✅ Created default roles')

  // Create default permissions
  const permissions = [
    { name: 'user.view', description: 'View users' },
    { name: 'user.create', description: 'Create users' },
    { name: 'user.edit', description: 'Edit users' },
    { name: 'user.delete', description: 'Delete users' },
    { name: 'product.view', description: 'View products' },
    { name: 'product.create', description: 'Create products' },
    { name: 'product.edit', description: 'Edit products' },
    { name: 'product.delete', description: 'Delete products' },
    { name: 'order.view', description: 'View orders' },
    { name: 'order.create', description: 'Create orders' },
    { name: 'order.edit', description: 'Edit orders' },
    { name: 'order.delete', description: 'Delete orders' },
    { name: 'report.view', description: 'View reports' },
  ]

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    })
  }

  console.log('✅ Created default permissions')

  // Create default warehouse
  const defaultWarehouse = await prisma.warehouse.upsert({
    where: { id: 'main-warehouse-id' },
    update: {},
    create: {
      id: 'main-warehouse-id',
      name: 'Main Warehouse',
      address: 'Default warehouse location',
      description: 'Main storage facility for iPhone inventory',
      isActive: true,
    },
  })

  console.log('✅ Created default warehouse:', defaultWarehouse.name)

  // Create default product categories
  const categories = [
    { name: 'iPhone 15 Series', description: 'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max' },
    { name: 'iPhone 14 Series', description: 'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max' },
    { name: 'iPhone 13 Series', description: 'iPhone 13, 13 Mini, 13 Pro, 13 Pro Max' },
    { name: 'iPhone 12 Series', description: 'iPhone 12, 12 Mini, 12 Pro, 12 Pro Max' },
    { name: 'iPhone 11 Series', description: 'iPhone 11, 11 Pro, 11 Pro Max' },
    { name: 'iPhone X Series', description: 'iPhone X, XR, XS, XS Max' },
    { name: 'iPhone 8 Series', description: 'iPhone 8, 8 Plus' },
    { name: 'iPhone 7 Series', description: 'iPhone 7, 7 Plus' },
    { name: 'Accessories', description: 'Chargers, cases, and other accessories' },
  ]

  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { id: `category-${category.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: {},
      create: {
        id: `category-${category.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...category,
      },
    })
  }

  console.log('✅ Created default product categories')

  console.log('🎉 Database seeded successfully!')
  console.log('📝 Default admin credentials:')
  console.log('   Email: admin@inventory.com')
  console.log('   Password: admin123')
  console.log('⚠️  Please change the password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
