"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  AlertCircle,
  Shield,
  Zap,
  TrendingUp,
  LinkIcon,
  ArrowRight,
  Eye,
  EyeOff,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

const brokers = [
  {
    id: "zerodha",
    name: "Zerodha Kite",
    logo: "Z",
    color: "bg-orange-500",
    popular: true,
    features: ["API Trading", "Real-time Data", "Portfolio Sync"],
    description: "India's largest retail broker with robust API support",
  },
  {
    id: "angelone",
    name: "Angel One",
    logo: "A",
    color: "bg-red-500",
    popular: true,
    features: ["Smart API", "Advanced Charts", "Research Reports"],
    description: "Comprehensive trading platform with smart features",
  },
  {
    id: "kotak",
    name: "Kotak Neo",
    logo: "K",
    color: "bg-blue-600",
    popular: false,
    features: ["Neo API", "Multi-asset Trading", "Risk Management"],
    description: "Modern trading platform by Kotak Securities",
  },
  {
    id: "upstox",
    name: "Upstox",
    logo: "U",
    color: "bg-purple-500",
    popular: true,
    features: ["Pro API", "Low Latency", "Mobile First"],
    description: "Technology-driven discount broker",
  },
  {
    id: "fyers",
    name: "Fyers",
    logo: "F",
    color: "bg-green-600",
    popular: false,
    features: ["Fyers API", "Advanced Tools", "Multi-segment"],
    description: "Feature-rich platform for active traders",
  },
  {
    id: "iifl",
    name: "IIFL Securities",
    logo: "I",
    color: "bg-indigo-500",
    popular: false,
    features: ["Trade API", "Research", "Advisory"],
    description: "Full-service broker with comprehensive solutions",
  },
]

export default function BrokerSetup() {
  const [selectedBroker, setSelectedBroker] = useState<string>("")
  const [step, setStep] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showApiSecret, setShowApiSecret] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle")
  const [autoLoginComplete, setAutoLoginComplete] = useState(false)
  const router = useRouter()

  // Show auto-login animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoLoginComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleBrokerSelect = (brokerId: string) => {
    setSelectedBroker(brokerId)
    setStep(2)
  }

  const handleConnect = async () => {
    setIsConnecting(true)
    setConnectionStatus("connecting")

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setConnectionStatus("success")
    setIsConnecting(false)

    // Redirect to dashboard after successful connection
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const selectedBrokerData = brokers.find((b) => b.id === selectedBroker)

  return (
    <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Auto-login Status */}
        {!autoLoginComplete && (
          <div className="text-center mb-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <div>
                    <p className="text-blue-800 font-medium">Logging you in automatically...</p>
                    <p className="text-blue-600 text-sm">Welcome back, John Doe!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <User className="h-8 w-8 text-green-500" />
            <Badge variant="default" className="bg-green-500">
              Logged In
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Broker</h1>
          <p className="text-lg text-gray-600 mb-6">
            Connect your trading account to unlock all algorithmic trading features
          </p>
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Choose Broker</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className={`flex items-center space-x-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Connect Account</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 ${connectionStatus === "success" ? "text-green-600" : "text-gray-400"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${connectionStatus === "success" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  3
                </div>
                <span className="text-sm font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-center">Select Your Broker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokers.map((broker) => (
                <Card
                  key={broker.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] relative"
                  onClick={() => handleBrokerSelect(broker.id)}
                >
                  {broker.popular && <Badge className="absolute -top-2 -right-2 bg-orange-500">Popular</Badge>}
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${broker.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                    >
                      {broker.logo}
                    </div>
                    <CardTitle className="text-lg">{broker.name}</CardTitle>
                    <CardDescription className="text-sm">{broker.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {broker.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-transparent" variant="outline">
                      Select {broker.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedBrokerData && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 ${selectedBrokerData.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                >
                  {selectedBrokerData.logo}
                </div>
                <CardTitle className="text-xl">Connect to {selectedBrokerData.name}</CardTitle>
                <CardDescription>Enter your API credentials to connect your trading account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {connectionStatus === "connecting" && (
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <div>
                      <p className="font-medium">Connecting to {selectedBrokerData.name}...</p>
                      <Progress value={66} className="mt-2" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Verifying credentials and establishing secure connection
                      </p>
                    </div>
                  </div>
                )}

                {connectionStatus === "success" && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <div>
                      <p className="text-xl font-semibold text-green-600">Successfully Connected!</p>
                      <p className="text-muted-foreground">Your {selectedBrokerData.name} account is now linked</p>
                      <p className="text-sm text-muted-foreground mt-2">Redirecting to dashboard...</p>
                    </div>
                  </div>
                )}

                {connectionStatus === "idle" && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Secure Connection</h4>
                          <p className="text-sm text-blue-700">
                            Your API credentials are encrypted and stored securely. We never store your trading
                            passwords.
                          </p>
                        </div>
                      </div>
                    </div>

                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <Input id="api-key" placeholder="Enter your API key" className="font-mono" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="api-secret">API Secret</Label>
                        <div className="relative">
                          <Input
                            id="api-secret"
                            type={showApiSecret ? "text" : "password"}
                            placeholder="Enter your API secret"
                            className="font-mono pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowApiSecret(!showApiSecret)}
                          >
                            {showApiSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="user-id">User ID / Client ID</Label>
                        <Input id="user-id" placeholder="Enter your user ID" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Trading Password</Label>
                        <Input id="password" type="password" placeholder="Enter your trading password" />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900">How to get API credentials</h4>
                            <p className="text-sm text-yellow-700">
                              Login to your {selectedBrokerData.name} account → Go to API section → Generate API key and
                              secret
                            </p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link" className="p-0 h-auto text-yellow-700 underline text-sm">
                                  View detailed instructions
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>API Setup Instructions for {selectedBrokerData.name}</DialogTitle>
                                  <DialogDescription>Follow these steps to get your API credentials</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Step 1: Login to your broker account</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Go to {selectedBrokerData.name} website and login with your credentials
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Step 2: Navigate to API section</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Look for "API", "Developer", or "Third-party Apps" section in your account
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Step 3: Generate API credentials</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Create a new API key and secret. Make sure to enable trading permissions.
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">Step 4: Copy credentials</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Copy the API key, secret, and your user ID to paste in the form above.
                                    </p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button type="button" onClick={handleConnect} disabled={isConnecting} className="flex-1">
                          {isConnecting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Connecting...
                            </>
                          ) : (
                            <>
                              <LinkIcon className="h-4 w-4 mr-2" />
                              Connect Account
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Features Unlocked */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Features You'll Unlock</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Real-time Portfolio Sync</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Automated Algorithm Trading</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-purple-500" />
                    <span className="text-sm">Risk Management Tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Live Order Execution</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
