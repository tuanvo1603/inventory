import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SalesOrders() {
  const { t } = useTranslation()
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'SO-20250901-001',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0901234567',
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 28000000, condition: 'EXCELLENT' }
      ],
      totalAmount: 28000000,
      paidAmount: 28000000,
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      createdAt: new Date().toISOString(),
      deliveryAddress: '123 Nguyễn Trãi, Quận 1, TP.HCM',
      notes: 'Khách yêu cầu giao hàng tận nơi'
    },
    {
      id: '2',
      orderNumber: 'SO-20250901-002',
      customerName: 'Trần Thị B',
      customerPhone: '0912345678',
      items: [
        { name: 'iPhone 14 128GB', quantity: 1, price: 20500000, condition: 'GOOD' }
      ],
      totalAmount: 20500000,
      paidAmount: 10000000,
      status: 'PROCESSING',
      paymentStatus: 'PARTIAL',
      createdAt: new Date().toISOString(),
      deliveryAddress: '456 Lê Lợi, Quận 3, TP.HCM',
      notes: ''
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)

  const statusLabels = {
    'PENDING': 'Chờ xử lý',
    'PROCESSING': 'Đang xử lý',
    'SHIPPING': 'Đang giao hàng',
    'COMPLETED': 'Hoàn thành',
    'CANCELLED': 'Đã hủy'
  }

  const statusColors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'PROCESSING': 'bg-blue-100 text-blue-800',
    'SHIPPING': 'bg-purple-100 text-purple-800',
    'COMPLETED': 'bg-emerald-100 text-emerald-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }

  const paymentStatusLabels = {
    'UNPAID': 'Chưa thanh toán',
    'PARTIAL': 'Thanh toán một phần',
    'PAID': 'Đã thanh toán',
    'REFUNDED': 'Đã hoàn tiền'
  }

  const paymentStatusColors = {
    'UNPAID': 'bg-red-100 text-red-800',
    'PARTIAL': 'bg-orange-100 text-orange-800',
    'PAID': 'bg-emerald-100 text-emerald-800',
    'REFUNDED': 'bg-slate-100 text-slate-800'
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('sales.title')}</h1>
            <p className="text-slate-600">{t('sales.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>📋</span>
            {t('sales.newSale')}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {orders.filter(o => o.status === 'COMPLETED').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Doanh thu</p>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.totalAmount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đã thu</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.paidAmount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">💸</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Trạng thái đơn:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="PENDING">Chờ xử lý</option>
                <option value="PROCESSING">Đang xử lý</option>
                <option value="SHIPPING">Đang giao hàng</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Thanh toán:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="PAID">Đã thanh toán</option>
                <option value="PARTIAL">Một phần</option>
                <option value="UNPAID">Chưa thanh toán</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Số đơn, tên khách hàng..."
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              🔍 Lọc
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Danh sách đơn bán hàng</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Đã thu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thanh toán
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{order.orderNumber}</div>
                        <div className="text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{order.customerName}</div>
                        <div className="text-sm text-slate-500">{order.customerPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium text-slate-900">{item.name}</div>
                            <div className="text-slate-500">SL: {item.quantity} - {formatCurrency(item.price)}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-purple-600">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-emerald-600">
                      {formatCurrency(order.paidAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors]}`}>
                        {paymentStatusLabels[order.paymentStatus as keyof typeof paymentStatusLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">👁️</button>
                        <button className="text-yellow-600 hover:text-yellow-900">✏️</button>
                        <button className="text-emerald-600 hover:text-emerald-900">💰</button>
                        <button className="text-purple-600 hover:text-purple-900">🖨️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-400 text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Chưa có đơn bán hàng</h3>
              <p className="text-slate-500">Tạo đơn hàng đầu tiên để bắt đầu bán hàng</p>
            </div>
          )}
        </div>

        {/* Add Order Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tạo đơn bán hàng mới</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Khách hàng
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn khách hàng</option>
                      <option value="1">Nguyễn Văn A - 0901234567</option>
                      <option value="2">Trần Thị B - 0912345678</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày bán
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Sản phẩm
                  </label>
                  
                  <div className="border border-slate-300 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-700">Danh sách sản phẩm</span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Thêm sản phẩm
                      </button>
                    </div>
                    
                    <div className="text-center py-8 text-slate-500">
                      <span className="text-2xl">📱</span>
                      <p className="mt-2">Chưa có sản phẩm nào được chọn</p>
                      <p className="text-sm">Thêm sản phẩm để tạo đơn hàng</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Địa chỉ giao hàng
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Địa chỉ giao hàng đầy đủ..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ghi chú thêm về đơn hàng..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tạo đơn hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
