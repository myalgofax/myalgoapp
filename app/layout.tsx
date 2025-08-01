"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ResponsiveNavbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FooterAfterLogin } from "@/components/FooterAfterLogin"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isBrokerConnected, setIsBrokerConnected] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
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

  const noSidebarPages = ["/login", "/register", "/auth"]
  const shouldUseSidebar = !noSidebarPages.some((page) => pathname.startsWith(page))

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="overflow-x-hidden antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {shouldUseSidebar ? (
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
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
