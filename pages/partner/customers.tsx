import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Customers() {
  const { t } = useTranslation()
  const [customers, setCustomers] = useState([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0901234567',
      address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
      dateOfBirth: '1990-01-15',
      gender: 'male',
      totalOrders: 8,
      totalSpent: 45000000,
      lastOrderDate: new Date().toISOString(),
      customerType: 'VIP',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      notes: 'Khách hàng thân thiết, thường mua iPhone cao cấp'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@yahoo.com',
      phone: '0912345678',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
      dateOfBirth: '1985-05-20',
      gender: 'female',
      totalOrders: 3,
      totalSpent: 18000000,
      lastOrderDate: new Date().toISOString(),
      customerType: 'REGULAR',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      notes: ''
    },
    {
      id: '3',
      name: 'Lê Văn C',
      email: 'levanc@hotmail.com',
      phone: '0923456789',
      address: '789 Hai Bà Trưng, Quận 1, TP.HCM',
      dateOfBirth: '1992-12-10',
      gender: 'male',
      totalOrders: 1,
      totalSpent: 8500000,
      lastOrderDate: new Date().toISOString(),
      customerType: 'NEW',
      status: 'INACTIVE',
      createdAt: new Date().toISOString(),
      notes: 'Khách hàng mới, cần theo dõi'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIP': return 'bg-purple-100 text-purple-800'
      case 'REGULAR': return 'bg-blue-100 text-blue-800'
      case 'NEW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm)
    const matchesType = typeFilter === 'ALL' || customer.customerType === typeFilter
    const matchesStatus = statusFilter === 'ALL' || customer.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('navigation.customers')}</h1>
                <p className="text-gray-600">{t('customers.subtitle')}</p>
              </div>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <span>+</span>
                {t('customers.addCustomer')}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t('customers.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">{t('common.all')}</option>
                <option value="VIP">{t('customers.vip')}</option>
                <option value="REGULAR">{t('customers.regular')}</option>
                <option value="NEW">{t('customers.new')}</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">{t('common.all')}</option>
                <option value="ACTIVE">{t('customers.active')}</option>
                <option value="INACTIVE">{t('customers.inactive')}</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  👥
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('customers.totalCustomers')}</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  👑
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('customers.vipCustomers')}</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.filter(c => c.customerType === 'VIP').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  📦
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('customers.totalOrders')}</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.reduce((sum, c) => sum + c.totalOrders, 0)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                  💰
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('customers.totalRevenue')}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('customers.customerInfo')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('customers.contact')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('customers.performance')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('customers.type')}
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
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.dateOfBirth}</div>
                          <div className="text-sm text-gray-500">{customer.gender === 'male' ? t('customers.male') : t('customers.female')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{customer.email}</div>
                          <div className="text-sm text-gray-500">{customer.phone}</div>
                          <div className="text-sm text-gray-500">{customer.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{customer.totalOrders} {t('customers.orders')}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(customer.totalSpent)}</div>
                          <div className="text-sm text-gray-500">{new Date(customer.lastOrderDate).toLocaleDateString('vi-VN')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(customer.customerType)}`}>
                          {customer.customerType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                          {customer.status === 'ACTIVE' ? t('customers.active') : t('customers.inactive')}
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
