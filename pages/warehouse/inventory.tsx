import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function WarehouseInventory() {
  const { t } = useTranslation()
  const [inventoryData, setInventoryData] = useState([
    {
      id: '1',
      productName: 'iPhone 15 Pro Max',
      model: '15 Pro Max 256GB',
      sku: 'IP15PM256-001',
      category: 'iPhone 15 Series',
      warehouse: 'Kho chính',
      currentStock: 25,
      reservedStock: 3,
      availableStock: 22,
      minStock: 5,
      maxStock: 50,
      costPrice: 28000000,
      averagePrice: 29500000,
      totalValue: 737500000,
      lastInbound: '2024-08-28',
      lastOutbound: '2024-08-30',
      status: 'IN_STOCK'
    },
    {
      id: '2',
      productName: 'iPhone 14 Pro',
      model: '14 Pro 128GB',
      sku: 'IP14P128-001',
      category: 'iPhone 14 Series',
      warehouse: 'Kho chính',
      currentStock: 2,
      reservedStock: 1,
      availableStock: 1,
      minStock: 5,
      maxStock: 30,
      costPrice: 22000000,
      averagePrice: 23500000,
      totalValue: 47000000,
      lastInbound: '2024-08-25',
      lastOutbound: '2024-08-29',
      status: 'LOW_STOCK'
    },
    {
      id: '3',
      productName: 'iPhone 13',
      model: '13 64GB',
      sku: 'IP13-64-001',
      category: 'iPhone 13 Series',
      warehouse: 'Kho phụ',
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      minStock: 3,
      maxStock: 20,
      costPrice: 15000000,
      averagePrice: 16500000,
      totalValue: 0,
      lastInbound: '2024-08-20',
      lastOutbound: '2024-08-28',
      status: 'OUT_OF_STOCK'
    },
    {
      id: '4',
      productName: 'iPhone 15',
      model: '15 128GB',
      sku: 'IP15-128-001',
      category: 'iPhone 15 Series',
      warehouse: 'Kho chính',
      currentStock: 18,
      reservedStock: 2,
      availableStock: 16,
      minStock: 8,
      maxStock: 40,
      costPrice: 20000000,
      averagePrice: 21500000,
      totalValue: 387000000,
      lastInbound: '2024-08-29',
      lastOutbound: '2024-08-30',
      status: 'IN_STOCK'
    }
  ])

  const [selectedWarehouse, setSelectedWarehouse] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const warehouses = [
    { id: 'all', name: t('common.all') },
    { id: 'main', name: 'Kho chính' },
    { id: 'secondary', name: 'Kho phụ' }
  ]

  const categories = [
    { id: 'all', name: t('common.all') },
    { id: 'iphone-15', name: 'iPhone 15 Series' },
    { id: 'iphone-14', name: 'iPhone 14 Series' },
    { id: 'iphone-13', name: 'iPhone 13 Series' }
  ]

  const statusOptions = [
    { id: 'all', name: t('common.all') },
    { id: 'IN_STOCK', name: t('inventory.inStock') },
    { id: 'LOW_STOCK', name: t('inventory.lowStock') },
    { id: 'OUT_OF_STOCK', name: t('inventory.outOfStock') }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_STOCK': return 'bg-green-100 text-green-800'
      case 'LOW_STOCK': return 'bg-yellow-100 text-yellow-800'
      case 'OUT_OF_STOCK': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'IN_STOCK': return t('inventory.inStock')
      case 'LOW_STOCK': return t('inventory.lowStock')
      case 'OUT_OF_STOCK': return t('inventory.outOfStock')
      default: return status
    }
  }

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouse.includes(selectedWarehouse)
    const matchesCategory = selectedCategory === 'all' || item.category.includes(selectedCategory.replace('iphone-', 'iPhone ').replace('-', ' '))
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    return matchesSearch && matchesWarehouse && matchesCategory && matchesStatus
  })

  const totalValue = filteredInventory.reduce((sum, item) => sum + item.totalValue, 0)
  const totalItems = filteredInventory.reduce((sum, item) => sum + item.currentStock, 0)
  const lowStockItems = filteredInventory.filter(item => item.status === 'LOW_STOCK').length
  const outOfStockItems = filteredInventory.filter(item => item.status === 'OUT_OF_STOCK').length

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('navigation.inventory')}</h1>
                <p className="text-gray-600">{t('inventory.subtitle')}</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <span>📊</span>
                  {t('inventory.exportReport')}
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <span>🔄</span>
                  {t('inventory.stockAdjustment')}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  📦
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('inventory.totalItems')}</p>
                  <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  💰
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('inventory.totalValue')}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                  ⚠️
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('inventory.lowStockItems')}</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                  🚫
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('inventory.outOfStockItems')}</p>
                  <p className="text-2xl font-bold text-gray-900">{outOfStockItems}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <input
                  type="text"
                  placeholder={t('inventory.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {warehouses.map(warehouse => (
                    <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                  {t('common.refresh')}
                </button>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('inventory.product')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('inventory.warehouse')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('inventory.stock')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('inventory.value')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('inventory.lastActivity')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                          <div className="text-sm text-gray-500">{item.model}</div>
                          <div className="text-sm text-gray-500">{item.sku}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.warehouse}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {t('inventory.current')}: {item.currentStock}
                          </div>
                          <div className="text-sm text-gray-500">
                            {t('inventory.available')}: {item.availableStock}
                          </div>
                          <div className="text-sm text-gray-500">
                            {t('inventory.reserved')}: {item.reservedStock}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(item.totalValue)}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(item.averagePrice)}/sp</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{t('inventory.lastIn')}: {item.lastInbound}</div>
                          <div className="text-sm text-gray-500">{t('inventory.lastOut')}: {item.lastOutbound}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">{t('inventory.adjust')}</button>
                          <button className="text-green-600 hover:text-green-900">{t('common.view')}</button>
                          <button className="text-purple-600 hover:text-purple-900">{t('inventory.transfer')}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
