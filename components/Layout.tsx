import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [openMenus, setOpenMenus] = React.useState<string[]>([])

  const menuItems = [
    {
      title: t('navigation.dashboard'),
      icon: '📊',
      href: '/dashboard',
      category: 'main'
    },
    {
      title: t('navigation.account'),
      icon: '👤',
      href: '/account',
      category: 'system',
      subItems: [
        { title: t('navigation.users'), href: '/account/users' },
        { title: t('navigation.roles'), href: '/account/roles' }
      ]
    },
    {
      title: t('navigation.warehouse'),
      icon: '🏪',
      href: '/warehouse',
      category: 'inventory',
      subItems: [
        { title: t('navigation.inventory'), href: '/warehouse/inventory' },
        { title: t('navigation.transfer'), href: '/warehouse/transfer' }
      ]
    },
    {
      title: t('navigation.products'),
      icon: '📱',
      href: '/product',
      category: 'product',
      subItems: [
        { title: t('navigation.products'), href: '/product/list' },
        { title: t('navigation.categories'), href: '/product/categories' },
        { title: t('navigation.pricing'), href: '/product/pricing' }
      ]
    },
    {
      title: t('navigation.partners'),
      icon: '🤝',
      href: '/partner',
      category: 'partner',
      subItems: [
        { title: t('navigation.suppliers'), href: '/partner/suppliers' },
        { title: t('navigation.customers'), href: '/partner/customers' }
      ]
    },
    {
      title: t('navigation.orders'),
      icon: '📋',
      href: '/order',
      category: 'order',
      subItems: [
        { title: t('navigation.sales'), href: '/order/sales' },
        { title: t('navigation.purchase'), href: '/order/purchase' },
        { title: t('navigation.payment'), href: '/order/payment' }
      ]
    },
    {
      title: t('navigation.reports'),
      icon: '📊',
      href: '/report',
      category: 'report',
      subItems: [
        { title: t('navigation.salesReport'), href: '/report/sales' },
        { title: t('navigation.inventoryReport'), href: '/report/inventory' },
        { title: t('navigation.debtReport'), href: '/report/debt' }
      ]
    }
  ]

  // Auto-expand parent menu if current page is a sub-item
  React.useEffect(() => {
    menuItems.forEach(item => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(subItem => router.pathname === subItem.href)
        if (hasActiveSubItem && !openMenus.includes(item.category)) {
          setOpenMenus(prev => [...prev, item.category])
        }
      }
    })
  }, [router.pathname])

  const toggleMenu = (category: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
    setOpenMenus(prev => 
      prev.includes(category) 
        ? prev.filter(item => item !== category)
        : [...prev, category]
    )
  }

  const isActiveRoute = (href: string) => {
    if (href === '/' || href === '/dashboard') {
      return router.pathname === '/' || router.pathname === '/dashboard'
    }
    return router.pathname === href
  }

  const hasActiveSubItem = (subItems: any[]) => {
    return subItems.some(subItem => router.pathname === subItem.href)
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-800">iPhone Resale</h1>
          <p className="text-sm text-slate-500">Inventory Management</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => (
            <div key={item.category}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={(e) => toggleMenu(item.category, e)}
                    className={`w-full flex items-center justify-between px-6 py-3 text-left hover:bg-slate-50 transition-colors ${
                      hasActiveSubItem(item.subItems) 
                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                        : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 transform transition-transform ${
                        openMenus.includes(item.category) ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openMenus.includes(item.category) && (
                    <div className="bg-slate-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-12 py-2 text-sm hover:bg-slate-100 transition-colors ${
                            isActiveRoute(subItem.href)
                              ? 'text-blue-600 font-medium bg-blue-50'
                              : 'text-slate-600'
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-6 py-3 hover:bg-slate-50 transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                      : 'text-slate-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {t('dashboard.title')}
              </h2>
              <p className="text-sm text-slate-500">
                {new Date().toLocaleDateString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-slate-600">🔔</span>
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-slate-600">⚙️</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
