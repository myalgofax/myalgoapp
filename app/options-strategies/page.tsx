"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Zap,
  BarChart3,
  Settings,
  Play,
  AlertTriangle,
  CheckCircle,
  ArrowUpDown,
  Loader2,
} from "lucide-react"
import { useRouter } from "next/navigation"

const strategies = [
  {
    id: "long-straddle",
    name: "Long Straddle",
    type: "Neutral",
    description: "Buy Call + Buy Put at same strike. Profits from high volatility.",
    risk: "Limited",
    reward: "Unlimited",
    breakeven: "2 points",
    maxLoss: "Premium Paid",
    bestFor: "High volatility expected",
    icon: ArrowUpDown,
    color: "bg-purple-500",
    legs: [
      { action: "BUY", type: "CALL", strike: "ATM" },
      { action: "BUY", type: "PUT", strike: "ATM" },
    ],
  },
  {
    id: "short-straddle",
    name: "Short Straddle",
    type: "Neutral",
    description: "Sell Call + Sell Put at same strike. Profits from low volatility.",
    risk: "Unlimited",
    reward: "Limited",
    breakeven: "2 points",
    maxLoss: "Unlimited",
    bestFor: "Low volatility expected",
    icon: ArrowUpDown,
    color: "bg-orange-500",
    legs: [
      { action: "SELL", type: "CALL", strike: "ATM" },
      { action: "SELL", type: "PUT", strike: "ATM" },
    ],
  },
  {
    id: "long-strangle",
    name: "Long Strangle",
    type: "Neutral",
    description: "Buy OTM Call + Buy OTM Put. Cheaper than straddle.",
    risk: "Limited",
    reward: "Unlimited",
    breakeven: "2 points",
    maxLoss: "Premium Paid",
    bestFor: "Moderate volatility expected",
    icon: TrendingUp,
    color: "bg-blue-500",
    legs: [
      { action: "BUY", type: "CALL", strike: "OTM_CALL" },
      { action: "BUY", type: "PUT", strike: "OTM_PUT" },
    ],
  },
  {
    id: "iron-condor",
    name: "Iron Condor",
    type: "Neutral",
    description: "Sell ITM Call/Put + Buy OTM Call/Put. Range-bound strategy.",
    risk: "Limited",
    reward: "Limited",
    breakeven: "2 points",
    maxLoss: "Spread Width - Premium",
    bestFor: "Range-bound market",
    icon: Shield,
    color: "bg-green-500",
    legs: [
      { action: "SELL", type: "CALL", strike: "OTM_CALL" },
      { action: "BUY", type: "CALL", strike: "FAR_OTM_CALL" },
      { action: "SELL", type: "PUT", strike: "OTM_PUT" },
      { action: "BUY", type: "PUT", strike: "FAR_OTM_PUT" },
    ],
  },
  {
    id: "bull-call-spread",
    name: "Bull Call Spread",
    type: "Bullish",
    description: "Buy ITM Call + Sell OTM Call. Limited risk/reward.",
    risk: "Limited",
    reward: "Limited",
    breakeven: "1 point",
    maxLoss: "Net Premium Paid",
    bestFor: "Moderately bullish",
    icon: TrendingUp,
    color: "bg-green-600",
    legs: [
      { action: "BUY", type: "CALL", strike: "ATM" },
      { action: "SELL", type: "CALL", strike: "OTM_CALL" },
    ],
  },
  {
    id: "bear-put-spread",
    name: "Bear Put Spread",
    type: "Bearish",
    description: "Buy ITM Put + Sell OTM Put. Limited risk/reward.",
    risk: "Limited",
    reward: "Limited",
    breakeven: "1 point",
    maxLoss: "Net Premium Paid",
    bestFor: "Moderately bearish",
    icon: TrendingDown,
    color: "bg-red-500",
    legs: [
      { action: "BUY", type: "PUT", strike: "ATM" },
      { action: "SELL", type: "PUT", strike: "OTM_PUT" },
    ],
  },
]

const mockOptionsData = {
  spot: 19674.25,
  calls: [
    { strike: 19550, ltp: 198.25, iv: 18.8, delta: 0.72, gamma: 0.003, theta: -14.2, vega: 46.8 },
    { strike: 19600, ltp: 156.75, iv: 18.5, delta: 0.65, gamma: 0.003, theta: -12.5, vega: 45.2 },
    { strike: 19650, ltp: 118.4, iv: 17.8, delta: 0.52, gamma: 0.004, theta: -15.2, vega: 48.1 },
    { strike: 19700, ltp: 85.6, iv: 17.2, delta: 0.38, gamma: 0.003, theta: -11.8, vega: 42.3 },
    { strike: 19750, ltp: 58.9, iv: 16.9, delta: 0.26, gamma: 0.002, theta: -8.9, vega: 38.7 },
    { strike: 19800, ltp: 38.75, iv: 16.5, delta: 0.18, gamma: 0.002, theta: -6.5, vega: 34.2 },
  ],
  puts: [
    { strike: 19550, ltp: 98.5, iv: 18.3, delta: -0.28, gamma: 0.003, theta: -9.8, vega: 42.1 },
    { strike: 19600, ltp: 138.9, iv: 18.2, delta: -0.35, gamma: 0.003, theta: -11.2, vega: 44.1 },
    { strike: 19650, ltp: 168.25, iv: 17.9, delta: -0.48, gamma: 0.004, theta: -14.8, vega: 47.8 },
    { strike: 19700, ltp: 201.75, iv: 17.5, delta: -0.62, gamma: 0.003, theta: -16.5, vega: 45.9 },
    { strike: 19750, ltp: 238.4, iv: 17.1, delta: -0.74, gamma: 0.002, theta: -18.2, vega: 43.2 },
    { strike: 19800, ltp: 278.9, iv: 16.8, delta: -0.82, gamma: 0.002, theta: -20.1, vega: 40.5 },
  ],
}

export default function OptionsStrategiesPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("")
  const [selectedStrikes, setSelectedStrikes] = useState<any>({})
  const [orderType, setOrderType] = useState("LIMIT")
  const [quantity, setQuantity] = useState(25)
  const [stopLoss, setStopLoss] = useState(20)
  const [takeProfit, setTakeProfit] = useState(50)
  const [trailingSL, setTrailingSL] = useState(false)
  const [autoAdjust, setAutoAdjust] = useState(false)
  const [timeCondition, setTimeCondition] = useState("DAY")
  const [isExecuting, setIsExecuting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const router = useRouter()

  const getStrikePrice = (strikeType: string, spot: number) => {
    const strikeInterval = 50
    switch (strikeType) {
      case "ATM":
        return Math.round(spot / strikeInterval) * strikeInterval
      case "OTM_CALL":
        return Math.round(spot / strikeInterval) * strikeInterval + strikeInterval
      case "OTM_PUT":
        return Math.round(spot / strikeInterval) * strikeInterval - strikeInterval
      case "FAR_OTM_CALL":
        return Math.round(spot / strikeInterval) * strikeInterval + strikeInterval * 2
      case "FAR_OTM_PUT":
        return Math.round(spot / strikeInterval) * strikeInterval - strikeInterval * 2
      default:
        return Math.round(spot / strikeInterval) * strikeInterval
    }
  }

  const getOptionPrice = (type: string, strike: number) => {
    const options = type === "CALL" ? mockOptionsData.calls : mockOptionsData.puts
    const option = options.find((opt) => opt.strike === strike)
    return option ? option.ltp : 0
  }

  const calculateStrategyMetrics = (strategyId: string) => {
    const strategy = strategies.find((s) => s.id === strategyId)
    if (!strategy) return null

    let totalPremium = 0
    let maxProfit = 0
    let maxLoss = 0
    let breakevens: number[] = []

    strategy.legs.forEach((leg) => {
      const strike = getStrikePrice(leg.strike, mockOptionsData.spot)
      const price = getOptionPrice(leg.type, strike)

      if (leg.action === "BUY") {
        totalPremium -= price
      } else {
        totalPremium += price
      }
    })

    // Dynamic calculations based on strategy type
    switch (strategyId) {
      case "long-straddle":
      case "short-straddle":
        const atmStrike = getStrikePrice("ATM", mockOptionsData.spot)
        const callPrice = getOptionPrice("CALL", atmStrike)
        const putPrice = getOptionPrice("PUT", atmStrike)

        if (strategyId === "long-straddle") {
          totalPremium = -(callPrice + putPrice)
          maxLoss = Math.abs(totalPremium)
          maxProfit = Number.POSITIVE_INFINITY
          breakevens = [atmStrike + Math.abs(totalPremium), atmStrike - Math.abs(totalPremium)]
        } else {
          totalPremium = callPrice + putPrice
          maxProfit = totalPremium
          maxLoss = Number.POSITIVE_INFINITY
          breakevens = [atmStrike + totalPremium, atmStrike - totalPremium]
        }
        break

      case "long-strangle":
        const otmCallStrike = getStrikePrice("OTM_CALL", mockOptionsData.spot)
        const otmPutStrike = getStrikePrice("OTM_PUT", mockOptionsData.spot)
        const otmCallPrice = getOptionPrice("CALL", otmCallStrike)
        const otmPutPrice = getOptionPrice("PUT", otmPutStrike)

        totalPremium = -(otmCallPrice + otmPutPrice)
        maxLoss = Math.abs(totalPremium)
        maxProfit = Number.POSITIVE_INFINITY
        breakevens = [otmCallStrike + Math.abs(totalPremium), otmPutStrike - Math.abs(totalPremium)]
        break

      case "bull-call-spread":
        const buyCallStrike = getStrikePrice("ATM", mockOptionsData.spot)
        const sellCallStrike = getStrikePrice("OTM_CALL", mockOptionsData.spot)
        const buyCallPrice = getOptionPrice("CALL", buyCallStrike)
        const sellCallPrice = getOptionPrice("CALL", sellCallStrike)

        totalPremium = -(buyCallPrice - sellCallPrice)
        maxLoss = Math.abs(totalPremium)
        maxProfit = sellCallStrike - buyCallStrike - Math.abs(totalPremium)
        breakevens = [buyCallStrike + Math.abs(totalPremium)]
        break

      case "bear-put-spread":
        const buyPutStrike = getStrikePrice("ATM", mockOptionsData.spot)
        const sellPutStrike = getStrikePrice("OTM_PUT", mockOptionsData.spot)
        const buyPutPrice = getOptionPrice("PUT", buyPutStrike)
        const sellPutPrice = getOptionPrice("PUT", sellPutStrike)

        totalPremium = -(buyPutPrice - sellPutPrice)
        maxLoss = Math.abs(totalPremium)
        maxProfit = buyPutStrike - sellPutStrike - Math.abs(totalPremium)
        breakevens = [buyPutStrike - Math.abs(totalPremium)]
        break

      case "iron-condor":
        // Simplified iron condor calculation
        totalPremium = 150 // Net credit received
        maxProfit = totalPremium
        maxLoss = 350 // Max spread width - net credit
        breakevens = [19600 + totalPremium, 19750 - totalPremium]
        break
    }

    return {
      totalPremium: totalPremium * quantity,
      maxProfit: maxProfit === Number.POSITIVE_INFINITY ? "Unlimited" : `₹${(maxProfit * quantity).toLocaleString()}`,
      maxLoss: maxLoss === Number.POSITIVE_INFINITY ? "Unlimited" : `₹${(maxLoss * quantity).toLocaleString()}`,
      breakevens: breakevens.map((be) => be.toFixed(0)),
      probability: Math.random() * 30 + 50, // Mock probability 50-80%
      impliedMove: "±2.8%",
      timeDecay: strategyId.includes("long") ? "Negative" : "Positive",
      volatility: strategyId.includes("straddle") ? "High Impact" : "Medium Impact",
    }
  }

  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId)

    const strategy = strategies.find((s) => s.id === strategyId)
    if (!strategy) return

    // Auto-populate strikes based on strategy
    const strikes: any = {}
    strategy.legs.forEach((leg, index) => {
      const strike = getStrikePrice(leg.strike, mockOptionsData.spot)
      strikes[`leg${index}`] = {
        action: leg.action,
        type: leg.type,
        strike: strike,
        price: getOptionPrice(leg.type, strike),
      }
    })

    setSelectedStrikes(strikes)
  }

  const handleExecuteStrategy = async () => {
    try {
      setIsExecuting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create position data for the executed strategy
      const metrics = calculateStrategyMetrics(selectedStrategy)
      const strategy = strategies.find((s) => s.id === selectedStrategy)

      if (!strategy || !metrics) {
        throw new Error("Invalid strategy or metrics")
      }

      const positionData = {
        id: `POS_${Date.now()}`,
        strategy: strategy.name,
        strategyId: selectedStrategy,
        legs: selectedStrikes,
        quantity,
        orderType,
        stopLoss,
        takeProfit,
        trailingSL,
        autoAdjust,
        timeCondition,
        entryTime: new Date().toISOString(),
        entryPremium: metrics.totalPremium || 0,
        currentPnL: 0,
        maxProfit: metrics.maxProfit,
        maxLoss: metrics.maxLoss,
        breakevens: metrics.breakevens,
        status: "ACTIVE",
      }

      // Store in localStorage (in real app, this would be API call)
      const existingPositions = JSON.parse(localStorage.getItem("optionsPositions") || "[]")
      existingPositions.push(positionData)
      localStorage.setItem("optionsPositions", JSON.stringify(existingPositions))

      setIsExecuting(false)
      setShowConfirmDialog(false)

      // Redirect to positions page
      router.push("/positions?tab=options&highlight=" + positionData.id)
    } catch (error) {
      console.error("Error executing strategy:", error)
      setIsExecuting(false)
      // In a real app, you would show an error toast here
    }
  }

  const analysis = selectedStrategy ? calculateStrategyMetrics(selectedStrategy) : null

  return (
    <div className="min-h-full bg-gray-50 py-4 sm:py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Options Strategies</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Prebuilt strategies with automated analysis and execution
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Strategy Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Select Strategy</CardTitle>
                <CardDescription className="text-sm">Choose from proven options strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {strategies.map((strategy) => (
                  <Card
                    key={strategy.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedStrategy === strategy.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleStrategySelect(strategy.id)}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg ${strategy.color}`}>
                          <strategy.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-sm sm:text-base truncate">{strategy.name}</h3>
                            <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                              {strategy.type}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                            {strategy.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Risk: </span>
                              <span className="font-medium">{strategy.risk}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Reward: </span>
                              <span className="font-medium">{strategy.reward}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Strategy Analysis & Configuration */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {selectedStrategy ? (
              <>
                {/* Strategy Analysis */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Strategy Analysis</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Analysis for {strategies.find((s) => s.id === selectedStrategy)?.name} at spot ₹
                      {mockOptionsData.spot.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysis && (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Max Profit</p>
                          <p className="font-bold text-green-600 text-sm sm:text-base">{analysis.maxProfit}</p>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Max Loss</p>
                          <p className="font-bold text-red-600 text-sm sm:text-base">{analysis.maxLoss}</p>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Breakeven</p>
                          <p className="font-bold text-blue-600 text-xs sm:text-sm">
                            {Array.isArray(analysis.breakevens) ? analysis.breakevens.join(", ") : analysis.breakevens}
                          </p>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                          <p className="font-bold text-purple-600 text-sm sm:text-base">
                            {analysis.probability.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Greeks Summary */}
                    <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Time Decay</p>
                        <p className="font-medium text-sm">{analysis?.timeDecay}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Volatility Impact</p>
                        <p className="font-medium text-sm">{analysis?.volatility}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Implied Move</p>
                        <p className="font-medium text-sm">{analysis?.impliedMove}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Net Premium</p>
                        <p className="font-medium text-sm">₹{Math.abs(analysis?.totalPremium || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Configuration */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                      <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Order Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="basic" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3 h-8 sm:h-10">
                        <TabsTrigger value="basic" className="text-xs sm:text-sm">
                          Basic
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="text-xs sm:text-sm">
                          Advanced
                        </TabsTrigger>
                        <TabsTrigger value="risk" className="text-xs sm:text-sm">
                          Risk Mgmt
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="basic" className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Order Type</Label>
                            <Select value={orderType} onValueChange={setOrderType}>
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MARKET">Market</SelectItem>
                                <SelectItem value="LIMIT">Limit</SelectItem>
                                <SelectItem value="SL">Stop Loss</SelectItem>
                                <SelectItem value="SL-M">Stop Loss Market</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm">Quantity (Lots)</Label>
                            <Input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}
                              min="1"
                              max="100"
                              className="h-9"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm">Time Condition</Label>
                            <Select value={timeCondition} onValueChange={setTimeCondition}>
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="DAY">Day</SelectItem>
                                <SelectItem value="IOC">IOC</SelectItem>
                                <SelectItem value="GTD">Good Till Date</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm">Total Premium</Label>
                            <Input
                              value={`₹${Math.abs(analysis?.totalPremium || 0).toLocaleString()}`}
                              disabled
                              className="h-9"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="advanced" className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-sm">Auto Adjustment</Label>
                              <p className="text-xs text-muted-foreground">
                                Automatically adjust strikes based on market movement
                              </p>
                            </div>
                            <Switch checked={autoAdjust} onCheckedChange={setAutoAdjust} />
                          </div>

                          {autoAdjust && (
                            <div className="space-y-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                              <div className="space-y-2">
                                <Label className="text-sm">Adjustment Trigger (%)</Label>
                                <Slider
                                  value={[5]}
                                  onValueChange={(value) => {}}
                                  max={20}
                                  min={1}
                                  step={1}
                                  className="w-full"
                                />
                                <p className="text-xs text-muted-foreground">
                                  Adjust when underlying moves 5% from entry
                                </p>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm">Adjustment Method</Label>
                                <Select defaultValue="roll-strikes">
                                  <SelectTrigger className="h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="roll-strikes">Roll Strikes</SelectItem>
                                    <SelectItem value="add-hedge">Add Hedge</SelectItem>
                                    <SelectItem value="close-losing">Close Losing Leg</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="risk" className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Stop Loss (%)</Label>
                            <Input
                              type="number"
                              value={stopLoss}
                              onChange={(e) => setStopLoss(Number(e.target.value))}
                              min="5"
                              max="100"
                              className="h-9"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm">Take Profit (%)</Label>
                            <Input
                              type="number"
                              value={takeProfit}
                              onChange={(e) => setTakeProfit(Number(e.target.value))}
                              min="10"
                              max="200"
                              className="h-9"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm">Trailing Stop Loss</Label>
                            <p className="text-xs text-muted-foreground">
                              Automatically trail stop loss as position moves in favor
                            </p>
                          </div>
                          <Switch checked={trailingSL} onCheckedChange={setTrailingSL} />
                        </div>

                        {trailingSL && (
                          <div className="space-y-2 p-3 sm:p-4 bg-orange-50 rounded-lg">
                            <Label className="text-sm">Trail Amount (%)</Label>
                            <Slider
                              value={[10]}
                              onValueChange={(value) => {}}
                              max={50}
                              min={5}
                              step={5}
                              className="w-full"
                            />
                            <p className="text-xs text-muted-foreground">Trail by 10% of favorable movement</p>
                          </div>
                        )}

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-yellow-900 text-sm">Risk Warning</h4>
                              <p className="text-xs sm:text-sm text-yellow-700">
                                Options trading involves substantial risk. Maximum loss: ₹
                                {(Math.abs(analysis?.totalPremium || 0) * (stopLoss / 100)).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Execute Button */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
                      <Button
                        className="flex-1 h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        size="lg"
                        onClick={() => setShowConfirmDialog(true)}
                        disabled={isExecuting}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Execute Strategy
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 bg-white border-gray-300 hover:bg-gray-50 text-gray-700 h-10 sm:h-12 font-medium"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Paper Trade
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Strategy</h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base">
                    Choose from our prebuilt options strategies to get started with automated analysis and execution.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Confirm Strategy Execution</DialogTitle>
              <DialogDescription className="text-sm">
                Review your {strategies.find((s) => s.id === selectedStrategy)?.name} strategy before execution
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 sm:p-4 rounded-lg space-y-2" style={{ backgroundColor: "oklch(0.3 0.02 1.3)" }}>
                <div className="flex justify-between text-sm">
                  <span>Strategy:</span>
                  <span className="font-medium">{strategies.find((s) => s.id === selectedStrategy)?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity} lots</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Premium:</span>
                  <span className="font-medium">₹{Math.abs(analysis?.totalPremium || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Stop Loss:</span>
                  <span className="font-medium">{stopLoss}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Take Profit:</span>
                  <span className="font-medium">{takeProfit}%</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white font-medium"
                  onClick={handleExecuteStrategy}
                  disabled={isExecuting}
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm & Execute
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white border-gray-300 hover:bg-gray-50 text-gray-700 h-10 font-medium"
                  onClick={() => setShowConfirmDialog(false)}
                  disabled={isExecuting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
