"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Star,
  MoreHorizontal,
  Bell,
  ShoppingCart,
  Trash2,
  BarChart3,
  RefreshCw,
} from "lucide-react"

const watchlistData = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2456.75,
    change: 45.3,
    changePercent: 1.88,
    volume: "2.3M",
    marketCap: "16.6L Cr",
    pe: 24.5,
    trend: "up",
    alerts: 2,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3678.9,
    change: 67.45,
    changePercent: 1.87,
    volume: "1.8M",
    marketCap: "13.4L Cr",
    pe: 28.3,
    trend: "up",
    alerts: 1,
  },
  {
    symbol: "HDFC BANK",
    name: "HDFC Bank Limited",
    price: 1634.25,
    change: -23.45,
    changePercent: -1.41,
    volume: "3.1M",
    marketCap: "12.1L Cr",
    pe: 18.7,
    trend: "down",
    alerts: 0,
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1456.8,
    change: 34.55,
    changePercent: 2.43,
    volume: "2.7M",
    marketCap: "6.1L Cr",
    pe: 26.8,
    trend: "up",
    alerts: 3,
  },
  {
    symbol: "ICICI BANK",
    name: "ICICI Bank Limited",
    price: 945.6,
    change: 12.35,
    changePercent: 1.32,
    volume: "4.2M",
    marketCap: "6.6L Cr",
    pe: 15.2,
    trend: "up",
    alerts: 1,
  },
  {
    symbol: "BHARTI AIRTEL",
    name: "Bharti Airtel Limited",
    price: 876.45,
    change: -8.9,
    changePercent: -1.0,
    volume: "1.9M",
    marketCap: "4.8L Cr",
    pe: 22.1,
    trend: "down",
    alerts: 0,
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    price: 456.3,
    change: 8.75,
    changePercent: 1.95,
    volume: "5.1M",
    marketCap: "5.7L Cr",
    pe: 31.4,
    trend: "up",
    alerts: 2,
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 598.2,
    change: -12.8,
    changePercent: -2.1,
    volume: "6.8M",
    marketCap: "5.3L Cr",
    pe: 12.8,
    trend: "down",
    alerts: 1,
  },
]

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [watchlist, setWatchlist] = useState(watchlistData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
  }

  const totalGainers = watchlist.filter((item) => item.change > 0).length
  const totalLosers = watchlist.filter((item) => item.change < 0).length
  const totalAlerts = watchlist.reduce((sum, item) => sum + item.alerts, 0)

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
              <p className="text-gray-600 mt-2">Track your favorite stocks and get real-time updates</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stock
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Stock to Watchlist</DialogTitle>
                    <DialogDescription>Search and add stocks to your watchlist for tracking</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search stocks (e.g., AAPL, TSLA, NIFTY)" className="pl-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Popular Stocks</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "META"].map((symbol) => (
                          <Button key={symbol} variant="outline" size="sm" className="justify-start bg-transparent">
                            <Plus className="h-3 w-3 mr-2" />
                            {symbol}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{watchlist.length}</div>
              <p className="text-xs text-muted-foreground">In your watchlist</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gainers</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalGainers}</div>
              <p className="text-xs text-muted-foreground">Stocks in green</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Losers</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalLosers}</div>
              <p className="text-xs text-muted-foreground">Stocks in red</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAlerts}</div>
              <p className="text-xs text-muted-foreground">Price alerts set</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your watchlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Watchlist Table */}
        <Card>
          <CardHeader>
            <CardTitle>Watchlist ({watchlist.length} stocks)</CardTitle>
            <CardDescription>Real-time prices and market data for your tracked stocks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Change %</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>P/E</TableHead>
                    <TableHead>Alerts</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {watchlist
                    .filter(
                      (stock) =>
                        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((stock) => (
                      <TableRow key={stock.symbol} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">₹{stock.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {stock.change >= 0 ? "+" : ""}₹{Math.abs(stock.change)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {stock.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`${stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{stock.volume}</TableCell>
                        <TableCell>{stock.marketCap}</TableCell>
                        <TableCell>{stock.pe}</TableCell>
                        <TableCell>
                          {stock.alerts > 0 ? (
                            <Badge variant="secondary" className="flex items-center space-x-1">
                              <Bell className="h-3 w-3" />
                              <span>{stock.alerts}</span>
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
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
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Chart
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buy/Sell
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bell className="mr-2 h-4 w-4" />
                                Set Alert
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => removeFromWatchlist(stock.symbol)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
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
      </div>
    </div>
  )
}
