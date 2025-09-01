import Layout from '../components/Layout'
import Link from 'next/link'

export default function Demo() {
  const newPages = [
    {
      title: 'Phân loại sản phẩm',
      description: 'Quản lý danh mục và phân loại sản phẩm iPhone, iPad, phụ kiện',
      href: '/product/categories',
      icon: '📂',
      features: ['Grid layout danh mục', 'CRUD operations', 'Toggle trạng thái', 'Stats tổng quan']
    },
    {
      title: 'Quản lý giá bán',
      description: 'Định giá sản phẩm theo tình trạng với tính toán tự động lợi nhuận',
      href: '/product/pricing',
      icon: '💰',
      features: ['Bảng định giá chi tiết', 'Tính toán margin tự động', 'Filter theo condition', 'Preview tính toán']
    },
    {
      title: 'Nhà cung cấp',
      description: 'Quản lý thông tin nhà cung cấp và đối tác kinh doanh',
      href: '/suppliers',
      icon: '🏢',
      features: ['Card layout thông tin', 'Rating system', 'Stats giao dịch', 'Quick actions']
    },
    {
      title: 'Khách hàng',
      description: 'Quản lý database khách hàng và lịch sử mua hàng',
      href: '/customers',
      icon: '👥',
      features: ['Table view với avatar', 'Customer classification', 'Purchase history', 'Customer lifecycle']
    },
    {
      title: 'Điều chuyển kho',
      description: 'Quản lý việc chuyển hàng giữa các kho',
      href: '/warehouse/transfer',
      icon: '🔄',
      features: ['Transfer workflow', 'Multi-warehouse support', 'Status tracking', 'Item management']
    },
    {
      title: 'Phân quyền (Fixed)',
      description: 'Quản lý roles và permissions (đã sửa TypeScript errors)',
      href: '/account/roles',
      icon: '🔐',
      features: ['Permission matrix', 'Role-based access', 'User assignment', 'Type-safe code']
    }
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            🎉 Các màn hình mới đã được tạo!
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Hệ thống quản lý inventory iPhone đã được bổ sung đầy đủ các chức năng phân loại sản phẩm, 
            quản lý giá bán, nhà cung cấp và nhiều tính năng khác theo đúng Blue Minimalist theme.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tổng trang mới</p>
                <p className="text-2xl font-bold text-blue-600">{newPages.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📄</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">UI Components</p>
                <p className="text-2xl font-bold text-emerald-600">50+</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">🧩</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">TypeScript</p>
                <p className="text-2xl font-bold text-purple-600">100%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">🔧</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Design System</p>
                <p className="text-2xl font-bold text-orange-600">Blue</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">🎨</span>
              </div>
            </div>
          </div>
        </div>

        {/* New Pages Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">🚀 Các trang đã được tạo</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {newPages.map((page, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xl">{page.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{page.title}</h3>
                      <p className="text-slate-600 text-sm">{page.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-slate-700 mb-2">✨ Tính năng chính:</h4>
                  <ul className="space-y-1">
                    {page.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={page.href}
                  className="block w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-lg text-center font-medium transition-colors duration-200"
                >
                  Xem trang →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Notes */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">📋 Ghi chú kỹ thuật</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">🎨 Design System</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Blue Minimalist theme với consistent color palette</li>
                <li>• Responsive grid layouts cho mọi screen size</li>
                <li>• Hover effects và smooth transitions</li>
                <li>• Iconography system với emoji cho accessibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">⚡ Technical Features</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• TypeScript với proper type definitions</li>
                <li>• React hooks cho state management</li>
                <li>• Modal forms với validation ready</li>
                <li>• Search và filter functionality</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">🚀 Các bước tiếp theo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-700 mb-2">🔌 API Integration</h4>
              <p className="text-sm text-slate-600">Kết nối với Prisma API routes để xử lý dữ liệu thực tế</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-700 mb-2">🔒 Authentication</h4>
              <p className="text-sm text-slate-600">Implement role-based access control cho các trang</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-700 mb-2">📊 Data Validation</h4>
              <p className="text-sm text-slate-600">Thêm form validation và error handling</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
