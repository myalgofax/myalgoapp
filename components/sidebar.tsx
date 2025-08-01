"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Home,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Star,
  Wallet,
  History,
  Bell,
  Settings,
  HelpCircle,
  CreditCard,
  LinkIcon,
  Phone,
  CandlestickChartIcon as Candlestick,
  Activity,
} from "lucide-react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isLoggedIn: boolean
  isBrokerConnected: boolean
}

export function AppSidebar({ isLoggedIn, isBrokerConnected, ...props }: AppSidebarProps) {
  const pathname = usePathname()

  const publicNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  const tradingNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { name: "Strategies", href: "/strategies", icon: BarChart3 },
    { name: "Charts", href: "/charts", icon: Candlestick },
    { name: "Options", href: "/options", icon: Target },
    { name: "Options Strategies", href: "/options-strategies", icon: Zap },
    { name: "Watchlist", href: "/watchlist", icon: Star },
    { name: "Positions", href: "/positions", icon: Wallet },
    { name: "Orders", href: "/orders", icon: History },
    { name: "Set Alerts", href: "/set-alerts", icon: Bell },
    { name: "Position Adjustment", href: "/position-adjustment", icon: Activity },
  ]

  const accountNavItems = [
    { name: "Account Settings", href: "/settings", icon: Settings },
    { name: "Billing & Plans", href: "/billing", icon: CreditCard },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ]

  const getVisibleNavItems = () => {
    let items = [...publicNavItems]

    if (isLoggedIn && isBrokerConnected) {
      items = [...items, ...tradingNavItems]
    }

    if (isLoggedIn) {
      items = [...items, ...accountNavItems]
    }

    return items
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-bold">A</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">My AlgoFax</span>
                  <span className="truncate text-xs">Trading Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Public Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Trading Navigation - Only show if logged in and broker connected */}
        {isLoggedIn && isBrokerConnected && (
          <SidebarGroup>
            <SidebarGroupLabel>Trading</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tradingNavItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Account Navigation - Only show if logged in */}
        {isLoggedIn && (
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountNavItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoggedIn && !isBrokerConnected && (
              <SidebarMenuButton asChild>
                <Link href="/broker-setup" className="text-orange-600">
                  <LinkIcon />
                  <span>Connect Broker</span>
                  <Badge variant="secondary" className="ml-auto">
                    Required
                  </Badge>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
