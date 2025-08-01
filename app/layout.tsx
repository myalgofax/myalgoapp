// app/layout.tsx
import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import { ClientLayout } from "./ClientLayout"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers"

export const metadata = {
  title: "MyAlgoFax",
  description: "Trading Platform",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Check authentication status on server
  const cookieStore = await  cookies()
  const authToken =   cookieStore.get('authToken')?.value
  const headersList = await  headers()
  const pathname = headersList.get('x-next-pathname') || '/'

  // If user is logged in and trying to access root, redirect to dashboard
  if (authToken && pathname === '/') {
      console.log("authToken:",authToken)
   // redirect('/dashboard')
  }

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
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}