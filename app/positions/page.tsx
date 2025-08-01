"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  RefreshCw,
  Download,
  BarChart3,
  Target,
  Settings,
  Bell,
  Eye,
  AlertTriangle,
  DollarSign,
  Activity,
  PieChartIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for positions
const positions = [
  {
    id: "POS001",
    strategy: "Long Straddle",
    symbol: "NIFTY",
    expiry: "2024-01-25",
    quantity: 50,
    avgPrice: 215.0,
    ltp: 194.0,
    pnl: -1050,
    pnlPercent: -9.77,
    dayChange: -525,
    dayChangePercent: -2.45,
    greeks: { delta: 0.05, gamma: 0.012, theta: -15.5, vega: 45.2 },
    legs: [
      { type: "CALL", strike: 19650, qty: 25, premium: 120, ltp: 95 },
      { type: "PUT", strike: 19650, qty: 25, premium: 95, ltp: 99 },
    ],
  },
  {
    id: "POS002",
    strategy: "Iron Condor",
    symbol: "BANKNIFTY",
    expiry: "2024-01-25",
    quantity: 25,
    avgPrice: 45.0,
    ltp: 52.0,
    pnl: 175,
    pnlPercent: 15.56,
    dayChange: 87.5,
    dayChangePercent: 1.94,
    greeks: { delta: -0.02, gamma: 0.008, theta: -8.2, vega: 12.5 },
    legs: [
      { type: "CALL", strike: 44000, qty: 25, premium: 15, ltp: 12 },
      { type: "CALL", strike: 44500, qty: -25, premium: 8, ltp: 6 },
      { type: "PUT", strike: 43500, qty: 25, premium: 12, ltp: 18 },
      { type: "PUT", strike: 43000, qty: -25, premium: 6, ltp: 10 },
    ],
  },
  {
    id: "POS003",
    strategy: "Bull Call Spread",
    symbol: "RELIANCE",
    expiry: "2024-02-01",
    quantity: 100,
    avgPrice: 25.0,
    ltp: 32.0,
    pnl: 700,
    pnlPercent: 28.0,
    dayChange: 200,
    dayChangePercent: 6.67,
    greeks: { delta: 0.35, gamma: 0.015, theta: -5.8, vega: 18.3 },
    legs: [
      { type: "CALL", strike: 2400, qty: 100, premium: 45, ltp: 52 },
      { type: "CALL", strike: 2450, qty: -100, premium: 20, ltp: 20 },
    ],
  },
]

// Mock data for portfolio performance
const portfolioData = [
  { date: "Jan 15", value: 100000, pnl: 0 },
  { date: "Jan 16", value: 98500, pnl: -1500 },
  { date: "Jan 17", value: 101200, pnl: 1200 },
  { date: "Jan 18", value: 99800, pnl: -200 },
  { date: "Jan 19", value: 102500, pnl: 2500 },
  { date: "Jan 20", value: 101800, pnl: 1800 },
  { date: "Jan 21", value: 103200, pnl: 3200 },
]

// Mock data for strategy distribution
const strategyDistribution = [
  { name: "Long Straddle", value: 35, color: "#8884d8" },
  { name: "Iron Condor", value: 25, color: "#82ca9d" },
  { name: "Bull Call Spread", value: 20, color: "#ffc658" },
  { name: "Bear Put Spread", value: 15, color: "#ff7300" },
  { name: "Others", value: 5, color: "#00ff00" },
]

export default function PositionsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<any>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalDayChange = positions.reduce((sum, pos) => sum + pos.dayChange, 0)
  const totalValue = positions.reduce((sum, pos) => sum + pos.avgPrice * pos.quantity, 0)

  const handleViewAnalytics = useCallback((position: any) => {
    setSelectedPosition(position)
    setShowAnalytics(true)
  }, [])

  const handleSetAlert = useCallback(
    (position: any) => {
      router.push(`/set-alerts?symbol=${position.symbol}&strategy=${position.strategy}`)
    },
    [router],
  )

  const handleAdjustPosition = useCallback(
    (position: any) => {
      router.push(`/position-adjustment?id=${position.id}`)
    },
    [router],
  )

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Positions</h1>
              <p className="text-gray-600 mt-2">Monitor and manage your active trading positions</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{positions.length}</div>
              <p className="text-xs text-muted-foreground">Active positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              {totalPnL >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {((totalPnL / totalValue) * 100).toFixed(2)}% of invested capital
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Day Change</CardTitle>
              {totalDayChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalDayChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalDayChange >= 0 ? "+" : ""}₹{totalDayChange.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Today's change</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(totalValue + totalPnL).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current market value</p>
            </CardContent>
          </Card>
        </div>

        {/* Positions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Positions ({positions.length})</CardTitle>
            <CardDescription>Real-time position tracking with P&L and Greeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Avg Price</TableHead>
                    <TableHead>LTP</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>Day Change</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Badge variant="outline">{position.strategy}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{position.symbol}</TableCell>
                      <TableCell className="text-sm">{position.expiry}</TableCell>
                      <TableCell>{position.quantity}</TableCell>
                      <TableCell>₹{position.avgPrice.toFixed(2)}</TableCell>
                      <TableCell>₹{position.ltp.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`font-medium ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {position.pnl >= 0 ? "+" : ""}₹{position.pnl.toLocaleString()}
                        </div>
                        <div className={`text-xs ${position.pnlPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          ({position.pnlPercent >= 0 ? "+" : ""}
                          {position.pnlPercent.toFixed(2)}%)
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${position.dayChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {position.dayChange >= 0 ? "+" : ""}₹{position.dayChange.toLocaleString()}
                        </div>
                        <div
                          className={`text-xs ${position.dayChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ({position.dayChangePercent >= 0 ? "+" : ""}
                          {position.dayChangePercent.toFixed(2)}%)
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewAnalytics(position)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdjustPosition(position)}>
                              <Settings className="mr-2 h-4 w-4" />
                              Adjust Position
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSetAlert(position)}>
                              <Bell className="mr-2 h-4 w-4" />
                              Set Alert
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Close Position
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dialog */}
        <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedPosition?.strategy} - {selectedPosition?.symbol} Analytics
              </DialogTitle>
              <DialogDescription>
                Comprehensive analysis of your position performance and risk metrics
              </DialogDescription>
            </DialogHeader>

            {selectedPosition && (
              <div className="space-y-6">
                {/* Position Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Current P&L</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`text-xl font-bold ${selectedPosition.pnl >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {selectedPosition.pnl >= 0 ? "+" : ""}₹{selectedPosition.pnl.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">{selectedPosition.pnlPercent.toFixed(2)}% return</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Day Change</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`text-xl font-bold ${selectedPosition.dayChange >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {selectedPosition.dayChange >= 0 ? "+" : ""}₹{selectedPosition.dayChange.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedPosition.dayChangePercent.toFixed(2)}% today
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Position Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">
                        ₹{(selectedPosition.ltp * selectedPosition.quantity).toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Current market value</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Greeks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span>Greeks Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedPosition.greeks.delta}</div>
                        <p className="text-sm text-muted-foreground">Delta</p>
                        <p className="text-xs text-muted-foreground">Price sensitivity</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedPosition.greeks.gamma}</div>
                        <p className="text-sm text-muted-foreground">Gamma</p>
                        <p className="text-xs text-muted-foreground">Delta sensitivity</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{selectedPosition.greeks.theta}</div>
                        <p className="text-sm text-muted-foreground">Theta</p>
                        <p className="text-xs text-muted-foreground">Time decay</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedPosition.greeks.vega}</div>
                        <p className="text-sm text-muted-foreground">Vega</p>
                        <p className="text-xs text-muted-foreground">Volatility sensitivity</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Position Legs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Position Legs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Strike</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Premium Paid</TableHead>
                            <TableHead>Current LTP</TableHead>
                            <TableHead>Leg P&L</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedPosition.legs.map((leg: any, index: number) => {
                            const legPnL = (leg.ltp - leg.premium) * leg.qty
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <Badge variant={leg.type === "CALL" ? "default" : "secondary"}>{leg.type}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">{leg.strike}</TableCell>
                                <TableCell>{leg.qty}</TableCell>
                                <TableCell>₹{leg.premium}</TableCell>
                                <TableCell>₹{leg.ltp}</TableCell>
                                <TableCell>
                                  <span className={`font-medium ${legPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {legPnL >= 0 ? "+" : ""}₹{legPnL.toLocaleString()}
                                  </span>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Chart</CardTitle>
                    <CardDescription>Position P&L over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        pnl: {
                          label: "P&L",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={portfolioData.slice(-7)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="pnl"
                            stroke="var(--color-pnl)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-pnl)" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
