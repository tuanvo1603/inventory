import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PurchaseOrders() {
  const { t } = useTranslation()
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: 'PO-20250901-001',
      supplierName: 'Công ty TNHH Thiết bị Di động ABC',
      supplierContact: 'Nguyễn Văn A',
      supplierPhone: '0901234567',
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 10, unitCost: 25000000, totalCost: 250000000, condition: 'NEW' },
        { name: 'iPhone 14 128GB', quantity: 20, unitCost: 18000000, totalCost: 360000000, condition: 'NEW' }
      ],
      totalAmount: 610000000,
      paidAmount: 610000000,
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      deliveryStatus: 'DELIVERED',
      createdAt: new Date().toISOString(),
      expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      actualDelivery: new Date().toISOString(),
      notes: 'Hàng chất lượng tốt, đóng gói cẩn thận'
    },
    {
      id: '2',
      orderNumber: 'PO-20250901-002',
      supplierName: 'Cửa hàng điện thoại XYZ',
      supplierContact: 'Trần Thị B',
      supplierPhone: '0912345678',
      items: [
        { name: 'iPhone 13 256GB', quantity: 15, unitCost: 14000000, totalCost: 210000000, condition: 'GOOD' }
      ],
      totalAmount: 210000000,
      paidAmount: 100000000,
      status: 'PENDING',
      paymentStatus: 'PARTIAL',
      deliveryStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      actualDelivery: null,
      notes: 'Cần kiểm tra kỹ tình trạng hàng khi nhận'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)

    const statusLabels = {
    'PENDING': t('purchase.status.pending'),
    'APPROVED': t('purchase.status.approved'),
    'PROCESSING': t('purchase.status.processing'),
    'COMPLETED': t('purchase.status.completed'),
    'CANCELLED': t('purchase.status.cancelled')
  }

  const statusColors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'APPROVED': 'bg-blue-100 text-blue-800',
    'ORDERED': 'bg-indigo-100 text-indigo-800',
    'SHIPPING': 'bg-purple-100 text-purple-800',
    'DELIVERED': 'bg-emerald-100 text-emerald-800',
    'COMPLETED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }

  const paymentStatusLabels = {
    'UNPAID': t('purchase.paymentStatus.unpaid'),
    'PARTIAL': t('purchase.paymentStatus.partial'),
    'PAID': t('purchase.paymentStatus.paid'),
    'OVERPAID': t('purchase.paymentStatus.overpaid')
  }

  const paymentStatusColors = {
    'UNPAID': 'bg-red-100 text-red-800',
    'PARTIAL': 'bg-orange-100 text-orange-800',
    'PAID': 'bg-emerald-100 text-emerald-800',
    'OVERPAID': 'bg-purple-100 text-purple-800'
  }

  const deliveryStatusLabels = {
    'PENDING': t('purchase.deliveryStatus.pending'),
    'SHIPPING': t('purchase.deliveryStatus.shipping'),
    'DELIVERED': t('purchase.deliveryStatus.delivered'),
    'RETURNED': t('purchase.deliveryStatus.returned')
  }

  const deliveryStatusColors = {
    'PENDING': 'bg-slate-100 text-slate-800',
    'SHIPPING': 'bg-blue-100 text-blue-800',
    'DELIVERED': 'bg-emerald-100 text-emerald-800',
    'RETURNED': 'bg-red-100 text-red-800'
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
            <h1 className="text-2xl font-bold text-slate-800">{t('purchase.title')}</h1>
            <p className="text-slate-600">{t('purchase.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>📦</span>
            {t('purchase.newPurchase')}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t('purchase.stats.totalOrders')}</p>
                <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📦</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t('purchase.stats.completed')}</p>
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
                <p className="text-sm text-slate-600">{t('purchase.stats.totalCost')}</p>
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
                <p className="text-sm text-slate-600">{t('purchase.stats.paid')}</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.paidAmount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">💸</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t('purchase.stats.outstanding')}</p>
                <p className="text-lg font-bold text-red-600">
                  {formatCurrency(orders.reduce((sum, o) => sum + (o.totalAmount - o.paidAmount), 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">{t('purchase.filters.status')}:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">{t('common.all')}</option>
                <option value="PENDING">{t('purchase.status.pending')}</option>
                <option value="APPROVED">{t('purchase.status.approved')}</option>
                <option value="ORDERED">Đã đặt hàng</option>
                <option value="COMPLETED">Hoàn thành</option>
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
              <label className="text-sm font-medium text-slate-700">Nhà cung cấp:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="1">Công ty ABC</option>
                <option value="2">Cửa hàng XYZ</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Số đơn, nhà cung cấp..."
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
            <h2 className="text-lg font-semibold text-slate-800">Danh sách đơn nhập hàng</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.order')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.supplier')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.products')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.status')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.total')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.payment')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.delivery')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('purchase.table.actions')}
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
                        <div className="text-sm font-medium text-slate-900">{order.supplierName}</div>
                        <div className="text-sm text-slate-500">{order.supplierContact} - {order.supplierPhone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium text-slate-900">{item.name}</div>
                            <div className="text-slate-500">SL: {item.quantity} - {formatCurrency(item.unitCost)}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-purple-600">
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div className="text-sm text-slate-500">
                        Đã trả: {formatCurrency(order.paidAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors]}`}>
                        {paymentStatusLabels[order.paymentStatus as keyof typeof paymentStatusLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${deliveryStatusColors[order.deliveryStatus as keyof typeof deliveryStatusColors]}`}>
                        {deliveryStatusLabels[order.deliveryStatus as keyof typeof deliveryStatusLabels]}
                      </span>
                      {order.expectedDelivery && (
                        <div className="text-xs text-slate-500 mt-1">
                          DK: {new Date(order.expectedDelivery).toLocaleDateString('vi-VN')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">👁️</button>
                        <button className="text-yellow-600 hover:text-yellow-900">✏️</button>
                        <button className="text-emerald-600 hover:text-emerald-900">✅</button>
                        <button className="text-purple-600 hover:text-purple-900">💰</button>
                        <button className="text-orange-600 hover:text-orange-900">📦</button>
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
                <span className="text-slate-400 text-2xl">📦</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Chưa có đơn nhập hàng</h3>
              <p className="text-slate-500">Tạo đơn nhập hàng đầu tiên để bắt đầu nhập kho</p>
            </div>
          )}
        </div>

        {/* Add Purchase Order Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tạo đơn nhập hàng mới</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Nhà cung cấp
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn nhà cung cấp</option>
                      <option value="1">Công ty TNHH Thiết bị Di động ABC</option>
                      <option value="2">Cửa hàng điện thoại XYZ</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày đặt hàng
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày giao hàng dự kiến
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ưu tiên
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="LOW">Thấp</option>
                      <option value="MEDIUM">Trung bình</option>
                      <option value="HIGH">Cao</option>
                      <option value="URGENT">Khẩn cấp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Sản phẩm nhập kho
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
                      <p className="text-sm">Thêm sản phẩm để tạo đơn nhập hàng</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phương thức thanh toán
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="CASH">Tiền mặt</option>
                      <option value="BANK_TRANSFER">Chuyển khoản</option>
                      <option value="CREDIT">Công nợ</option>
                      <option value="PARTIAL">Thanh toán trước</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Điều khoản thanh toán
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="IMMEDIATE">Thanh toán ngay</option>
                      <option value="NET_7">Net 7 ngày</option>
                      <option value="NET_15">Net 15 ngày</option>
                      <option value="NET_30">Net 30 ngày</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ghi chú về đơn nhập hàng, yêu cầu đặc biệt..."
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
                    type="button"
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                  >
                    Lưu nháp
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
