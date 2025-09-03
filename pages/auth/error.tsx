import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/auth/signin')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  const getErrorMessage = (error: string | string[] | undefined) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Email hoặc mật khẩu không đúng'
      case 'SessionRequired':
        return 'Vui lòng đăng nhập để tiếp tục'
      case 'AccessDenied':
        return 'Truy cập bị từ chối'
      case 'Verification':
        return 'Lỗi xác thực'
      default:
        return 'Đã xảy ra lỗi xác thực'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Lỗi xác thực
          </h2>
          <p className="mt-2 text-center text-sm text-red-600">
            {getErrorMessage(error)}
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => router.push('/auth/signin')}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Quay lại đăng nhập
          </button>
          
          <p className="text-center text-sm text-gray-500">
            Tự động chuyển hướng sau 5 giây...
          </p>
        </div>
      </div>
    </div>
  )
}
