"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  LogOut,
  UserCircle,
  LogIn,
  UserPlus,
  CreditCard,
  TrendingUp,
  HelpCircle,
  LinkIcon,
  CheckCircle,
  AlertTriangle,
  X,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationSystem, type Notification } from "./notification-system"

interface ResponsiveNavbarProps {
  isLoggedIn: boolean
  isBrokerConnected: boolean
  onLogout: () => void
}

export function ResponsiveNavbar({ isLoggedIn, isBrokerConnected, onLogout }: ResponsiveNavbarProps) {
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  const pathname = usePathname()
  const router = useRouter()

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "order_executed",
        title: "Order Executed",
        message: "BUY order for 100 RELIANCE executed at ₹2,456.75",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        read: false,
      },
      {
        id: "2",
        type: "alert_triggered",
        title: "Price Alert Triggered",
        message: "NIFTY crossed above 19,800 - Current: ₹19,825",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
      },
      {
        id: "3",
        type: "position_update",
        title: "Position Update",
        message: "Long Straddle P&L: +₹12,500 (+15.2%)",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        read: true,
      },
    ]
    setNotifications(mockNotifications)
    setNotificationCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    setNotificationCount((prev) => Math.max(0, prev - 1))
  }

  const removeNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    const notification = notifications.find((n) => n.id === notificationId)
    if (notification && !notification.read) {
      setNotificationCount((prev) => Math.max(0, prev - 1))
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order_executed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "alert_triggered":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "position_update":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <>
      <NotificationSystem onNotificationCountChange={setNotificationCount} />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
     
        <div className="w-full px-4 sm:px-6 lg:px-8 flex h-14 items-center">

          <div className="mr-4 hidden md:flex">
            <SidebarTrigger className="-ml-1" />
          </div>

          {/* Mobile sidebar trigger */}
          <div className="mr-4 md:hidden">
            <SidebarTrigger className="-ml-1" />
          </div>

          {/* Logo - visible on mobile when sidebar is collapsed */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-lg">My AlgoFax</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-between flex-wrap space-x-2 md:justify-end">
            {/* Broker Connection Status - Desktop */}
            {isLoggedIn && !isBrokerConnected && (
              <Button
                size="sm"
                onClick={() => router.push("/broker-setup")}
                className="hidden md:flex items-center space-x-1 bg-orange-500 hover:bg-orange-600"
              >
                <LinkIcon className="h-3 w-3" />
                <span className="text-xs">Connect Broker</span>
              </Button>
            )}

            <div className="flex items-center space-x-2">
              {/* Notifications Bell */}
              {isLoggedIn && isBrokerConnected && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-8 w-8">
                      <Bell className="h-4 w-4" />
                      {notificationCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent align="end" className="w-80 max-w-[90vw] max-h-96 overflow-y-auto">

                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notifications</span>
                      {notifications.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => {
                            setNotifications([])
                            setNotificationCount(0)
                          }}
                        >
                          Clear All
                        </Button>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="flex items-start space-x-3 p-3 cursor-pointer hover:bg-muted/50"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p
                                  className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatTimeAgo(notification.timestamp)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full"></div>}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-destructive/10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notification.id)
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* User Dropdown */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback className="text-xs">JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {isBrokerConnected ? (
                            <Badge variant="default" className="text-xs">
                              Zerodha Connected
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              No Broker
                            </Badge>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!isBrokerConnected && (
                      <>
                        <DropdownMenuItem
                          className="text-sm text-orange-600"
                          onClick={() => router.push("/broker-setup")}
                        >
                          <LinkIcon className="mr-2 h-4 w-4" />
                          <span>Connect Broker</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem className="text-sm">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile & Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing & Plans</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-sm text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
