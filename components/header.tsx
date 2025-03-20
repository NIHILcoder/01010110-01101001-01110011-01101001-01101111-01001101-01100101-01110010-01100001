"use client"

import { useState } from "react"
import { Bell, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [notificationCount, setNotificationCount] = useState(5)
  const [credits, setCredits] = useState(250)

  return (
      <header className="sticky top-0 z-10 w-full flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Left side - empty or can be used for other elements */}
        <div className="flex-1"></div>

        {/* Right side - aligned to the right */}
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 rounded-md border px-2 py-1 text-sm">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>{credits} credits</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your generation credits</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1">
                  <Badge
                      className="flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
                      variant="destructive"
                  >
                    {notificationCount}
                  </Badge>
                </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {[
                  {
                    title: "New competition announced",
                    description: "Abstract Emotions competition starts today",
                    time: "10 minutes ago",
                  },
                  {
                    title: "Your image was featured",
                    description: "Your 'Cosmic Dreams' artwork was featured on the homepage",
                    time: "2 hours ago",
                  },
                  {
                    title: "New follower",
                    description: "ArtistUser42 started following you",
                    time: "5 hours ago",
                  },
                  {
                    title: "Comment on your artwork",
                    description: "CreativeUser99 commented: 'Amazing work!'",
                    time: "1 day ago",
                  },
                  {
                    title: "New tutorial available",
                    description: "Learn how to use LoRA models effectively",
                    time: "2 days ago",
                  },
                ].map((notification, index) => (
                    <DropdownMenuItem key={index} className="flex cursor-pointer flex-col items-start p-3">
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">{notification.description}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{notification.time}</div>
                    </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </header>
  )
}