import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function InventoryReport() {
  const { t } = useTranslation()
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [sortBy, setSortBy] = useState('quantity')

  const [inventoryData] = useState({
    summary: {
      totalProducts: 12,
      totalValue: 185000000,
      lowStockItems: 3,
      outOfStockItems: 1
    },
    warehouseStats: [
      { name: 'Kho Hà Nội', products: 8, value: 120000000, lowStock: 2 },
      { name: 'Kho TP.HCM', products: 6, value: 65000000, lowStock: 1 },
      { name: 'Kho online', products: 4, value: 32000000, lowStock: 0 }
    ],
    products: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max 256GB',
        sku: 'IP15PM256',
        warehouse: 'Kho Hà Nội',
        quantity: 2,
        minStock: 1,
        maxStock: 10,
        avgCost: 25000000,
        totalValue: 50000000,
        status: 'IN_STOCK',
        lastUpdated: '2025-08-29T10:30:00'
      },
      {
        id: 2,
        name: 'iPhone 14 128GB',
        sku: 'IP14128',
        warehouse: 'Kho TP.HCM',
        quantity: 1,
        minStock: 2,
        maxStock: 8,
        avgCost: 18000000,
        totalValue: 18000000,
        status: 'LOW_STOCK',
        lastUpdated: '2025-08-28T15:20:00'
      },
      {
        id: 3,
        name: 'iPhone 13 256GB',
        sku: 'IP13256',
        warehouse: 'Kho Hà Nội',
        quantity: 3,
        minStock: 2,
        maxStock: 6,
        avgCost: 16000000,
        totalValue: 48000000,
        status: 'IN_STOCK',
        lastUpdated: '2025-08-29T09:15:00'
      },
      {
        id: 4,
        name: 'iPhone 12 64GB',
        sku: 'IP1264',
        warehouse: 'Kho online',
        quantity: 0,
        minStock: 1,
        maxStock: 5,
        avgCost: 12000000,
        totalValue: 0,
        status: 'OUT_OF_STOCK',
        lastUpdated: '2025-08-27T14:00:00'
      },
      {
        id: 5,
        name: 'iPhone 15 128GB',
        sku: 'IP15128',
        warehouse: 'Kho TP.HCM',
        quantity: 1,
        minStock: 2,
        maxStock: 8,
        avgCost: 22000000,
        totalValue: 22000000,
        status: 'LOW_STOCK',
        lastUpdated: '2025-08-29T11:45:00'
      },
      {
        id: 6,
        name: 'iPhone 14 Pro 256GB',
        sku: 'IP14P256',
        warehouse: 'Kho Hà Nội',
        quantity: 4,
        minStock: 2,
        maxStock: 10,
        avgCost: 23000000,
        totalValue: 92000000,
        status: 'IN_STOCK',
        lastUpdated: '2025-08-29T08:30:00'
      }
    ]
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_STOCK': return 'bg-emerald-100 text-emerald-800'
      case 'LOW_STOCK': return 'bg-orange-100 text-orange-800'
      case 'OUT_OF_STOCK': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'IN_STOCK': return 'Còn hàng'
      case 'LOW_STOCK': return 'Sắp hết'
      case 'OUT_OF_STOCK': return 'Hết hàng'
      default: return status
    }
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  const filteredProducts = inventoryData.products.filter(product => {
    if (filterStatus === 'ALL') return true
    return product.status === filterStatus
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'quantity': return a.quantity - b.quantity
      case 'value': return b.totalValue - a.totalValue
      case 'name': return a.name.localeCompare(b.name)
      case 'updated': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      default: return 0
    }
  })

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('reports.inventory.title')}</h1>
            <p className="text-slate-600">Theo dõi số lượng và giá trị hàng tồn kho</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="IN_STOCK">Còn hàng</option>
              <option value="LOW_STOCK">Sắp hết</option>
              <option value="OUT_OF_STOCK">Hết hàng</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="quantity">Sắp xếp theo: Số lượng</option>
              <option value="value">Sắp xếp theo: Giá trị</option>
              <option value="name">Sắp xếp theo: Tên</option>
              <option value="updated">Sắp xếp theo: Cập nhật</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📊</span>
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-blue-600">{inventoryData.summary.totalProducts}</p>
                <p className="text-xs text-blue-500 mt-1">Đang quản lý</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📱</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng giá trị</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(inventoryData.summary.totalValue)}
                </p>
                <p className="text-xs text-emerald-500 mt-1">Theo giá vốn</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Sắp hết hàng</p>
                <p className="text-2xl font-bold text-orange-600">{inventoryData.summary.lowStockItems}</p>
                <p className="text-xs text-orange-500 mt-1">Cần nhập thêm</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">⚠️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Hết hàng</p>
                <p className="text-2xl font-bold text-red-600">{inventoryData.summary.outOfStockItems}</p>
                <p className="text-xs text-red-500 mt-1">Cần nhập ngay</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">🚫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouse Stats */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Thống kê theo kho</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inventoryData.warehouseStats.map((warehouse) => (
              <div key={warehouse.name} className="p-4 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-3">{warehouse.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Số sản phẩm:</span>
                    <span className="font-medium">{warehouse.products}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Giá trị:</span>
                    <span className="font-medium text-emerald-600">{formatCurrency(warehouse.value)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sắp hết:</span>
                    <span className={`font-medium ${warehouse.lowStock > 0 ? 'text-orange-600' : 'text-slate-600'}`}>
                      {warehouse.lowStock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">Chi tiết tồn kho</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Sản phẩm</th>
                  <th className="text-left p-4 font-semibold text-slate-700">SKU</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Kho</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Số lượng</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Min/Max</th>
                  <th className="text-right p-4 font-semibold text-slate-700">Giá vốn TB</th>
                  <th className="text-right p-4 font-semibold text-slate-700">Tổng giá trị</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Trạng thái</th>
                  <th className="text-center p-4 font-semibold text-slate-700">Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-medium text-slate-800">{product.name}</div>
                    </td>
                    <td className="p-4">
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm">{product.sku}</code>
                    </td>
                    <td className="p-4 text-slate-600">{product.warehouse}</td>
                    <td className="p-4 text-center">
                      <span className={`font-semibold ${
                        product.quantity === 0 ? 'text-red-600' :
                        product.quantity <= product.minStock ? 'text-orange-600' :
                        'text-slate-800'
                      }`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-slate-500">
                      {product.minStock}/{product.maxStock}
                    </td>
                    <td className="p-4 text-right text-slate-700">
                      {formatCurrency(product.avgCost)}
                    </td>
                    <td className="p-4 text-right font-semibold text-emerald-600">
                      {formatCurrency(product.totalValue)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusText(product.status)}
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-slate-500">
                      {formatDateTime(product.lastUpdated)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Thao tác nhanh</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>🚨</span>
              Cảnh báo hết hàng
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📋</span>
              Tạo đơn nhập hàng
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📊</span>
              Xuất Excel
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>🔄</span>
              Cập nhật tồn kho
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
