"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Play, Pause, Settings, BarChart3, Target, DollarSign, Zap } from "lucide-react"

const strategies = [
  {
    id: "momentum-breakout",
    name: "Momentum Breakout",
    description: "Captures price breakouts with strong volume confirmation",
    category: "Momentum",
    risk: "Medium",
    returns: "+24.5%",
    winRate: "68%",
    active: true,
    capital: 50000,
    positions: 3,
    pnl: 12250,
    status: "running",
  },
  {
    id: "mean-reversion",
    name: "Mean Reversion",
    description: "Trades oversold/overbought conditions in range-bound markets",
    category: "Statistical",
    risk: "Low",
    returns: "+18.2%",
    winRate: "72%",
    active: false,
    capital: 30000,
    positions: 0,
    pnl: 5460,
    status: "stopped",
  },
  {
    id: "pairs-trading",
    name: "Pairs Trading",
    description: "Market neutral strategy trading correlated stock pairs",
    category: "Arbitrage",
    risk: "Low",
    returns: "+15.8%",
    winRate: "75%",
    active: true,
    capital: 75000,
    positions: 4,
    pnl: 11850,
    status: "running",
  },
  {
    id: "volatility-capture",
    name: "Volatility Capture",
    description: "Profits from high volatility periods using options strategies",
    category: "Options",
    risk: "High",
    returns: "+32.1%",
    winRate: "58%",
    active: true,
    capital: 100000,
    positions: 6,
    pnl: 32100,
    status: "running",
  },
  {
    id: "sector-rotation",
    name: "Sector Rotation",
    description: "Rotates between sectors based on economic indicators",
    category: "Macro",
    risk: "Medium",
    returns: "+21.3%",
    winRate: "65%",
    active: false,
    capital: 60000,
    positions: 0,
    pnl: 12780,
    status: "paused",
  },
  {
    id: "earnings-momentum",
    name: "Earnings Momentum",
    description: "Trades stocks with strong earnings surprises and guidance",
    category: "Fundamental",
    risk: "Medium",
    returns: "+28.7%",
    winRate: "62%",
    active: true,
    capital: 40000,
    positions: 2,
    pnl: 11480,
    status: "running",
  },
]

export default function StrategiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [strategies_state, setStrategies] = useState(strategies)

  const toggleStrategy = (id: string) => {
    setStrategies((prev) =>
      prev.map((strategy) =>
        strategy.id === id
          ? {
              ...strategy,
              active: !strategy.active,
              status: !strategy.active ? "running" : "stopped",
            }
          : strategy,
      ),
    )
  }

  const filteredStrategies =
    selectedCategory === "all"
      ? strategies_state
      : strategies_state.filter((s) => s.category.toLowerCase() === selectedCategory)

  const activeStrategies = strategies_state.filter((s) => s.active).length
  const totalPnL = strategies_state.reduce((sum, s) => sum + s.pnl, 0)
  const totalCapital = strategies_state.reduce((sum, s) => sum + s.capital, 0)

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trading Strategies</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your algorithmic trading strategies</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStrategies}</div>
              <p className="text-xs text-muted-foreground">{strategies_state.length - activeStrategies} paused</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalPnL.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{((totalPnL / totalCapital) * 100).toFixed(1)}%</span> overall
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capital Deployed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalCapital.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {strategies_state.length} strategies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Win Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">66.7%</div>
              <Progress value={66.7} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="momentum">Momentum</SelectItem>
              <SelectItem value="statistical">Statistical</SelectItem>
              <SelectItem value="arbitrage">Arbitrage</SelectItem>
              <SelectItem value="options">Options</SelectItem>
              <SelectItem value="macro">Macro</SelectItem>
              <SelectItem value="fundamental">Fundamental</SelectItem>
            </SelectContent>
          </Select>

          <Button className="sm:ml-auto">
            <Zap className="h-4 w-4 mr-2" />
            Create New Strategy
          </Button>
        </div>

        {/* Strategies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStrategies.map((strategy) => (
            <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <CardDescription className="mt-1">{strategy.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={strategy.active ? "default" : "secondary"}>{strategy.status}</Badge>
                    <Switch checked={strategy.active} onCheckedChange={() => toggleStrategy(strategy.id)} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Strategy Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <Badge variant="outline">{strategy.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <Badge
                        variant={
                          strategy.risk === "Low" ? "default" : strategy.risk === "Medium" ? "secondary" : "destructive"
                        }
                      >
                        {strategy.risk}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Returns</span>
                      <span className="text-sm font-medium text-green-600">{strategy.returns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Win Rate</span>
                      <span className="text-sm font-medium">{strategy.winRate}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Capital Allocated</span>
                    <span className="text-sm">₹{strategy.capital.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current P&L</span>
                    <span className={`text-sm font-medium ${strategy.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {strategy.pnl >= 0 ? "+" : ""}₹{strategy.pnl.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Positions</span>
                    <span className="text-sm">{strategy.positions}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  {strategy.active ? (
                    <Button variant="outline" size="sm" onClick={() => toggleStrategy(strategy.id)}>
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => toggleStrategy(strategy.id)}>
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Strategy Builder CTA */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Build Custom Strategy</h3>
                <p className="text-blue-700 mt-1">
                  Create your own algorithmic trading strategy with our visual builder
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Strategy Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
