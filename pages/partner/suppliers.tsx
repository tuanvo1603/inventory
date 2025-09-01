import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Suppliers() {
  const { t } = useTranslation()
  const [suppliers, setSuppliers] = useState([
    {
      id: '1',
      name: 'Công ty TNHH Thiết bị Di động ABC',
      contactPerson: 'Nguyễn Văn A',
      email: 'contact@abc-mobile.com',
      phone: '0901234567',
      address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
      taxCode: '0123456789',
      rating: 4.5,
      totalOrders: 25,
      totalValue: 500000000,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      lastOrderDate: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Cửa hàng điện thoại XYZ',
      contactPerson: 'Trần Thị B',
      email: 'info@xyz-phone.com',
      phone: '0912345678',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
      taxCode: '0987654321',
      rating: 4.2,
      totalOrders: 18,
      totalValue: 320000000,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      lastOrderDate: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Nhà phân phối DEF',
      contactPerson: 'Lê Văn C',
      email: 'sales@def-distributor.com',
      phone: '0923456789',
      address: '789 Hai Bà Trưng, Quận 1, TP.HCM',
      taxCode: '0111222333',
      rating: 3.8,
      totalOrders: 12,
      totalValue: 180000000,
      status: 'INACTIVE',
      createdAt: new Date().toISOString(),
      lastOrderDate: new Date().toISOString(),
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || supplier.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('navigation.suppliers')}</h1>
                <p className="text-gray-600">{t('suppliers.subtitle')}</p>
              </div>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <span>+</span>
                {t('suppliers.addSupplier')}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t('suppliers.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">{t('common.all')}</option>
                <option value="ACTIVE">{t('suppliers.active')}</option>
                <option value="INACTIVE">{t('suppliers.inactive')}</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  🏢
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('suppliers.totalSuppliers')}</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  ✅
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('suppliers.activeSuppliers')}</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.filter(s => s.status === 'ACTIVE').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                  📦
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('suppliers.totalOrders')}</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  💰
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('suppliers.totalValue')}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(suppliers.reduce((sum, s) => sum + s.totalValue, 0))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('suppliers.supplierInfo')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('suppliers.contact')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('suppliers.performance')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500">{supplier.contactPerson}</div>
                          <div className="text-sm text-gray-500">{supplier.taxCode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{supplier.email}</div>
                          <div className="text-sm text-gray-500">{supplier.phone}</div>
                          <div className="text-sm text-gray-500">{supplier.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{getRatingStars(supplier.rating)} ({supplier.rating})</div>
                          <div className="text-sm text-gray-500">{supplier.totalOrders} {t('suppliers.orders')}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(supplier.totalValue)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                          {supplier.status === 'ACTIVE' ? t('suppliers.active') : t('suppliers.inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">{t('common.edit')}</button>
                          <button className="text-green-600 hover:text-green-900">{t('common.view')}</button>
                          <button className="text-red-600 hover:text-red-900">{t('common.delete')}</button>
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
