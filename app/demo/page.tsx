import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogIn, User, Key, ArrowRight } from "lucide-react"

export default function DemoPage() {
  const demoAccounts = [
    {
      email: "admin@myalgofax.com",
      password: "admin123",
      role: "Administrator",
      description: "Full access to all features and admin controls",
    },
    {
      email: "john@example.com",
      password: "password",
      role: "Pro User",
      description: "Professional trader with advanced algorithms",
    },
    {
      email: "demo@demo.com",
      password: "demo",
      role: "Demo User",
      description: "Basic demo account for testing features",
    },
    {
      email: "test@test.com",
      password: "test123",
      role: "Test User",
      description: "Testing account with sample data",
    },
  ]

  return (
    <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Demo Login Credentials</h1>
          <p className="text-lg text-gray-600 mb-6">
            Use any of these demo accounts to explore My AlgoFax dashboard and features
          </p>
          <Badge variant="secondary" className="mb-4">
            No registration required - Just login and explore!
          </Badge>
        </div>

        {/* Demo Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {demoAccounts.map((account, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{account.role}</span>
                </CardTitle>
                <CardDescription>{account.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{account.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{account.password}</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/login" className="flex items-center justify-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login with this account</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <ArrowRight className="h-5 w-5" />
              <span>Quick Start Guide</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose any demo account from above</li>
              <li>Click "Login with this account" to go to the login page</li>
              <li>Copy and paste the email and password</li>
              <li>Click "Sign in" to access the dashboard</li>
              <li>Explore the algorithmic trading features!</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>💡 Tip:</strong> The credentials are also displayed on the login page for easy access.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Direct Login Button */}
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/login" className="flex items-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Go to Login Page</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
