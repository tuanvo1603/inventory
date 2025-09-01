import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SalesReport() {
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })

  const [reportData] = useState({
    summary: {
      totalSales: 48500000,
      totalOrders: 5,
      averageOrderValue: 9700000,
      totalProfit: 8500000
    },
    topProducts: [
      { name: 'iPhone 15 Pro Max 256GB', quantity: 2, revenue: 28000000, profit: 6000000 },
      { name: 'iPhone 14 128GB', quantity: 2, revenue: 20500000, profit: 2500000 },
      { name: 'iPhone 13 256GB', quantity: 1, revenue: 16000000, profit: 2000000 }
    ],
    dailySales: [
      { date: '2025-08-25', orders: 1, sales: 28000000, profit: 3000000 },
      { date: '2025-08-26', orders: 2, sales: 20500000, profit: 2500000 },
      { date: '2025-08-27', orders: 0, sales: 0, profit: 0 },
      { date: '2025-08-28', orders: 1, sales: 16000000, profit: 2000000 },
      { date: '2025-08-29', orders: 1, sales: 8500000, profit: 1000000 }
    ],
    customerAnalysis: [
      { type: 'VIP', count: 1, revenue: 28000000, percentage: 57.7 },
      { type: 'REGULAR', count: 2, revenue: 12500000, percentage: 25.8 },
      { type: 'NEW', count: 2, revenue: 8000000, percentage: 16.5 }
    ]
  })

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('reports.sales.title')}</h1>
            <p className="text-slate-600">Tổng hợp doanh số bán hàng và phân tích xu hướng</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Từ:</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Đến:</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                <p className="text-sm text-slate-600">Tổng doanh số</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(reportData.summary.totalSales)}
                </p>
                <p className="text-xs text-emerald-500 mt-1">↗ +12.5% vs tháng trước</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Số đơn hàng</p>
                <p className="text-2xl font-bold text-blue-600">{reportData.summary.totalOrders}</p>
                <p className="text-xs text-blue-500 mt-1">↗ +3 đơn</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Giá trị TB/đơn</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(reportData.summary.averageOrderValue)}
                </p>
                <p className="text-xs text-purple-500 mt-1">↗ +8.2%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Lợi nhuận</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(reportData.summary.totalProfit)}
                </p>
                <p className="text-xs text-orange-500 mt-1">↗ +15.3%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">💎</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Sales Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Doanh số theo ngày</h3>
            <div className="space-y-3">
              {reportData.dailySales.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800">{formatDate(day.date)}</div>
                    <div className="text-sm text-slate-500">{day.orders} đơn hàng</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">{formatCurrency(day.sales)}</div>
                    <div className="text-sm text-slate-500">LN: {formatCurrency(day.profit)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Top sản phẩm bán chạy</h3>
            <div className="space-y-3">
              {reportData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{product.name}</div>
                      <div className="text-sm text-slate-500">Bán: {product.quantity} chiếc</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">{formatCurrency(product.revenue)}</div>
                    <div className="text-sm text-orange-600">LN: {formatCurrency(product.profit)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Phân tích khách hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportData.customerAnalysis.map((segment) => (
              <div key={segment.type} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    segment.type === 'VIP' ? 'bg-purple-100 text-purple-800' :
                    segment.type === 'REGULAR' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {segment.type}
                  </span>
                  <span className="text-sm font-medium text-slate-600">{segment.percentage}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Số khách hàng:</span>
                    <span className="font-medium">{segment.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Doanh thu:</span>
                    <span className="font-medium text-emerald-600">{formatCurrency(segment.revenue)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Xuất báo cáo</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📊</span>
              Xuất Excel
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📄</span>
              Xuất PDF
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📧</span>
              Gửi email
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📱</span>
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
