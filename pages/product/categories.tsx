import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Category = {
  id: string
  name: string
  description: string
  isActive: boolean
  productCount: number
  createdAt: string
  updatedAt: string
}

export default function ProductCategories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'iPhone',
      description: 'Apple iPhone các phiên bản',
      isActive: true,
      productCount: 150,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'iPad',
      description: 'Apple iPad các dòng',
      isActive: true,
      productCount: 25,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Phụ kiện',
      description: 'Phụ kiện cho iPhone/iPad',
      isActive: true,
      productCount: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleDeleteCategory = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ))
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Danh mục sản phẩm</h1>
            <p className="text-slate-600">Quản lý phân loại sản phẩm trong hệ thống</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>➕</span>
            Thêm danh mục
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng danh mục</p>
                <p className="text-2xl font-bold text-slate-800">{categories.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📂</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {categories.filter(c => c.isActive).length}
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
                <p className="text-sm text-slate-600">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-purple-600">
                  {categories.reduce((sum, c) => sum + c.productCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">📱</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Trung bình/danh mục</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(categories.reduce((sum, c) => sum + c.productCount, 0) / categories.length || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Trạng thái:</label>
              <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tất cả</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700">Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Tên danh mục..."
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              🔍 Tìm kiếm
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 transition-colors duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{category.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      category.isActive 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {category.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-slate-400 hover:text-blue-600 p-1"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleToggleStatus(category.id)}
                    className="text-slate-400 hover:text-yellow-600 p-1"
                  >
                    {category.isActive ? '⏸️' : '▶️'}
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4">{category.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Số sản phẩm:</span>
                  <span className="font-semibold text-purple-600">{category.productCount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Ngày tạo:</span>
                  <span className="text-sm text-slate-700">
                    {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    Xem sản phẩm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-slate-400 text-2xl">📂</span>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Chưa có danh mục sản phẩm</h3>
            <p className="text-slate-500 mb-4">Tạo danh mục đầu tiên để phân loại sản phẩm</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Thêm danh mục đầu tiên
            </button>
          </div>
        )}

        {/* Add/Edit Category Modal */}
        {(showAddForm || editingCategory) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tên danh mục
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCategory?.name || ''}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên danh mục..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    defaultValue={editingCategory?.description || ''}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Mô tả về danh mục..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    defaultChecked={editingCategory?.isActive ?? true}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-slate-900">
                    Kích hoạt danh mục
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingCategory(null)
                    }}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingCategory ? 'Cập nhật' : 'Thêm danh mục'}
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
