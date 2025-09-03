import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
import '../styles/globals.css'
import '../lib/i18n'
import i18n from '../lib/i18n'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    // Đảm bảo i18n được khởi tạo đúng cách
    if (i18n.isInitialized) {
      setIsI18nInitialized(true)
    } else {
      i18n.on('initialized', () => {
        setIsI18nInitialized(true)
      })
    }
  }, [])

  // Hiển thị loading trong khi i18n đang khởi tạo
  if (!isI18nInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    )
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
