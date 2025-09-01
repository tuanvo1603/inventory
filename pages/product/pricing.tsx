import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ProductPricing() {
  const { t } = useTranslation()
  const [pricingRules, setPricingRules] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      category: 'iPhone',
      condition: 'EXCELLENT',
      baseCost: 25000000,
      sellingPrice: 28000000,
      margin: 3000000,
      marginPercent: 12,
      isActive: true,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2', 
      name: 'iPhone 14 128GB',
      category: 'iPhone',
      condition: 'GOOD',
      baseCost: 18000000,
      sellingPrice: 20500000,
      margin: 2500000,
      marginPercent: 13.9,
      isActive: true,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'iPhone 13 256GB',
      category: 'iPhone', 
      condition: 'FAIR',
      baseCost: 14000000,
      sellingPrice: 16000000,
      margin: 2000000,
      marginPercent: 14.3,
      isActive: true,
      lastUpdated: new Date().toISOString(),
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)

  const conditionLabels = {
    'EXCELLENT': 'Xuất sắc',
    'GOOD': 'Tốt', 
    'FAIR': 'Khá',
    'POOR': 'Kém'
  }

  const conditionColors = {
    'EXCELLENT': 'bg-emerald-100 text-emerald-800',
    'GOOD': 'bg-blue-100 text-blue-800',
    'FAIR': 'bg-yellow-100 text-yellow-800',
    'POOR': 'bg-red-100 text-red-800'
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
            <h1 className="text-2xl font-bold text-slate-800">Định giá sản phẩm</h1>
            <p className="text-slate-600">Quản lý giá mua, giá bán và tỷ suất lợi nhuận</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>💰</span>
            Thêm định giá
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-slate-800">{pricingRules.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">💰</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tỷ suất TB</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {(pricingRules.reduce((sum, p) => sum + p.marginPercent, 0) / pricingRules.length).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Giá bán cao nhất</p>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(Math.max(...pricingRules.map(p => p.sellingPrice)))}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">🏆</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Lợi nhuận TB</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(pricingRules.reduce((sum, p) => sum + p.margin, 0) / pricingRules.length)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">💎</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Danh mục:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="iPhone">iPhone</option>
                <option value="iPad">iPad</option>
                <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Tình trạng:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="EXCELLENT">Xuất sắc</option>
                <option value="GOOD">Tốt</option>
                <option value="FAIR">Khá</option>
                <option value="POOR">Kém</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Tên sản phẩm..."
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              🔍 Lọc
            </button>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Bảng định giá sản phẩm</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tình trạng
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Giá mua
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Giá bán
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Lợi nhuận
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tỷ suất (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {pricingRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{rule.name}</div>
                        <div className="text-sm text-slate-500">{rule.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${conditionColors[rule.condition as keyof typeof conditionColors]}`}>
                        {conditionLabels[rule.condition as keyof typeof conditionLabels]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-900">
                      {formatCurrency(rule.baseCost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-emerald-600">
                      {formatCurrency(rule.sellingPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-purple-600">
                      {formatCurrency(rule.margin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-orange-600">
                      {rule.marginPercent.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(rule.lastUpdated).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">✏️</button>
                        <button className="text-yellow-600 hover:text-yellow-900">📈</button>
                        <button className="text-red-600 hover:text-red-900">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {pricingRules.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-400 text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Chưa có quy tắc định giá</h3>
              <p className="text-slate-500">Thêm quy tắc định giá để quản lý giá bán sản phẩm</p>
            </div>
          )}
        </div>

        {/* Add Pricing Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Thêm quy tắc định giá</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên sản phẩm..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Danh mục
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn danh mục</option>
                      <option value="iPhone">iPhone</option>
                      <option value="iPad">iPad</option>
                      <option value="Phụ kiện">Phụ kiện</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tình trạng
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Chọn tình trạng</option>
                      <option value="EXCELLENT">Xuất sắc</option>
                      <option value="GOOD">Tốt</option>
                      <option value="FAIR">Khá</option>
                      <option value="POOR">Kém</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Giá mua (₫)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Giá bán (₫)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tỷ suất mong muốn (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="15.0"
                    />
                  </div>
                </div>

                {/* Price Calculation Preview */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-800 mb-3">Tính toán giá</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Giá mua:</span>
                      <div className="font-semibold text-slate-800">0 ₫</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Lợi nhuận:</span>
                      <div className="font-semibold text-purple-600">0 ₫</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Giá bán:</span>
                      <div className="font-semibold text-emerald-600">0 ₫</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ghi chú về quy tắc định giá..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    defaultChecked={true}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-slate-900">
                    Kích hoạt quy tắc định giá
                  </label>
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
                    Thêm quy tắc
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
