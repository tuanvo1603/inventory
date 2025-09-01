# iPhone Resale Inventory Management System

A comprehensive inventory management system built with Next.js for managing iPhone resale business operations.

## Features

- **Account Management**: User authentication and role-based access control
- **Warehouse Management**: Multi-warehouse inventory tracking
- **Product Management**: iPhone inventory with IMEI/Serial tracking
- **Supplier Management**: Supplier relationship management
- **Customer Management**: Customer database and order history
- **Order Management**: Sales and purchase order processing
- **Payment Tracking**: Payment status and financial reporting
- **Reporting**: Dashboard and analytics

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (development), PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd inventory
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your database URL and authentication secrets.

4. Initialize the database
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   │   ├── auth/      # Authentication routes
│   │   ├── product/   # Product management APIs
│   │   ├── warehouse/ # Warehouse management APIs
│   │   └── ...        # Other module APIs
│   ├── index.tsx      # Dashboard homepage
│   └── _app.tsx       # App wrapper with session provider
├── prisma/            # Database schema and migrations
├── lib/               # Utility functions and configurations
├── styles/            # Global styles
└── components/        # Reusable React components
```

## Database Schema

The system uses a relational database with the following main entities:

- Users and Roles (authentication & authorization)
- Warehouses (multi-location inventory)
- Products and Categories (iPhone inventory)
- Customers and Suppliers (relationship management)
- Sales and Purchase Orders (transaction tracking)
- Payments (financial tracking)
- Warehouse Transfers (inter-warehouse movements)

## API Endpoints

### Products
- `GET /api/product` - List all products
- `POST /api/product` - Create new product
- `GET /api/product/[id]` - Get product details
- `PUT /api/product/[id]` - Update product
- `DELETE /api/product/[id]` - Delete product

### Warehouses
- `GET /api/warehouse` - List all warehouses
- `POST /api/warehouse` - Create new warehouse

### Sales Orders
- `GET /api/sales-order` - List all sales orders
- `POST /api/sales-order` - Create new sales order

(Additional endpoints follow similar patterns for other modules)

## Development

### Database Operations

```bash
# Create and apply a new migration
npx prisma migrate dev --name your_migration_name

# Reset database
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Follow the existing code structure and conventions
2. Add new modules by creating API routes in `/pages/api/`
3. Update the Prisma schema for database changes
4. Use TypeScript for all new code

## License

This project is private and proprietary.
