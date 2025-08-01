"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { ResponsiveNavbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import logo from "@/asset/logo512-bg-remove.png";
import { FooterAfterLogin } from "@/components/FooterAfterLogin";
import { getAuthToken, removeAuthToken } from "@/utils/authToken";

// Define route constants
const PUBLIC_ROUTES = ["/", "/login", "/register", "/auth"];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/user-dashboard",
  "/strategies",
  "/charts",
  "/options",
  "/options-strategies",
  "/watchlist",
  "/positions",
  "/orders",
  "/set-alerts",
  "/position-adjustment",
];
const DEFAULT_AUTH_ROUTE = "/user-dashboard";
const DEFAULT_UNAUTH_ROUTE = "/login";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBrokerConnected, setIsBrokerConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    checkAuthStatus();
  }, [pathname]);

const checkAuthStatus = async () => {
    try {
      const authToken = await getAuthToken();
      const loggedIn = !!authToken;
      setIsLoggedIn(loggedIn);
      
      const isPublicRoute = PUBLIC_ROUTES.some(route => pathname?.startsWith(route));
      const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname?.startsWith(route));
debugger
      setIsBrokerConnected(loggedIn && isProtectedRoute);
      
      // Only redirect if absolutely necessary
      if (!loggedIn && isProtectedRoute) {
        // Redirect to login but preserve intended destination
        router.push(`${DEFAULT_UNAUTH_ROUTE}?redirect=${encodeURIComponent(pathname || DEFAULT_AUTH_ROUTE)}`);
      } else if (loggedIn && isPublicRoute && pathname !== "/") {
        // Don't redirect if already on a public route
        // Only redirect from auth pages to dashboard
        if (["/login", "/register", "/auth"].some(route => pathname?.startsWith(route))) {
          router.push(DEFAULT_AUTH_ROUTE);
        }
      } else if (loggedIn && pathname === "/") {
        if(isBrokerConnected){
          router.push("/dashboard");
        }else{
          router.push(DEFAULT_AUTH_ROUTE);
        }
        
      } 
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    setIsBrokerConnected(false);
    router.push(DEFAULT_UNAUTH_ROUTE);
  };

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route);

  if (isPublicRoute) {
    return (
      <SidebarProvider>
        <div className="flex flex-col min-h-screen">
          <ResponsiveNavbar
            logo={logo}
            isPublic={isPublicRoute}
            isLoggedIn={isLoggedIn}
            isBrokerConnected={isBrokerConnected}
            onLogout={handleLogout}
          />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar
        isLoggedIn={isLoggedIn}
        isBrokerConnected={isBrokerConnected}
      />
      <SidebarInset>
        <ResponsiveNavbar
          logo={logo}
          isPublic={false}
          isLoggedIn={isLoggedIn}
          isBrokerConnected={isBrokerConnected}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <FooterAfterLogin />
      </SidebarInset>
    </SidebarProvider>
  );
}