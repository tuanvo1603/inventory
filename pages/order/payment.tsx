import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PaymentManagement() {
  const { t } = useTranslation()
  const [payments, setPayments] = useState([
    {
      id: '1',
      paymentNumber: 'PAY-20250901-001',
      type: 'PURCHASE',
      relatedOrderNumber: 'PO-20250901-001',
      supplierName: 'Công ty TNHH Thiết bị Di động ABC',
      customerName: null,
      amount: 610000000,
      method: 'BANK_TRANSFER',
      status: 'COMPLETED',
      paymentDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      reference: 'TXN-2025090112345',
      notes: 'Thanh toán đầy đủ đơn nhập hàng iPhone',
      approvedBy: 'Admin User',
      approvedAt: new Date().toISOString()
    },
    {
      id: '2',
      paymentNumber: 'PAY-20250901-002',
      type: 'SALE',
      relatedOrderNumber: 'SO-20250901-001',
      supplierName: null,
      customerName: 'Nguyễn Văn A',
      amount: 28000000,
      method: 'CASH',
      status: 'COMPLETED',
      paymentDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      reference: 'CASH-001',
      notes: 'Thanh toán tiền mặt iPhone 15 Pro Max',
      approvedBy: 'Admin User',
      approvedAt: new Date().toISOString()
    },
    {
      id: '3',
      paymentNumber: 'PAY-20250901-003',
      type: 'PURCHASE',
      relatedOrderNumber: 'PO-20250901-002',
      supplierName: 'Cửa hàng điện thoại XYZ',
      customerName: null,
      amount: 100000000,
      method: 'BANK_TRANSFER',
      status: 'PENDING',
      paymentDate: null,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      reference: null,
      notes: 'Thanh toán trước 50% đơn nhập hàng',
      approvedBy: null,
      approvedAt: null
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const typeLabels = {
    'SALE': 'Thu tiền bán hàng',
    'PURCHASE': 'Chi tiền nhập hàng',
    'REFUND': 'Hoàn tiền',
    'EXPENSE': 'Chi phí khác',
    'ADJUSTMENT': 'Điều chỉnh'
  }

  const typeColors = {
    'SALE': 'bg-emerald-100 text-emerald-800',
    'PURCHASE': 'bg-red-100 text-red-800',
    'REFUND': 'bg-orange-100 text-orange-800',
    'EXPENSE': 'bg-purple-100 text-purple-800',
    'ADJUSTMENT': 'bg-blue-100 text-blue-800'
  }

  const statusLabels = {
    'PENDING': 'Chờ duyệt',
    'APPROVED': 'Đã duyệt',
    'PROCESSING': 'Đang xử lý',
    'COMPLETED': 'Hoàn thành',
    'REJECTED': 'Từ chối',
    'CANCELLED': 'Đã hủy'
  }

  const statusColors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'APPROVED': 'bg-blue-100 text-blue-800',
    'PROCESSING': 'bg-purple-100 text-purple-800',
    'COMPLETED': 'bg-emerald-100 text-emerald-800',
    'REJECTED': 'bg-red-100 text-red-800',
    'CANCELLED': 'bg-slate-100 text-slate-800'
  }

  const methodLabels = {
    'CASH': 'Tiền mặt',
    'BANK_TRANSFER': 'Chuyển khoản',
    'CARD': 'Thẻ tín dụng',
    'E_WALLET': 'Ví điện tử',
    'CHECK': 'Séc',
    'CREDIT': 'Công nợ'
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const handleApprovePayment = (payment: any) => {
    setSelectedPayment(payment)
    setShowApprovalModal(true)
  }

  const handleRejectPayment = (paymentId: string) => {
    if (confirm('Bạn có chắc chắn muốn từ chối thanh toán này?')) {
      setPayments(payments.map(p => 
        p.id === paymentId ? { ...p, status: 'REJECTED' } : p
      ))
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('payment.title')}</h1>
            <p className="text-slate-600">{t('payment.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>💰</span>
            {t('payment.addPayment')}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng giao dịch</p>
                <p className="text-2xl font-bold text-slate-800">{payments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Thu tiền</p>
                <p className="text-lg font-bold text-emerald-600">
                  {formatCurrency(payments.filter(p => p.type === 'SALE' && p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Chi tiền</p>
                <p className="text-lg font-bold text-red-600">
                  {formatCurrency(payments.filter(p => p.type === 'PURCHASE' && p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">💸</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Chờ duyệt</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'PENDING').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Lưu chuyển</p>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(
                    payments.filter(p => p.status === 'COMPLETED').reduce((sum, p) => 
                      p.type === 'SALE' ? sum + p.amount : sum - p.amount, 0
                    )
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Loại:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="SALE">Thu tiền bán hàng</option>
                <option value="PURCHASE">Chi tiền nhập hàng</option>
                <option value="REFUND">Hoàn tiền</option>
                <option value="EXPENSE">Chi phí khác</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Trạng thái:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="PENDING">Chờ duyệt</option>
                <option value="APPROVED">Đã duyệt</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="REJECTED">Từ chối</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Phương thức:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="CASH">Tiền mặt</option>
                <option value="BANK_TRANSFER">Chuyển khoản</option>
                <option value="CARD">Thẻ tín dụng</option>
                <option value="E_WALLET">Ví điện tử</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Từ ngày:</label>
              <input
                type="date"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Đến ngày:</label>
              <input
                type="date"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              🔍 Lọc
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Danh sách thanh toán</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Đối tác
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Phương thức
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Hạn thanh toán
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{payment.paymentNumber}</div>
                        <div className="text-sm text-slate-500">
                          Đơn: {payment.relatedOrderNumber}
                        </div>
                        {payment.reference && (
                          <div className="text-xs text-slate-400">
                            Ref: {payment.reference}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[payment.type as keyof typeof typeColors]}`}>
                        {typeLabels[payment.type as keyof typeof typeLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {payment.supplierName || payment.customerName || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm font-medium ${
                        payment.type === 'SALE' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {payment.type === 'SALE' ? '+' : '-'}{formatCurrency(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {methodLabels[payment.method as keyof typeof methodLabels]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[payment.status as keyof typeof statusColors]}`}>
                        {statusLabels[payment.status as keyof typeof statusLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString('vi-VN') : 'N/A'}
                      {payment.dueDate && new Date(payment.dueDate) < new Date() && payment.status === 'PENDING' && (
                        <div className="text-xs text-red-600 font-medium">Quá hạn</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">👁️</button>
                        {payment.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => handleApprovePayment(payment)}
                              className="text-emerald-600 hover:text-emerald-900"
                            >
                              ✅
                            </button>
                            <button 
                              onClick={() => handleRejectPayment(payment.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              ❌
                            </button>
                          </>
                        )}
                        <button className="text-purple-600 hover:text-purple-900">🖨️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {payments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-400 text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Chưa có giao dịch thanh toán</h3>
              <p className="text-slate-500">Thêm giao dịch thanh toán đầu tiên</p>
            </div>
          )}
        </div>

        {/* Add Payment Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Thêm thanh toán mới</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Loại thanh toán
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn loại</option>
                      <option value="SALE">Thu tiền bán hàng</option>
                      <option value="PURCHASE">Chi tiền nhập hàng</option>
                      <option value="REFUND">Hoàn tiền</option>
                      <option value="EXPENSE">Chi phí khác</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Liên kết đơn hàng
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn đơn hàng (tùy chọn)</option>
                      <option value="SO-001">SO-001 - Nguyễn Văn A</option>
                      <option value="PO-001">PO-001 - Công ty ABC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Số tiền (₫)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phương thức thanh toán
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="CASH">Tiền mặt</option>
                      <option value="BANK_TRANSFER">Chuyển khoản</option>
                      <option value="CARD">Thẻ tín dụng</option>
                      <option value="E_WALLET">Ví điện tử</option>
                      <option value="CHECK">Séc</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ngày thanh toán
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Hạn thanh toán
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Số tham chiếu
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mã giao dịch, số séc, v.v..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ghi chú về thanh toán..."
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
                    Thêm thanh toán
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Approval Modal */}
        {showApprovalModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Duyệt thanh toán</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-slate-600">Mã thanh toán:</div>
                    <div className="font-medium">{selectedPayment.paymentNumber}</div>
                    <div className="text-slate-600">Số tiền:</div>
                    <div className="font-medium text-purple-600">{formatCurrency(selectedPayment.amount)}</div>
                    <div className="text-slate-600">Phương thức:</div>
                    <div className="font-medium">{methodLabels[selectedPayment.method as keyof typeof methodLabels]}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú duyệt
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ghi chú về việc duyệt thanh toán..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowApprovalModal(false)
                      setSelectedPayment(null)
                    }}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      setPayments(payments.map(p => 
                        p.id === selectedPayment.id 
                          ? { ...p, status: 'APPROVED', approvedBy: 'Admin User', approvedAt: new Date().toISOString() } as any
                          : p
                      ))
                      setShowApprovalModal(false)
                      setSelectedPayment(null)
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Duyệt thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
