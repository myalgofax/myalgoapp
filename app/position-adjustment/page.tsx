"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowUpDown,
  Shield,
  Scissors,
  Plus,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Target,
} from "lucide-react"
import { NotificationHelpers } from "@/components/notification-system"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const currentPosition = {
  id: "POS001",
  strategy: "Long Straddle",
  symbol: "NIFTY",
  expiry: "2024-01-25",
  strikes: [19650, 19650],
  legs: [
    { type: "CALL", strike: 19650, qty: 25, premium: 120, side: "BUY" },
    { type: "PUT", strike: 19650, qty: 25, premium: 95, side: "BUY" },
  ],
  totalPremium: 5375,
  currentValue: 4850,
  pnl: -525,
  pnlPercent: -9.77,
  greeks: {
    delta: 0.05,
    gamma: 0.012,
    theta: -15.5,
    vega: 45.2,
  },
}

const adjustmentStrategies = [
  {
    id: "roll_strikes",
    name: "Roll Strikes",
    description: "Move strikes closer or further from current price",
    icon: ArrowUpDown,
    complexity: "Medium",
    riskLevel: "Medium",
  },
  {
    id: "add_hedge",
    name: "Add Hedge",
    description: "Add protective positions to reduce risk",
    icon: Shield,
    complexity: "High",
    riskLevel: "Low",
  },
  {
    id: "partial_close",
    name: "Partial Close",
    description: "Close part of the position to lock profits/reduce losses",
    icon: Scissors,
    complexity: "Low",
    riskLevel: "Low",
  },
  {
    id: "add_quantity",
    name: "Add Quantity",
    description: "Increase position size to average down",
    icon: Plus,
    complexity: "Medium",
    riskLevel: "High",
  },
  {
    id: "convert_strategy",
    name: "Convert Strategy",
    description: "Transform into a different options strategy",
    icon: RefreshCw,
    complexity: "High",
    riskLevel: "Medium",
  },
]

export default function PositionAdjustmentPage() {
  const [selectedStrategy, setSelectedStrategy] = useState("")
  const [adjustmentParams, setAdjustmentParams] = useState<any>({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId)
    setAdjustmentParams({})
  }

  const handleParameterChange = (param: string, value: any) => {
    setAdjustmentParams((prev: any) => ({
      ...prev,
      [param]: value,
    }))
  }

  const calculateAdjustmentImpact = () => {
    // Mock calculation based on selected strategy and parameters
    const baseCost = Math.abs(currentPosition.pnl)
    const adjustmentCost = selectedStrategy === "add_quantity" ? baseCost * 0.5 : baseCost * 0.2
    const newRisk = selectedStrategy === "add_hedge" ? baseCost * 0.3 : baseCost * 1.2

    return {
      cost: adjustmentCost,
      newRisk: newRisk,
      breakeven: currentPosition.strikes[0] + adjustmentCost / 25,
      maxProfit: selectedStrategy === "add_hedge" ? baseCost * 2 : baseCost * 3,
      maxLoss: newRisk,
    }
  }

  const handleConfirmAdjustment = () => {
    const impact = calculateAdjustmentImpact()

    // Simulate adjustment execution
    toast({
      title: "Position Adjusted",
      description: `${adjustmentStrategies.find((s) => s.id === selectedStrategy)?.name} applied successfully`,
    })

    // Send notification
    NotificationHelpers.positionUpdate({
      strategy: currentPosition.strategy,
      adjustment: selectedStrategy,
      cost: impact.cost,
      pnl: currentPosition.pnl - impact.cost,
    })

    // Redirect to positions page
    setTimeout(() => {
      router.push("/positions")
    }, 2000)

    setShowConfirmation(false)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-orange-600 bg-orange-50"
      case "High":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getComplexityColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-blue-600 bg-blue-50"
      case "Medium":
        return "text-purple-600 bg-purple-50"
      case "High":
        return "text-indigo-600 bg-indigo-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-full bg-gray-50 py-4 sm:py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Position Adjustment</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Modify your existing position to manage risk and optimize returns
              </p>
            </div>
            <Button variant="outline" onClick={() => router.push("/positions")}>
              Back to Positions
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Position Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Current Position</span>
                </CardTitle>
                <CardDescription>Position details and current performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Strategy</span>
                    <Badge variant="outline">{currentPosition.strategy}</Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Symbol</span>
                    <span className="font-medium">{currentPosition.symbol}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expiry</span>
                    <span className="font-medium">{currentPosition.expiry}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Premium</span>
                    <span className="font-medium">₹{currentPosition.totalPremium.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Value</span>
                    <span className="font-medium">₹{currentPosition.currentValue.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">P&L</span>
                    <div className="text-right">
                      <div className={`font-bold ${currentPosition.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {currentPosition.pnl >= 0 ? "+" : ""}₹{currentPosition.pnl.toLocaleString()}
                      </div>
                      <div className={`text-xs ${currentPosition.pnlPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ({currentPosition.pnlPercent >= 0 ? "+" : ""}
                        {currentPosition.pnlPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Greeks */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Greeks</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delta</span>
                      <span className="font-medium">{currentPosition.greeks.delta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gamma</span>
                      <span className="font-medium">{currentPosition.greeks.gamma}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Theta</span>
                      <span className="font-medium">{currentPosition.greeks.theta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vega</span>
                      <span className="font-medium">{currentPosition.greeks.vega}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Adjustment Strategies */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Adjustment Strategies</CardTitle>
                <CardDescription>Choose an adjustment strategy to modify your position</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {adjustmentStrategies.map((strategy) => (
                    <Card
                      key={strategy.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedStrategy === strategy.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleStrategySelect(strategy.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <strategy.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm">{strategy.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{strategy.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={`text-xs ${getRiskColor(strategy.riskLevel)}`}>
                                {strategy.riskLevel} Risk
                              </Badge>
                              <Badge className={`text-xs ${getComplexityColor(strategy.complexity)}`}>
                                {strategy.complexity}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Strategy Configuration */}
                {selectedStrategy && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Configure {adjustmentStrategies.find((s) => s.id === selectedStrategy)?.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="parameters" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="parameters">Parameters</TabsTrigger>
                          <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
                        </TabsList>

                        <TabsContent value="parameters" className="space-y-4">
                          {selectedStrategy === "roll_strikes" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>New Call Strike</Label>
                                <Select onValueChange={(value) => handleParameterChange("callStrike", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select strike" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="19600">19600</SelectItem>
                                    <SelectItem value="19700">19700</SelectItem>
                                    <SelectItem value="19800">19800</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>New Put Strike</Label>
                                <Select onValueChange={(value) => handleParameterChange("putStrike", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select strike" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="19600">19600</SelectItem>
                                    <SelectItem value="19700">19700</SelectItem>
                                    <SelectItem value="19800">19800</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}

                          {selectedStrategy === "add_hedge" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Hedge Type</Label>
                                <Select onValueChange={(value) => handleParameterChange("hedgeType", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select hedge" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="protective_put">Protective Put</SelectItem>
                                    <SelectItem value="covered_call">Covered Call</SelectItem>
                                    <SelectItem value="collar">Collar</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Hedge Quantity</Label>
                                <Input
                                  type="number"
                                  placeholder="Enter quantity"
                                  onChange={(e) => handleParameterChange("hedgeQty", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {selectedStrategy === "partial_close" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Close Percentage</Label>
                                <Select onValueChange={(value) => handleParameterChange("closePercent", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select percentage" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="25">25%</SelectItem>
                                    <SelectItem value="50">50%</SelectItem>
                                    <SelectItem value="75">75%</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Leg to Close</Label>
                                <Select onValueChange={(value) => handleParameterChange("legToClose", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select leg" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="call">Call Only</SelectItem>
                                    <SelectItem value="put">Put Only</SelectItem>
                                    <SelectItem value="both">Both Legs</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}

                          {selectedStrategy === "add_quantity" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Additional Quantity</Label>
                                <Input
                                  type="number"
                                  placeholder="Enter quantity"
                                  onChange={(e) => handleParameterChange("addQty", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Price Limit</Label>
                                <Input
                                  type="number"
                                  placeholder="Enter price limit"
                                  onChange={(e) => handleParameterChange("priceLimit", e.target.value)}
                                />
                              </div>
                            </div>
                          )}

                          {selectedStrategy === "convert_strategy" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Target Strategy</Label>
                                <Select onValueChange={(value) => handleParameterChange("targetStrategy", value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select strategy" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="iron_condor">Iron Condor</SelectItem>
                                    <SelectItem value="butterfly">Butterfly</SelectItem>
                                    <SelectItem value="strangle">Strangle</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Strike Width</Label>
                                <Input
                                  type="number"
                                  placeholder="Enter strike width"
                                  onChange={(e) => handleParameterChange("strikeWidth", e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="impact" className="space-y-4">
                          {Object.keys(adjustmentParams).length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base flex items-center space-x-2">
                                    <Calculator className="h-4 w-4" />
                                    <span>Cost Analysis</span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Adjustment Cost</span>
                                    <span className="font-medium">
                                      ₹{calculateAdjustmentImpact().cost.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">New Breakeven</span>
                                    <span className="font-medium">
                                      {calculateAdjustmentImpact().breakeven.toFixed(0)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Max Profit</span>
                                    <span className="font-medium text-green-600">
                                      ₹{calculateAdjustmentImpact().maxProfit.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Max Loss</span>
                                    <span className="font-medium text-red-600">
                                      ₹{calculateAdjustmentImpact().maxLoss.toLocaleString()}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base flex items-center space-x-2">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>Risk Analysis</span>
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Risk Level</span>
                                    <Badge
                                      className={getRiskColor(
                                        adjustmentStrategies.find((s) => s.id === selectedStrategy)?.riskLevel ||
                                          "Medium",
                                      )}
                                    >
                                      {adjustmentStrategies.find((s) => s.id === selectedStrategy)?.riskLevel}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">New Risk Amount</span>
                                    <span className="font-medium">
                                      ₹{calculateAdjustmentImpact().newRisk.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Risk Change</span>
                                    <div className="flex items-center space-x-1">
                                      {calculateAdjustmentImpact().newRisk > Math.abs(currentPosition.pnl) ? (
                                        <TrendingUp className="h-3 w-3 text-red-500" />
                                      ) : (
                                        <TrendingDown className="h-3 w-3 text-green-500" />
                                      )}
                                      <span
                                        className={`text-sm font-medium ${
                                          calculateAdjustmentImpact().newRisk > Math.abs(currentPosition.pnl)
                                            ? "text-red-600"
                                            : "text-green-600"
                                        }`}
                                      >
                                        {(
                                          ((calculateAdjustmentImpact().newRisk - Math.abs(currentPosition.pnl)) /
                                            Math.abs(currentPosition.pnl)) *
                                          100
                                        ).toFixed(1)}
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Configure Parameters</h3>
                              <p className="text-gray-600">
                                Please configure the adjustment parameters to see the impact analysis
                              </p>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>

                      {Object.keys(adjustmentParams).length > 0 && (
                        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                          <Button variant="outline" onClick={() => setSelectedStrategy("")}>
                            Cancel
                          </Button>
                          <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                            <DialogTrigger asChild>
                              <Button>Apply Adjustment</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Position Adjustment</DialogTitle>
                                <DialogDescription>
                                  Please review the adjustment details before proceeding.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Strategy:</span>
                                    <p className="font-medium">
                                      {adjustmentStrategies.find((s) => s.id === selectedStrategy)?.name}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Cost:</span>
                                    <p className="font-medium">₹{calculateAdjustmentImpact().cost.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">New Risk:</span>
                                    <p className="font-medium">
                                      ₹{calculateAdjustmentImpact().newRisk.toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Max Profit:</span>
                                    <p className="font-medium text-green-600">
                                      ₹{calculateAdjustmentImpact().maxProfit.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleConfirmAdjustment}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Confirm Adjustment
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
