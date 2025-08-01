"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  Bell,
  Plus,
  BarChart3,
  Wallet,
  AlertTriangle,
  CheckCircle,
  Zap,
  PieChart as PieChartIcon,
} from "lucide-react"

// Mock data
const portfolioData = [
  { date: "Jan 15", value: 100000, pnl: 0 },
  { date: "Jan 16", value: 98500, pnl: -1500 },
  { date: "Jan 17", value: 101200, pnl: 1200 },
  { date: "Jan 18", value: 99800, pnl: -200 },
  { date: "Jan 19", value: 102500, pnl: 2500 },
  { date: "Jan 20", value: 101800, pnl: 1800 },
  { date: "Jan 21", value: 103200, pnl: 3200 },
]

const recentPositions = [
  {
    id: "POS001",
    strategy: "Long Straddle",
    symbol: "NIFTY",
    pnl: -1050,
    pnlPercent: -9.77,
    status: "Active",
  },
  {
    id: "POS002",
    strategy: "Iron Condor",
    symbol: "BANKNIFTY",
    pnl: 175,
    pnlPercent: 15.56,
    status: "Active",
  },
  {
    id: "POS003",
    strategy: "Bull Call Spread",
    symbol: "RELIANCE",
    pnl: 700,
    pnlPercent: 28.0,
    status: "Active",
  },
]

const marketIndices = [
  { name: "NIFTY 50", value: 19825.35, change: 125.4, changePercent: 0.64 },
  { name: "BANK NIFTY", value: 44567.8, change: -89.25, changePercent: -0.2 },
  { name: "NIFTY IT", value: 31245.6, change: 245.8, changePercent: 0.79 },
  { name: "NIFTY PHARMA", value: 13456.9, change: -45.3, changePercent: -0.34 },
]

const alerts = [
  { id: 1, type: "Price Alert", message: "NIFTY crossed above 19,800", time: "2 min ago", status: "triggered" },
  { id: 2, type: "P&L Alert", message: "Long Straddle profit target reached", time: "15 min ago", status: "active" },
  { id: 3, type: "Volume Alert", message: "BANKNIFTY volume spike detected", time: "1 hour ago", status: "triggered" },
]

const strategyDistribution = [
  { name: "Long Straddle", value: 35, color: "#8884d8" },
  { name: "Iron Condor", value: 25, color: "#82ca9d" },
  { name: "Bull Call Spread", value: 20, color: "#ffc658" },
  { name: "Bear Put Spread", value: 15, color: "#ff7300" },
  { name: "Others", value: 5, color: "#00ff00" },
]

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPortfolioChart, setShowPortfolioChart] = useState(true)
  const [showStrategyChart, setShowStrategyChart] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const totalPnL = recentPositions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalPositions = recentPositions.length
  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const portfolioValue = 103200 // Current portfolio value

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your trading overview</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+3.2% from last week</p>
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
              <p className="text-xs text-muted-foreground">Today's performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPositions}</div>
              <p className="text-xs text-muted-foreground">Across different strategies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Monitoring your positions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Performance Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Portfolio Performance</span>
                  </CardTitle>
                  <CardDescription>Your portfolio value over the last 7 days</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPortfolioChart(!showPortfolioChart)}
                >
                  {showPortfolioChart ? 'Hide Chart' : 'Show Chart'}
                </Button>
              </CardHeader>
              {showPortfolioChart && (
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={portfolioData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis 
                          dataKey="date"
                          tick={{ fill: "#64748b" }}
                          axisLine={{ stroke: "#cbd5e1" }}
                        />
                        <YAxis 
                          tick={{ fill: "#64748b" }}
                          axisLine={{ stroke: "#cbd5e1" }}
                          tickFormatter={(value) => `₹${value.toLocaleString()}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#e2e8f0",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="pnl"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2, r: 4 }}
                          activeDot={{ fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Strategy Distribution Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChartIcon className="h-5 w-5" />
                    <span>Strategy Distribution</span>
                  </CardTitle>
                  <CardDescription>Breakdown of positions by strategy type</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowStrategyChart(!showStrategyChart)}
                >
                  {showStrategyChart ? 'Hide Chart' : 'Show Chart'}
                </Button>
              </CardHeader>
              {showStrategyChart && (
                <CardContent className="flex flex-col items-center">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={strategyDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {strategyDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                    {strategyDistribution.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                        <span className="font-medium ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Recent Positions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>Recent Positions</span>
                  </CardTitle>
                  <CardDescription>Your latest trading positions</CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link href="/positions">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPositions.map((position) => (
                    <div
                      key={position.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <Badge variant="outline">{position.strategy}</Badge>
                        </div>
                        <div>
                          <p className="font-medium">{position.symbol}</p>
                          <p className="text-sm text-muted-foreground">{position.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {position.pnl >= 0 ? "+" : ""}₹{position.pnl.toLocaleString()}
                        </div>
                        <div className={`text-sm ${position.pnlPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {position.pnlPercent >= 0 ? "+" : ""}
                          {position.pnlPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" size="lg">
                  <Link href="/options-strategies" className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Create Options Strategy</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="lg">
                  <Link href="/set-alerts" className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Set Alerts</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="lg">
                  <Link href="/positions" className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>View Positions</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent" size="lg">
                  <Link href="/charts" className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Market Charts</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Recent Alerts</span>
                  </CardTitle>
                  <CardDescription>Latest notifications</CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/set-alerts">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">
                        {alert.status === "triggered" ? (
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{alert.type}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Monthly Progress</span>
                </CardTitle>
                <CardDescription>Your trading goals for January</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profit Target</span>
                    <span>₹3,200 / ₹10,000</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Trades Executed</span>
                    <span>12 / 20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Win Rate</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}