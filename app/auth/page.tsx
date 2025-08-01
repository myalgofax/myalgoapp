import { AuthTabs } from "@/components/auth-tabs"

export default function AuthPage() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account or create a new one</p>
        </div>
        <AuthTabs />
      </div>
    </div>
  )
}
