"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle, Clock, X, MoreHorizontal, RefreshCw, Filter, Download, AlertCircle } from "lucide-react"
import { NotificationHelpers } from "@/components/notification-system"
import { toast } from "@/hooks/use-toast"

const orders = [
  {
    id: "ORD001",
    symbol: "RELIANCE",
    type: "BUY",
    quantity: 100,
    price: 2450.0,
    triggerPrice: null,
    orderType: "MARKET",
    status: "EXECUTED",
    executedQty: 100,
    executedPrice: 2456.75,
    time: "2024-01-18 10:30:45",
    validity: "DAY",
  },
  {
    id: "ORD002",
    symbol: "TCS",
    type: "SELL",
    quantity: 25,
    price: 3680.0,
    triggerPrice: null,
    orderType: "LIMIT",
    status: "PENDING",
    executedQty: 0,
    executedPrice: null,
    time: "2024-01-18 11:15:22",
    validity: "DAY",
  },
  {
    id: "ORD003",
    symbol: "HDFC BANK",
    type: "BUY",
    quantity: 50,
    price: 1630.0,
    triggerPrice: 1635.0,
    orderType: "SL",
    status: "TRIGGERED",
    executedQty: 50,
    executedPrice: 1634.25,
    time: "2024-01-18 12:45:18",
    validity: "DAY",
  },
  {
    id: "ORD004",
    symbol: "NIFTY 19650 CE",
    type: "BUY",
    quantity: 25,
    price: 120.0,
    triggerPrice: null,
    orderType: "LIMIT",
    status: "CANCELLED",
    executedQty: 0,
    executedPrice: null,
    time: "2024-01-18 13:20:10",
    validity: "DAY",
  },
  {
    id: "ORD005",
    symbol: "INFY",
    type: "SELL",
    quantity: 75,
    price: 1460.0,
    triggerPrice: null,
    orderType: "MARKET",
    status: "EXECUTED",
    executedQty: 75,
    executedPrice: 1456.8,
    time: "2024-01-18 14:10:33",
    validity: "DAY",
  },
  {
    id: "ORD006",
    symbol: "BANKNIFTY 44500 PE",
    type: "BUY",
    quantity: 50,
    price: 90.0,
    triggerPrice: null,
    orderType: "LIMIT",
    status: "PARTIALLY_EXECUTED",
    executedQty: 25,
    executedPrice: 89.75,
    time: "2024-01-18 15:30:15",
    validity: "DAY",
  },
]

const orderHistory = [
  {
    id: "ORD007",
    symbol: "WIPRO",
    type: "BUY",
    quantity: 200,
    price: 456.3,
    orderType: "MARKET",
    status: "EXECUTED",
    executedQty: 200,
    executedPrice: 456.3,
    time: "2024-01-17 10:15:30",
    validity: "DAY",
  },
  {
    id: "ORD008",
    symbol: "MARUTI",
    type: "BUY",
    quantity: 25,
    price: 9876.5,
    orderType: "LIMIT",
    status: "EXECUTED",
    executedQty: 25,
    executedPrice: 9876.5,
    time: "2024-01-16 14:20:45",
    validity: "DAY",
  },
  {
    id: "ORD009",
    symbol: "ASIANPAINT",
    type: "BUY",
    quantity: 30,
    price: 3245.8,
    orderType: "MARKET",
    status: "EXECUTED",
    executedQty: 30,
    executedPrice: 3245.8,
    time: "2024-01-15 11:45:12",
    validity: "DAY",
  },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("today")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const handleCancelOrder = (order: any) => {
    // Simulate order cancellation
    toast({
      title: "Order Cancelled",
      description: `${order.type} order for ${order.quantity} ${order.symbol} has been cancelled`,
    })

    // Send push notification
    NotificationHelpers.orderCancelled({
      id: order.id,
      symbol: order.symbol,
      type: order.type,
      quantity: order.quantity,
      price: order.price,
    })
  }

  const handleModifyOrder = (order: any) => {
    toast({
      title: "Order Modified",
      description: `Order ${order.id} has been modified successfully`,
    })
  }

  const simulateOrderExecution = (order: any) => {
    // Simulate order execution
    toast({
      title: "Order Executed",
      description: `${order.type} order for ${order.quantity} ${order.symbol} executed at ₹${order.executedPrice || order.price}`,
    })

    // Send push notification
    NotificationHelpers.orderExecuted({
      id: order.id,
      symbol: order.symbol,
      type: order.type,
      quantity: order.quantity,
      price: order.executedPrice || order.price,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "EXECUTED":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Executed
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      case "TRIGGERED":
        return (
          <Badge className="bg-blue-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            Triggered
          </Badge>
        )
      case "PARTIALLY_EXECUTED":
        return (
          <Badge className="bg-orange-500">
            <Clock className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getOrderTypeBadge = (type: string) => {
    const colors = {
      MARKET: "bg-blue-500",
      LIMIT: "bg-purple-500",
      SL: "bg-orange-500",
      "SL-M": "bg-red-500",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-500"}>{type}</Badge>
  }

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false
    if (typeFilter !== "all" && order.type !== typeFilter) return false
    return true
  })

  const todayStats = {
    total: orders.length,
    executed: orders.filter((o) => o.status === "EXECUTED").length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  }

  return (
    <div className="min-h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Book</h1>
              <p className="text-gray-600 mt-2">Track and manage your trading orders</p>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="today">Today's Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Today's Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.total}</div>
                  <p className="text-xs text-muted-foreground">Today's orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Executed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{todayStats.executed}</div>
                  <p className="text-xs text-muted-foreground">Successfully executed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{todayStats.pending}</div>
                  <p className="text-xs text-muted-foreground">Awaiting execution</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                  <X className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{todayStats.cancelled}</div>
                  <p className="text-xs text-muted-foreground">Cancelled orders</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filters:</span>
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="EXECUTED">Executed</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      <SelectItem value="TRIGGERED">Triggered</SelectItem>
                      <SelectItem value="PARTIALLY_EXECUTED">Partial</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="BUY">Buy</SelectItem>
                      <SelectItem value="SELL">Sell</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatusFilter("all")
                      setTypeFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Orders ({filteredOrders.length})</CardTitle>
                <CardDescription>Real-time order status and execution details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Executed</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell className="font-medium">{order.symbol}</TableCell>
                          <TableCell>
                            <Badge variant={order.type === "BUY" ? "default" : "destructive"}>{order.type}</Badge>
                          </TableCell>
                          <TableCell>{getOrderTypeBadge(order.orderType)}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            <div>
                              <div>₹{order.price.toLocaleString()}</div>
                              {order.triggerPrice && (
                                <div className="text-xs text-muted-foreground">
                                  Trigger: ₹{order.triggerPrice.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div>
                              <div>
                                {order.executedQty}/{order.quantity}
                              </div>
                              {order.executedPrice && (
                                <div className="text-xs text-muted-foreground">
                                  @ ₹{order.executedPrice.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{new Date(order.time).toLocaleTimeString()}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                {order.status === "PENDING" && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleModifyOrder(order)}>
                                      Modify Order
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleCancelOrder(order)}>
                                      Cancel Order
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}
                                {order.status === "EXECUTED" && (
                                  <>
                                    <DropdownMenuItem onClick={() => simulateOrderExecution(order)}>
                                      Simulate Execution
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}
                                <DropdownMenuItem>View Details</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Historical order data and execution records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Executed Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell className="text-sm">{new Date(order.time).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{order.symbol}</TableCell>
                          <TableCell>
                            <Badge variant={order.type === "BUY" ? "default" : "destructive"}>{order.type}</Badge>
                          </TableCell>
                          <TableCell>{getOrderTypeBadge(order.orderType)}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>₹{order.price.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="font-medium">₹{order.executedPrice?.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
