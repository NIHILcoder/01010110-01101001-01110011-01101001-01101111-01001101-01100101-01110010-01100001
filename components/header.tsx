"use client"

import { useState } from "react"
import { Bell, Zap, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export function Header() {
    const [notificationCount, setNotificationCount] = useState(5)
    const [credits, setCredits] = useState(250)

    return (
        <header className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4 backdrop-blur-sm">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full flex items-center">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    VisioMera Studio
                </h1>
            </div>

            <div className="ml-auto flex items-center gap-3">
                {/* AI Status индикатор */}
                <div className="flex items-center gap-1.5 bg-background/30 backdrop-blur px-2 py-1 rounded-full border text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-foreground/80 whitespace-nowrap">AI Models: Online</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium">
                    <Zap className="h-3.5 w-3.5 text-yellow-500" />
                    <span className="whitespace-nowrap">{credits} credits</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-8 w-8">
                            <Bell className="h-4 w-4" />
                            {notificationCount > 0 && (
                                <span className="absolute -right-1 -top-1">
                      <Badge
                          className="flex h-3.5 w-3.5 items-center justify-center rounded-full p-0 text-[9px]"
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