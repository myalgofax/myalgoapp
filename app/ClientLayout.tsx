"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ResponsiveNavbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FooterAfterLogin } from "@/components/FooterAfterLogin"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isBrokerConnected, setIsBrokerConnected] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
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
    setIsBrokerConnected(tradingPages.includes(pathname || ""))
  }, [pathname])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsBrokerConnected(false)
    router.push("/")
  }

  const noSidebarPages = ["/login", "/register", "/auth"]
  const shouldUseSidebar = isMounted && !noSidebarPages.some((page) => pathname?.startsWith(page))

  if (!isMounted) return null

  return shouldUseSidebar ? (
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
  ) : (
    <div className="flex flex-col min-h-screen">
      <ResponsiveNavbar isLoggedIn={isLoggedIn} isBrokerConnected={isBrokerConnected} onLogout={handleLogout} />
      <main className="flex-1">
        <div className="min-h-full">{children}</div>
      </main>
      {isLoggedIn ? <FooterAfterLogin /> : <Footer />}
    </div>
  )
}
