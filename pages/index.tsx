import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard')
  }, [router])

  return (
    <Layout>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Redirecting to dashboard...</p>
        </div>
      </div>
    </Layout>
  )
}