import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState('7d')

  const [dashboardData] = useState({
    todayStats: {
      sales: 16500000,
      orders: 2,
      customers: 3,
      profit: 2200000
    },
    recentActivity: [
      {
        id: 1,
        type: 'SALE',
        description: t('dashboard.soldIPhone15ProMax'),
        amount: 28000000,
        time: t('dashboard.2HoursAgo'),
        status: 'SUCCESS'
      },
      {
        id: 2,
        type: 'PURCHASE',
        description: t('dashboard.importedIPhone14'),
        amount: -22000000,
        time: t('dashboard.4HoursAgo'),
        status: 'PENDING'
      },
      {
        id: 3,
        type: 'CUSTOMER',
        description: t('dashboard.newCustomer'),
        amount: 0,
        time: t('dashboard.6HoursAgo'),
        status: 'INFO'
      },
      {
        id: 4,
        type: 'INVENTORY',
        description: t('dashboard.iPhone12Warning'),
        amount: 0,
        time: t('dashboard.8HoursAgo'),
        status: 'WARNING'
      }
    ],
    topProducts: [
      { name: 'iPhone 15 Pro Max', sales: 28000000, growth: '+15%' },
      { name: 'iPhone 14 Pro', sales: 23000000, growth: '+8%' },
      { name: 'iPhone 13', sales: 16000000, growth: '+12%' }
    ],
    salesTrend: [
      { period: t('dashboard.monday'), sales: 25000000, orders: 3 },
      { period: t('dashboard.tuesday'), sales: 18000000, orders: 2 },
      { period: t('dashboard.wednesday'), sales: 32000000, orders: 4 },
      { period: t('dashboard.thursday'), sales: 28000000, orders: 3 },
      { period: t('dashboard.friday'), sales: 35000000, orders: 5 },
      { period: t('dashboard.saturday'), sales: 22000000, orders: 2 },
      { period: t('dashboard.sunday'), sales: 16500000, orders: 2 }
    ],
    alerts: [
      { type: 'stock', message: t('dashboard.iPhone12StockWarning'), priority: 'high' },
      { type: 'payment', message: t('dashboard.pendingPayments'), priority: 'medium' },
      { type: 'delivery', message: t('dashboard.overdueDelivery'), priority: 'high' }
    ]
  })

  const formatCurrency = (amount: number) => {
    return Math.abs(amount).toLocaleString('vi-VN') + ' ₫'
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'SALE': return '💰'
      case 'PURCHASE': return '📦'
      case 'CUSTOMER': return '👤'
      case 'INVENTORY': return '📱'
      default: return '📋'
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'text-emerald-600'
      case 'PENDING': return 'text-orange-600'
      case 'WARNING': return 'text-red-600'
      case 'INFO': return 'text-blue-600'
      default: return 'text-slate-600'
    }
  }

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-orange-500 bg-orange-50'
      case 'low': return 'border-l-blue-500 bg-blue-50'
      default: return 'border-l-slate-500 bg-slate-50'
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('dashboard.title')}</h1>
            <p className="text-slate-600">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Hôm nay</option>
              <option value="7d">{t('dashboard.7DaysAgo')}</option>
              <option value="30d">{t('dashboard.30DaysAgo')}</option>
              <option value="90d">{t('dashboard.3MonthsAgo')}</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>🔄</span>
              {t('common.refresh')}
            </button>
          </div>
        </div>

        {/* Today Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">{t('dashboard.todaySales')}</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(dashboardData.todayStats.sales)}
                </p>
                <p className="text-emerald-200 text-xs mt-1">{t('dashboard.vs12PercentUp')}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">{t('dashboard.orders')}</p>
                <p className="text-2xl font-bold">{dashboardData.todayStats.orders}</p>
                <p className="text-blue-200 text-xs mt-1">{t('dashboard.plus1Order')}</p>
              </div>
              <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">{t('dashboard.customers')}</p>
                <p className="text-2xl font-bold">{dashboardData.todayStats.customers}</p>
                <p className="text-purple-200 text-xs mt-1">{t('dashboard.plus1New')}</p>
              </div>
              <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">{t('dashboard.profit')}</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(dashboardData.todayStats.profit)}
                </p>
                <p className="text-orange-200 text-xs mt-1">{t('dashboard.plus8Percent')}</p>
              </div>
              <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💎</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('dashboard.salesTrend')}</h3>
            <div className="space-y-3">
              {dashboardData.salesTrend.map((day, index) => {
                const maxSales = Math.max(...dashboardData.salesTrend.map(d => d.sales))
                const width = (day.sales / maxSales) * 100
                
                return (
                  <div key={day.period} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium text-slate-600">{day.period}</div>
                    <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${width}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-sm font-medium text-white">
                          {formatCurrency(day.sales)}
                        </span>
                        <span className="text-xs text-blue-100">
                          {day.orders} đơn
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Thao tác nhanh</h3>
            <div className="space-y-3">
              <button className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors">
                <span>🛒</span>
                <span className="font-medium">Tạo đơn bán hàng</span>
              </button>
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors">
                <span>📦</span>
                <span className="font-medium">Nhập hàng mới</span>
              </button>
              <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors">
                <span>👤</span>
                <span className="font-medium">Thêm khách hàng</span>
              </button>
              <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors">
                <span>📊</span>
                <span className="font-medium">Xem báo cáo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Hoạt động gần đây</h3>
            <div className="space-y-3">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                    <span>{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{activity.description}</div>
                    <div className="text-sm text-slate-500">{activity.time}</div>
                  </div>
                  {activity.amount !== 0 && (
                    <div className={`font-semibold ${activity.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                    </div>
                  )}
                  <div className={`text-sm ${getActivityColor(activity.status)}`}>
                    {activity.status === 'SUCCESS' ? '✓' : 
                     activity.status === 'PENDING' ? '⏳' :
                     activity.status === 'WARNING' ? '⚠️' : 'ℹ️'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products & Alerts */}
          <div className="space-y-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Sản phẩm bán chạy</h3>
              <div className="space-y-3">
                {dashboardData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">#{index + 1}</span>
                      </div>
                      <span className="font-medium text-slate-800">{product.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">{formatCurrency(product.sales)}</div>
                      <div className="text-sm text-emerald-500">{product.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Cảnh báo</h3>
              <div className="space-y-3">
                {dashboardData.alerts.map((alert, index) => (
                  <div key={index} className={`p-3 border-l-4 rounded-r-lg ${getAlertColor(alert.priority)}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800">{alert.message}</span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <span>✕</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
