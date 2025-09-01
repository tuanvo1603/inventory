import Layout from '../../components/Layout'
import { useState } from 'react'

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState([
    {
      id: 'main-warehouse-id',
      name: 'Main Warehouse',
      address: 'Default warehouse location',
      description: 'Main storage facility for iPhone inventory',
      isActive: true,
      productCount: 0,
      totalValue: 0,
      createdAt: new Date().toISOString()
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Danh sách Kho</h1>
            <p className="text-slate-600">Quản lý các kho hàng trong hệ thống</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>🏪</span>
            Thêm kho
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng kho</p>
                <p className="text-2xl font-bold text-slate-800">{warehouses.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">🏪</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Hoạt động</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {warehouses.filter(w => w.isActive).length}
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
                <p className="text-sm text-slate-600">Sản phẩm</p>
                <p className="text-2xl font-bold text-purple-600">
                  {warehouses.reduce((sum, w) => sum + w.productCount, 0)}
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
                <p className="text-sm text-slate-600">Giá trị kho</p>
                <p className="text-2xl font-bold text-orange-600">
                  {(warehouses.reduce((sum, w) => sum + w.totalValue, 0) / 1000000).toFixed(0)}M ₫
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <div key={warehouse.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-xl">🏪</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{warehouse.name}</h3>
                    <p className="text-sm text-slate-500">{warehouse.address}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">✏️</button>
                  <button className="text-red-600 hover:text-red-800">🗑️</button>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{warehouse.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500">Sản phẩm</p>
                  <p className="text-lg font-semibold text-slate-800">{warehouse.productCount}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Giá trị</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    {(warehouse.totalValue / 1000000).toFixed(1)}M ₫
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  warehouse.isActive 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {warehouse.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(warehouse.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Warehouse Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Thêm kho mới</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tên kho
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: Kho Hà Nội"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Địa chỉ kho hàng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Mô tả về kho hàng"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">Kích hoạt kho</span>
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
                    Thêm kho
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
