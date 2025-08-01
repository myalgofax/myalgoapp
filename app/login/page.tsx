import { AuthTabs } from "@/components/auth-tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 px-2 sm:px-4 transition-all duration-300 ease-in-out">
      <div className="w-full max-w-sm sm:max-w-md animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Sign in to your account</p>
        </div>
        <AuthTabs defaultTab="login" />

        {/* Register Link Below */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">Don't have an account?</p>
          <Button variant="outline" asChild className="w-full bg-transparent transition-all hover:scale-[1.02]">
            <Link href="/register" className="flex items-center justify-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Create New Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
