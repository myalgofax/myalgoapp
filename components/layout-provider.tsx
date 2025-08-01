"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ResponsiveNavbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FooterAfterLogin } from "@/components/FooterAfterLogin"

interface AppLayoutProviderProps {
  children: React.ReactNode
}

export function AppLayoutProvider({ children }: AppLayoutProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Auto-logged in for demo
  const [isBrokerConnected, setIsBrokerConnected] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Show broker connected state for trading pages
    const tradingPages = [
      "/dashboard",
      "/strategies",
      "/charts",
      "/options",
      "/options-strategies",
      "/watchlist",
      "/positions",
      "/orders",
      "/set-alerts",
      "/position-adjustment",
    ]
    setIsBrokerConnected(tradingPages.includes(pathname))
  }, [pathname])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsBrokerConnected(false)
    router.push("/")
  }

  // Pages that should not use the sidebar layout
  const noSidebarPages = ["/login", "/register", "/auth"]
  const shouldUseSidebar = !noSidebarPages.some((page) => pathname.startsWith(page))

  if (!shouldUseSidebar) {
    // Simple layout for auth pages
    return (
      <div className="flex flex-col min-h-screen">
        <ResponsiveNavbar isLoggedIn={isLoggedIn} isBrokerConnected={isBrokerConnected} onLogout={handleLogout} />
        <main className="flex-1">
          <div className="min-h-full">{children}</div>
        </main>
        {isLoggedIn ? <FooterAfterLogin /> : <Footer />}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar isLoggedIn={isLoggedIn} isBrokerConnected={isBrokerConnected} />
      <SidebarInset>
        <ResponsiveNavbar isLoggedIn={isLoggedIn} isBrokerConnected={isBrokerConnected} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">{children}</div>
        </main>
        {isLoggedIn ? <FooterAfterLogin /> : <Footer />}
      </SidebarInset>
    </SidebarProvider>
  )
}
