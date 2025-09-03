import Layout from '../../components/Layout'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Role = {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
}

export default function AccountRoles() {
  const { t } = useTranslation()
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'ADMIN',
      description: 'Full system access',
      userCount: 1,
      permissions: ['user.view', 'user.create', 'user.edit', 'user.delete', 'product.view', 'product.create', 'order.view', 'report.view']
    },
    {
      id: '2',
      name: 'MANAGER',
      description: 'Management access to inventory and orders',
      userCount: 0,
      permissions: ['product.view', 'product.create', 'product.edit', 'order.view', 'order.create', 'order.edit']
    },
    {
      id: '3',
      name: 'STAFF',
      description: 'Basic access to daily operations',
      userCount: 0,
      permissions: ['product.view', 'order.view', 'order.create']
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const allPermissions = [
    { id: 'user.view', name: 'Xem người dùng', category: 'Quản lý tài khoản' },
    { id: 'user.create', name: 'Tạo người dùng', category: 'Quản lý tài khoản' },
    { id: 'user.edit', name: 'Sửa người dùng', category: 'Quản lý tài khoản' },
    { id: 'user.delete', name: 'Xóa người dùng', category: 'Quản lý tài khoản' },
    { id: 'product.view', name: 'Xem sản phẩm', category: 'Quản lý sản phẩm' },
    { id: 'product.create', name: 'Tạo sản phẩm', category: 'Quản lý sản phẩm' },
    { id: 'product.edit', name: 'Sửa sản phẩm', category: 'Quản lý sản phẩm' },
    { id: 'product.delete', name: 'Xóa sản phẩm', category: 'Quản lý sản phẩm' },
    { id: 'order.view', name: 'Xem đơn hàng', category: 'Quản lý đơn hàng' },
    { id: 'order.create', name: 'Tạo đơn hàng', category: 'Quản lý đơn hàng' },
    { id: 'order.edit', name: 'Sửa đơn hàng', category: 'Quản lý đơn hàng' },
    { id: 'order.delete', name: 'Xóa đơn hàng', category: 'Quản lý đơn hàng' },
    { id: 'report.view', name: 'Xem báo cáo', category: 'Báo cáo' },
  ]

  type PermissionsByCategory = Record<string, typeof allPermissions>

  const groupedPermissions = allPermissions.reduce((acc: PermissionsByCategory, permission) => {
    if (!acc[permission.category]) acc[permission.category] = []
    acc[permission.category].push(permission)
    return acc
  }, {})

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t('roles.title')}</h1>
            <p className="text-slate-600">{t('roles.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <span>🛡️</span>
            {t('roles.addRole')}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t('roles.totalRoles')}</p>
                <p className="text-2xl font-bold text-slate-800">{roles.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">🛡️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t('roles.totalPermissions')}</p>
                <p className="text-2xl font-bold text-blue-600">{allPermissions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">🔐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Admin</p>
                <p className="text-2xl font-bold text-red-600">
                  {roles.filter(r => r.name === 'ADMIN').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">👑</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{t('roles.userCount')}</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {roles.reduce((sum, r) => sum + r.userCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{role.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{role.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️
                  </button>
                  <button className="text-red-600 hover:text-red-800">🗑️</button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{t('roles.userCount')}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {role.userCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{t('roles.permissions')}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {role.permissions.length}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">{t('roles.permissions')}:</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <span
                      key={permission}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                    >
                      {allPermissions.find(p => p.id === permission)?.name}
                    </span>
                  ))}
                  {role.permissions.length > 3 && (
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      +{role.permissions.length - 3} khác
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Role Modal */}
        {(showAddForm || selectedRole) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {selectedRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tên vai trò
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedRole?.name || ''}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="VD: SALES_MANAGER"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Mô tả
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedRole?.description || ''}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mô tả vai trò"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Phân quyền
                  </label>
                  
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className="mb-4 border border-slate-200 rounded-lg p-4">
                      <h4 className="font-medium text-slate-800 mb-3">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <label key={permission.id} className="flex items-center">
                            <input
                              type="checkbox"
                              defaultChecked={selectedRole?.permissions.includes(permission.id)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-slate-700">{permission.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setSelectedRole(null)
                    }}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {selectedRole ? t('common.update') : t('common.add')}
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
