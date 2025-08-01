"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Auto-login after 2 seconds on home page
    const timer = setTimeout(() => {
      router.push("/broker-setup")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Auto-login notification */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <p className="text-blue-800 font-medium">Auto-logging you in...</p>
            </div>
            <p className="text-blue-600 text-sm mt-2">Redirecting to broker setup in 2 seconds</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to <span className="text-primary">My AlgoFax</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your trusted partner for algorithmic trading and investment management. Track, analyze, and grow your
            portfolio with advanced algorithms and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/broker-setup")} className="flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/broker-setup")}>
              Connect Broker
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Algorithm Analytics</h2>
            </div>
            <p className="text-muted-foreground">
              Track your algorithmic trading performance in real-time with advanced analytics and insights.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Secure Trading</h2>
            </div>
            <p className="text-muted-foreground">
              Bank-level security with encrypted transactions and secure algorithmic execution.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Smart Algorithms</h2>
            </div>
            <p className="text-muted-foreground">
              Deploy custom algorithms and automated strategies that never miss an opportunity.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Algorithmic Trading?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of traders who trust My AlgoFax for their algorithmic trading needs. Connect your broker
            account today and start building your automated portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/broker-setup")}>
              Connect Broker Account
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/broker-setup")}>
              Explore Features
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
