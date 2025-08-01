"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BarChart3, CandlestickChartIcon as Candlestick, Activity, Volume2, Plus, Star } from "lucide-react"

const indices = [
  { name: "NIFTY 50", value: "19,674.25", change: "+234.50", changePercent: "+1.21%", trend: "up" },
  { name: "SENSEX", value: "65,953.48", change: "+789.25", changePercent: "+1.21%", trend: "up" },
  { name: "NIFTY BANK", value: "44,234.75", change: "-123.45", changePercent: "-0.28%", trend: "down" },
  { name: "NIFTY IT", value: "31,456.80", change: "+456.30", changePercent: "+1.47%", trend: "up" },
  { name: "NIFTY AUTO", value: "15,678.90", change: "+89.45", changePercent: "+0.57%", trend: "up" },
  { name: "NIFTY PHARMA", value: "13,234.55", change: "-67.25", changePercent: "-0.51%", trend: "down" },
]

const topStocks = [
  { symbol: "RELIANCE", price: "2,456.75", change: "+45.30", changePercent: "+1.88%", trend: "up", volume: "2.3M" },
  { symbol: "TCS", price: "3,678.90", change: "+67.45", changePercent: "+1.87%", trend: "up", volume: "1.8M" },
  { symbol: "HDFC BANK", price: "1,634.25", change: "-23.45", changePercent: "-1.41%", trend: "down", volume: "3.1M" },
  { symbol: "INFY", price: "1,456.80", change: "+34.55", changePercent: "+2.43%", trend: "up", volume: "2.7M" },
  { symbol: "ICICI BANK", price: "945.60", change: "+12.35", changePercent: "+1.32%", trend: "up", volume: "4.2M" },
  { symbol: "BHARTI AIRTEL", price: "876.45", change: "-8.90", changePercent: "-1.00%", trend: "down", volume: "1.9M" },
]

const chartTypes = [
  { id: "candlestick", name: "Candlestick", icon: Candlestick },
  { id: "line", name: "Line Chart", icon: Activity },
  { id: "bar", name: "Bar Chart", icon: BarChart3 },
  { id: "volume", name: "Volume", icon: Volume2 },
]

const timeframes = [
  { id: "1m", name: "1M" },
  { id: "5m", name: "5M" },
  { id: "15m", name: "15M" },
  { id: "1h", name: "1H" },
  { id: "1d", name: "1D" },
  { id: "1w", name: "1W" },
]

export default function ChartsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d")
  const [selectedChartType, setSelectedChartType] = useState("candlestick")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trading Charts</h1>
          <p className="text-gray-600 mt-2">Advanced charting and technical analysis tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Market Indices */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Indices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {indices.map((index) => (
                  <div
                    key={index.name}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm">{index.name}</p>
                      <p className="text-xs text-muted-foreground">{index.value}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${index.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {index.change}
                      </p>
                      <p className={`text-xs ${index.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {index.changePercent}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Movers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Movers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer ${selectedSymbol === stock.symbol ? "bg-blue-50 border border-blue-200" : ""}`}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                  >
                    <div>
                      <p className="font-medium text-sm">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">Vol: {stock.volume}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{stock.price}</p>
                      <p className={`text-xs ${stock.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stock.changePercent}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chart Controls */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedSymbol}</CardTitle>
                    <CardDescription>Real-time price chart with technical indicators</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Watchlist
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Alert
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {/* Timeframe Selection */}
                  <div className="flex items-center space-x-1">
                    {timeframes.map((tf) => (
                      <Button
                        key={tf.id}
                        variant={selectedTimeframe === tf.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeframe(tf.id)}
                      >
                        {tf.name}
                      </Button>
                    ))}
                  </div>

                  {/* Chart Type Selection */}
                  <div className="flex items-center space-x-1">
                    {chartTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedChartType === type.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChartType(type.id)}
                      >
                        <type.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-white border rounded-lg p-6 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">TradingView Chart</h3>
                    <p className="text-gray-600 mb-4">
                      Interactive {selectedSymbol} chart with {selectedTimeframe} timeframe
                    </p>
                    <Badge variant="secondary">
                      Chart Type: {chartTypes.find((t) => t.id === selectedChartType)?.name}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">RSI (14)</span>
                    <Badge variant="secondary">67.45</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">MACD</span>
                    <Badge variant="default">Bullish</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Moving Avg (20)</span>
                    <Badge variant="secondary">₹2,398.50</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bollinger Bands</span>
                    <Badge variant="outline">Neutral</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Volume</span>
                    <Badge variant="default">Above Average</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Price Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resistance 1</span>
                    <span className="text-sm font-medium text-red-600">₹2,485.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resistance 2</span>
                    <span className="text-sm font-medium text-red-600">₹2,520.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Price</span>
                    <span className="text-sm font-bold">₹2,456.75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support 1</span>
                    <span className="text-sm font-medium text-green-600">₹2,420.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support 2</span>
                    <span className="text-sm font-medium text-green-600">₹2,385.00</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
