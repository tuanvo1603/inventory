import Layout from '../components/Layout'
import { useState } from 'react'

export default function Suppliers() {
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

  const statusLabels = {
    'ACTIVE': 'Hoạt động',
    'INACTIVE': 'Không hoạt động',
    'SUSPENDED': 'Tạm ngưng'
  }

  const statusColors = {
    'ACTIVE': 'bg-emerald-100 text-emerald-800',
    'INACTIVE': 'bg-slate-100 text-slate-800',
    'SUSPENDED': 'bg-red-100 text-red-800'
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-slate-300'}>
          ⭐
        </span>
      )
    }
    return stars
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Nhà cung cấp</h1>
            <p className="text-slate-600">Quản lý thông tin các nhà cung cấp và đối tác</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>🏢</span>
            Thêm nhà cung cấp
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng nhà cung cấp</p>
                <p className="text-2xl font-bold text-slate-800">{suppliers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">🏢</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {suppliers.filter(s => s.status === 'ACTIVE').length}
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
                <p className="text-sm text-slate-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-purple-600">
                  {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Giá trị giao dịch</p>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(suppliers.reduce((sum, s) => sum + s.totalValue, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Trạng thái:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Không hoạt động</option>
                <option value="SUSPENDED">Tạm ngưng</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Đánh giá:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao trở lên</option>
                <option value="3">3 sao trở lên</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Tên nhà cung cấp, email, SĐT..."
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              🔍 Tìm kiếm
            </button>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 transition-colors duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">🏢</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{supplier.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(supplier.rating)}
                      <span className="text-sm text-slate-500 ml-1">({supplier.rating})</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[supplier.status as keyof typeof statusColors]}`}>
                  {statusLabels[supplier.status as keyof typeof statusLabels]}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">👤</span>
                  <span className="text-slate-700">{supplier.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">📧</span>
                  <span className="text-blue-600">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">📱</span>
                  <span className="text-slate-700">{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">📍</span>
                  <span className="text-slate-700">{supplier.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">🏛️</span>
                  <span className="text-slate-700">MST: {supplier.taxCode}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{supplier.totalOrders}</div>
                  <div className="text-xs text-slate-600">Đơn hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">
                    {formatCurrency(supplier.totalValue)}
                  </div>
                  <div className="text-xs text-slate-600">Tổng giá trị</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span>Đơn hàng gần nhất: {new Date(supplier.lastOrderDate).toLocaleDateString('vi-VN')}</span>
                <span>Tham gia: {new Date(supplier.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-1">👁️</button>
                  <button className="text-yellow-600 hover:text-yellow-900 p-1">✏️</button>
                  <button className="text-emerald-600 hover:text-emerald-900 p-1">📞</button>
                </div>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200">
                  Tạo đơn hàng
                </button>
              </div>
            </div>
          ))}
        </div>

        {suppliers.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-slate-400 text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Chưa có nhà cung cấp</h3>
            <p className="text-slate-500 mb-4">Thêm nhà cung cấp đầu tiên để bắt đầu nhập hàng</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Thêm nhà cung cấp đầu tiên
            </button>
          </div>
        )}

        {/* Add Supplier Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Thêm nhà cung cấp mới</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tên công ty/cửa hàng
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên nhà cung cấp..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Người liên hệ
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tên người liên hệ..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0901234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Mã số thuế
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Trạng thái
                    </label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="ACTIVE">Hoạt động</option>
                      <option value="INACTIVE">Không hoạt động</option>
                      <option value="SUSPENDED">Tạm ngưng</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Địa chỉ
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Địa chỉ đầy đủ..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ghi chú thêm về nhà cung cấp..."
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
                    Thêm nhà cung cấp
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
