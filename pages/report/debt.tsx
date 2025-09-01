import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DebtReport() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('receivables') // receivables, payables
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [sortBy, setSortBy] = useState('amount')

  const [debtData] = useState({
    summary: {
      totalReceivables: 45000000, // Phải thu
      totalPayables: 28000000,    // Phải trả
      overdueReceivables: 12000000, // Quá hạn thu
      overduePayables: 8000000,   // Quá hạn trả
      netDebt: 17000000           // Công nợ ròng
    },
    receivables: [ // Công nợ phải thu (khách hàng nợ)
      {
        id: 1,
        customerName: 'Công ty TNHH ABC',
        phone: '0901234567',
        totalDebt: 15000000,
        overdueAmount: 5000000,
        lastPayment: '2025-08-15',
        dueDate: '2025-08-30',
        status: 'OVERDUE',
        invoices: [
          { invoiceId: 'HD001', amount: 8000000, dueDate: '2025-08-30', status: 'OVERDUE' },
          { invoiceId: 'HD003', amount: 7000000, dueDate: '2025-09-15', status: 'PENDING' }
        ]
      },
      {
        id: 2,
        customerName: 'Nguyễn Văn A',
        phone: '0987654321',
        totalDebt: 12000000,
        overdueAmount: 0,
        lastPayment: '2025-08-25',
        dueDate: '2025-09-10',
        status: 'PENDING',
        invoices: [
          { invoiceId: 'HD005', amount: 12000000, dueDate: '2025-09-10', status: 'PENDING' }
        ]
      },
      {
        id: 3,
        customerName: 'Cửa hàng XYZ',
        phone: '0912345678',
        totalDebt: 18000000,
        overdueAmount: 7000000,
        lastPayment: '2025-08-10',
        dueDate: '2025-08-25',
        status: 'OVERDUE',
        invoices: [
          { invoiceId: 'HD002', amount: 10000000, dueDate: '2025-08-25', status: 'OVERDUE' },
          { invoiceId: 'HD004', amount: 8000000, dueDate: '2025-09-05', status: 'PENDING' }
        ]
      }
    ],
    payables: [ // Công nợ phải trả (nợ nhà cung cấp)
      {
        id: 1,
        supplierName: 'Apple Store Vietnam',
        phone: '0901111111',
        totalDebt: 20000000,
        overdueAmount: 8000000,
        lastPayment: '2025-08-20',
        dueDate: '2025-08-28',
        status: 'OVERDUE',
        invoices: [
          { invoiceId: 'PO001', amount: 12000000, dueDate: '2025-08-28', status: 'OVERDUE' },
          { invoiceId: 'PO003', amount: 8000000, dueDate: '2025-09-12', status: 'PENDING' }
        ]
      },
      {
        id: 2,
        supplierName: 'Nhà phân phối Di Động Việt',
        phone: '0902222222',
        totalDebt: 8000000,
        overdueAmount: 0,
        lastPayment: '2025-08-28',
        dueDate: '2025-09-15',
        status: 'PENDING',
        invoices: [
          { invoiceId: 'PO002', amount: 8000000, dueDate: '2025-09-15', status: 'PENDING' }
        ]
      }
    ]
  })

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-blue-100 text-blue-800'
      case 'OVERDUE': return 'bg-red-100 text-red-800'
      case 'PAID': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Chờ thanh toán'
      case 'OVERDUE': return 'Quá hạn'
      case 'PAID': return 'Đã thanh toán'
      default: return status
    }
  }

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const currentData = activeTab === 'receivables' ? debtData.receivables : debtData.payables

  const filteredData = currentData.filter(item => {
    if (filterStatus === 'ALL') return true
    return item.status === filterStatus
  })

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'amount': return b.totalDebt - a.totalDebt
      case 'overdue': return b.overdueAmount - a.overdueAmount
      case 'name': 
        const nameA = activeTab === 'receivables' ? (a as any).customerName : (a as any).supplierName
        const nameB = activeTab === 'receivables' ? (b as any).customerName : (b as any).supplierName
        return nameA.localeCompare(nameB)
      case 'dueDate': return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      default: return 0
    }
  })

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('reports.debt.title')}</h1>
            <p className="text-slate-600">Theo dõi công nợ phải thu và phải trả</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="PENDING">Chờ thanh toán</option>
              <option value="OVERDUE">Quá hạn</option>
              <option value="PAID">Đã thanh toán</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="amount">Sắp xếp theo: Số tiền</option>
              <option value="overdue">Sắp xếp theo: Quá hạn</option>
              <option value="name">Sắp xếp theo: Tên</option>
              <option value="dueDate">Sắp xếp theo: Hạn thanh toán</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📊</span>
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng phải thu</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(debtData.summary.totalReceivables)}
                </p>
                <p className="text-xs text-emerald-500 mt-1">Từ khách hàng</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng phải trả</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(debtData.summary.totalPayables)}
                </p>
                <p className="text-xs text-red-500 mt-1">Cho nhà cung cấp</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">💸</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Quá hạn thu</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(debtData.summary.overdueReceivables)}
                </p>
                <p className="text-xs text-orange-500 mt-1">Cần thu gấp</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">⚠️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Quá hạn trả</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(debtData.summary.overduePayables)}
                </p>
                <p className="text-xs text-purple-500 mt-1">Cần trả gấp</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">🔔</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Công nợ ròng</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(debtData.summary.netDebt)}
                </p>
                <p className="text-xs text-blue-500 mt-1">Thu - Trả</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">⚖️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('receivables')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'receivables'
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>💰</span>
                  Công nợ phải thu
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {debtData.receivables.length}
                  </span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('payables')}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'payables'
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>💸</span>
                  Công nợ phải trả
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {debtData.payables.length}
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Debt Table */}
          <div className="p-6">
            <div className="space-y-4">
              {sortedData.map((debt) => (
                <div key={debt.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  {/* Main Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <span>{activeTab === 'receivables' ? '👤' : '🏢'}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {activeTab === 'receivables' ? (debt as any).customerName : (debt as any).supplierName}
                        </h4>
                        <p className="text-sm text-slate-500">{debt.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800">
                        {formatCurrency(debt.totalDebt)}
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(debt.status)}`}>
                        {getStatusText(debt.status)}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Quá hạn</p>
                      <p className={`font-semibold ${debt.overdueAmount > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                        {formatCurrency(debt.overdueAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Thanh toán gần nhất</p>
                      <p className="font-medium text-slate-700">{formatDate(debt.lastPayment)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Hạn thanh toán</p>
                      <p className={`font-medium ${
                        getDaysOverdue(debt.dueDate) > 0 ? 'text-red-600' : 'text-slate-700'
                      }`}>
                        {formatDate(debt.dueDate)}
                        {getDaysOverdue(debt.dueDate) > 0 && (
                          <span className="text-xs ml-1">({getDaysOverdue(debt.dueDate)} ngày)</span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        Chi tiết
                      </button>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm">
                        Thu tiền
                      </button>
                    </div>
                  </div>

                  {/* Invoices */}
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-sm font-medium text-slate-700 mb-2">Hóa đơn liên quan:</p>
                    <div className="flex flex-wrap gap-2">
                      {debt.invoices.map((invoice) => (
                        <div 
                          key={invoice.invoiceId}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                            invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <span>{invoice.invoiceId}</span>
                          <span>•</span>
                          <span>{formatCurrency(invoice.amount)}</span>
                          <span>•</span>
                          <span>{formatDate(invoice.dueDate)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Thao tác nhanh</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>🚨</span>
              Nhắc nợ quá hạn
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>💰</span>
              Ghi nhận thanh toán
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📧</span>
              Gửi thông báo
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📊</span>
              Xuất Excel
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📄</span>
              In báo cáo
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
