import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex flex-1 flex-col items-center justify-center"> {/* Added items-center to center the content */}
              <Header />
              <main className="flex-1 overflow-x-hidden w-full max-w-7xl mx-auto px-4">{children}</main> {/* Added max-w-7xl and mx-auto for centering */}
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
      </body>
      </html>
  )
}

export const metadata = {
  generator: 'v0.dev'
};