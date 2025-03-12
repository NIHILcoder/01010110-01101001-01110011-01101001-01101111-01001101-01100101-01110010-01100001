"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Users, Info, Heart, Clock, BookOpen, User, Settings, LogIn, Search } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Set to true for demo purposes

  const mainNavItems = [
    {
      title: "Generate",
      href: "/",
      icon: Sparkles,
      notification: false,
    },
    {
      title: "Prompt Library",
      href: "/prompts",
      icon: BookOpen,
      notification: false,
    },
    {
      title: "Community",
      href: "/community",
      icon: Users,
      notification: 3,
    },
    {
      title: "Favorites",
      href: "/favorites",
      icon: Heart,
      notification: false,
    },
    {
      title: "History",
      href: "/history",
      icon: Clock,
      notification: false,
    },
    {
      title: "Learning",
      href: "/learning",
      icon: BookOpen,
      notification: 2,
    },
    {
      title: "About",
      href: "/about",
      icon: Info,
      notification: false,
    },
  ]

  const userNavItems = [
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">VisioMera</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full bg-background pl-8" />
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.notification && <SidebarMenuBadge>{item.notification}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isLoggedIn && (
          <SidebarGroup>
            <SidebarGroupLabel>Your Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium leading-none truncate">User Name</p>
              <p className="text-xs text-muted-foreground truncate">
                <Badge variant="outline" className="mr-1 px-1 py-0 text-xs">
                  Pro
                </Badge>
                <span>Credits: 250</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

