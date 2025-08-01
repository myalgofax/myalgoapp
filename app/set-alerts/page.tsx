"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Bell,
  Plus,
  Settings,
  Target,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  X,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
} from "lucide-react"
import { NotificationHelpers } from "@/components/notification-system"
import { toast } from "@/hooks/use-toast"

const existingAlerts = [
  {
    id: "1",
    type: "Price Alert",
    symbol: "NIFTY",
    condition: "Above 19,800",
    status: "Active",
    triggered: false,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    type: "P&L Alert",
    strategy: "Long Straddle",
    condition: "Profit > 20%",
    status: "Active",
    triggered: false,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    type: "Volume Alert",
    symbol: "BANKNIFTY",
    condition: "Volume > 1M",
    status: "Triggered",
    triggered: true,
    createdAt: "2024-01-13",
  },
]

export default function SetAlertsPage() {
  const [alertType, setAlertType] = useState("price")
  const [symbol, setSymbol] = useState("")
  const [condition, setCondition] = useState("")
  const [value, setValue] = useState("")
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    sound: true,
  })

  const handleCreateAlert = () => {
    if (!symbol || !condition || !value) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to create an alert",
        variant: "destructive",
      })
      return
    }

    // Create the alert
    const newAlert = {
      type: alertType,
      symbol,
      condition,
      value,
      notifications,
    }

    console.log("Creating alert:", newAlert)

    // Show success message
    toast({
      title: "Alert Created",
      description: `${alertType} alert for ${symbol} has been created successfully`,
    })

    // Send notification about alert creation
    NotificationHelpers.systemAlert(`New ${alertType} alert created for ${symbol} - ${condition} ${value}`)

    // Reset form
    setSymbol("")
    setCondition("")
    setValue("")
  }

  const handleDeleteAlert = (alertId: string) => {
    console.log("Deleting alert:", alertId)

    toast({
      title: "Alert Deleted",
      description: "Alert has been deleted successfully",
    })
  }

  const handleTestAlert = (alert: any) => {
    // Simulate alert trigger
    NotificationHelpers.alertTriggered({
      symbol: alert.symbol || alert.strategy,
      condition: alert.condition,
      currentValue: "19,825", // Mock current value
    })

    toast({
      title: "Test Alert Sent",
      description: `Test notification sent for ${alert.symbol || alert.strategy}`,
    })
  }

  return (
    <div className="min-h-full bg-gray-50 py-4 sm:py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Set Alerts</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Create and manage price, P&L, and volume alerts for your positions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Alert Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Alert</span>
                </CardTitle>
                <CardDescription>Set up custom alerts for your trading activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Alert Type</Label>
                  <Select value={alertType} onValueChange={setAlertType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price Alert</SelectItem>
                      <SelectItem value="pnl">P&L Alert</SelectItem>
                      <SelectItem value="volume">Volume Alert</SelectItem>
                      <SelectItem value="volatility">Volatility Alert</SelectItem>
                      <SelectItem value="time">Time-based Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {alertType === "price" && (
                  <>
                    <div className="space-y-2">
                      <Label>Symbol</Label>
                      <Select value={symbol} onValueChange={setSymbol}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select symbol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NIFTY">NIFTY</SelectItem>
                          <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                          <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                          <SelectItem value="TCS">TCS</SelectItem>
                          <SelectItem value="HDFC">HDFC BANK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Condition</Label>
                      <Select value={condition} onValueChange={setCondition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="above">Above</SelectItem>
                          <SelectItem value="below">Below</SelectItem>
                          <SelectItem value="crosses_above">Crosses Above</SelectItem>
                          <SelectItem value="crosses_below">Crosses Below</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Price Value</Label>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {alertType === "pnl" && (
                  <>
                    <div className="space-y-2">
                      <Label>Strategy/Position</Label>
                      <Select value={symbol} onValueChange={setSymbol}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="long-straddle">Long Straddle - NIFTY</SelectItem>
                          <SelectItem value="iron-condor">Iron Condor - BANKNIFTY</SelectItem>
                          <SelectItem value="bull-call">Bull Call Spread - RELIANCE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>P&L Condition</Label>
                      <Select value={condition} onValueChange={setCondition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="profit_above">Profit Above</SelectItem>
                          <SelectItem value="loss_above">Loss Above</SelectItem>
                          <SelectItem value="profit_percent">Profit % Above</SelectItem>
                          <SelectItem value="loss_percent">Loss % Above</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {alertType === "volume" && (
                  <>
                    <div className="space-y-2">
                      <Label>Symbol</Label>
                      <Select value={symbol} onValueChange={setSymbol}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select symbol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NIFTY">NIFTY</SelectItem>
                          <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                          <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Volume Threshold</Label>
                      <Input
                        type="number"
                        placeholder="Enter volume (e.g., 1000000)"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Notification Settings */}
                <div className="space-y-4 pt-4 border-t">
                  <Label className="text-sm font-medium">Notification Methods</Label>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Email</span>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">SMS</span>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Push Notification</span>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Sound Alert</span>
                      </div>
                      <Switch
                        checked={notifications.sound}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sound: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={handleCreateAlert}>
                  <Bell className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Existing Alerts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Active Alerts ({existingAlerts.length})</span>
                </CardTitle>
                <CardDescription>Manage your existing alerts and view their status</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="triggered">Triggered</TabsTrigger>
                    <TabsTrigger value="paused">Paused</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Symbol/Strategy</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {existingAlerts.map((alert) => (
                            <TableRow key={alert.id}>
                              <TableCell>
                                <Badge variant="outline">{alert.type}</Badge>
                              </TableCell>
                              <TableCell className="font-medium">{alert.symbol || alert.strategy}</TableCell>
                              <TableCell>{alert.condition}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {alert.triggered ? (
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  )}
                                  <Badge variant={alert.triggered ? "destructive" : "default"} className="text-xs">
                                    {alert.status}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">{alert.createdAt}</TableCell>
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
                                      <Settings className="mr-2 h-4 w-4" />
                                      Edit Alert
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleTestAlert(alert)}>
                                      <Target className="mr-2 h-4 w-4" />
                                      Test Alert
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleDeleteAlert(alert.id)}
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      Delete Alert
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="active">
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Active Alerts</h3>
                      <p className="text-gray-600">
                        {existingAlerts.filter((alert) => !alert.triggered).length} alerts are currently active
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="triggered">
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Triggered Alerts</h3>
                      <p className="text-gray-600">
                        {existingAlerts.filter((alert) => alert.triggered).length} alerts have been triggered
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="paused">
                    <div className="text-center py-8">
                      <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Paused Alerts</h3>
                      <p className="text-gray-600">No paused alerts at the moment</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{existingAlerts.length}</div>
              <p className="text-xs text-muted-foreground">All time alerts created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {existingAlerts.filter((alert) => !alert.triggered).length}
              </div>
              <p className="text-xs text-muted-foreground">Currently monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Triggered Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {existingAlerts.filter((alert) => alert.triggered).length}
              </div>
              <p className="text-xs text-muted-foreground">Alerts fired today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">85%</div>
              <p className="text-xs text-muted-foreground">Alerts accuracy rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
