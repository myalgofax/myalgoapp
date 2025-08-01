"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

export interface Notification {
  id: string
  type: "order_executed" | "order_cancelled" | "alert_triggered" | "position_update" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  data?: any
}

interface NotificationSystemProps {
  onNotificationCountChange?: (count: number) => void
}

export function NotificationSystem({ onNotificationCountChange }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [permission, setPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    // Request notification permission on mount
    if ("Notification" in window) {
      setPermission(Notification.permission)
      if (Notification.permission === "default") {
        Notification.requestPermission().then((perm) => {
          setPermission(perm)
        })
      }
    }
  }, [])

  useEffect(() => {
    // Update notification count
    const unreadCount = notifications.filter((n) => !n.read).length
    onNotificationCountChange?.(unreadCount)
  }, [notifications, onNotificationCountChange])

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev])

      // Show browser notification if permission granted
      if (permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/favicon.ico",
          tag: newNotification.id,
        })
      }

      // Show toast notification
      toast({
        title: notification.title,
        description: notification.message,
        duration: 5000,
      })

      return newNotification.id
    },
    [permission],
  )

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }, [])

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  // Expose methods globally for other components to use
  useEffect(() => {
    ;(window as any).notificationSystem = {
      addNotification,
      markAsRead,
      removeNotification,
      clearAllNotifications,
    }
  }, [addNotification, markAsRead, removeNotification, clearAllNotifications])

  return null // This component doesn't render anything visible
}

// Helper functions for different types of notifications
export const NotificationHelpers = {
  orderExecuted: (orderData: any) => {
    const notification = {
      type: "order_executed" as const,
      title: "Order Executed",
      message: `${orderData.type} order for ${orderData.quantity} ${orderData.symbol} executed at ₹${orderData.price}`,
      data: orderData,
    }

    if ((window as any).notificationSystem) {
      ;(window as any).notificationSystem.addNotification(notification)
    }
  },

  orderCancelled: (orderData: any) => {
    const notification = {
      type: "order_cancelled" as const,
      title: "Order Cancelled",
      message: `${orderData.type} order for ${orderData.quantity} ${orderData.symbol} has been cancelled`,
      data: orderData,
    }

    if ((window as any).notificationSystem) {
      ;(window as any).notificationSystem.addNotification(notification)
    }
  },

  alertTriggered: (alertData: any) => {
    const notification = {
      type: "alert_triggered" as const,
      title: "Alert Triggered",
      message: `${alertData.symbol} ${alertData.condition} - Current: ₹${alertData.currentValue}`,
      data: alertData,
    }

    if ((window as any).notificationSystem) {
      ;(window as any).notificationSystem.addNotification(notification)
    }
  },

  positionUpdate: (positionData: any) => {
    const notification = {
      type: "position_update" as const,
      title: "Position Update",
      message: `${positionData.strategy} P&L: ${positionData.pnl > 0 ? "+" : ""}₹${positionData.pnl.toLocaleString()}`,
      data: positionData,
    }

    if ((window as any).notificationSystem) {
      ;(window as any).notificationSystem.addNotification(notification)
    }
  },

  systemAlert: (message: string) => {
    const notification = {
      type: "system" as const,
      title: "System Alert",
      message,
      data: null,
    }

    if ((window as any).notificationSystem) {
      ;(window as any).notificationSystem.addNotification(notification)
    }
  },
}
