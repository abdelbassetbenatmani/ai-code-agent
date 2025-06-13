"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Command,
  Home,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  Check,
  Clock,
  Code,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,

} from "lucide-react";
import Logo from "../Logo";

interface DashboardHeaderProps {
  user?: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut?: () => void;
}

// Sample notifications for demonstration
const notifications = [
  {
    id: "1",
    title: "Code review completed",
    description: "Your pull request #42 has been reviewed",
    time: "2 minutes ago",
    read: false,
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    actionLabel: "View",
  },
  {
    id: "2",
    title: "Build failed",
    description: "main branch build failed due to test errors",
    time: "35 minutes ago",
    read: false,
    icon: <AlertCircle className="h-4 w-4 text-red-500" />,
    actionLabel: "Details",
  },
  {
    id: "3",
    title: "New comment on issue #88",
    description: "John added a comment on your open issue",
    time: "2 hours ago",
    read: true,
    icon: <Code className="h-4 w-4 text-blue-500" />,
    actionLabel: "Open",
  },
  {
    id: "4",
    title: "Weekly report available",
    description: "Your project performance report is ready",
    time: "Yesterday",
    read: true,
    icon: <Clock className="h-4 w-4 text-amber-500" />,
    actionLabel: "View",
  },
];

const DashboardHeader = ({
  user = {
    name: "John Doe",
    email: "john@example.com",
    image: "",
  },
  onSignOut = () => console.log("Sign out clicked"),
}: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length,
  );
  const userInitials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const markAllAsRead = () => {
    setUnreadCount(0);
    console.log("Marked all notifications as read");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className=" flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - Logo and project name */}
        <div className="flex items-center gap-4">
          <Logo href="/dashboard" />
        </div>

        {/* Right side - Notifications, Theme Toggle and User Menu */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-primary">
                    {unreadCount > 9 && (
                      <span className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-white">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-[calc(100vw-2rem)] sm:w-80" 
              align="end"
              side="bottom"
              sideOffset={12}
            >
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {notifications.length > 0 ? (
                <DropdownMenuGroup className="max-h-[50vh] sm:max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start p-0"
                    >
                      <div
                        className={`flex w-full items-start gap-2 p-3 ${!notification.read ? "bg-muted/30" : ""}`}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                          {notification.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium line-clamp-1">
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 shrink-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs text-primary hover:text-primary/80"
                            >
                              {notification.actionLabel}
                            </Button>
                          </div>
                        </div>
                      </div>
                      {notifications.indexOf(notification) <
                        notifications.length - 1 && (
                        <DropdownMenuSeparator className="m-0" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              ) : (
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-sm font-medium">No notifications</p>
                  <p className="text-xs text-muted-foreground">
                    You&apos;re all caught up!
                  </p>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Refresh notifications
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            className="mr-1 sm:mr-3"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Mobile version (avatar only) */}
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full sm:hidden"
                    aria-label="User menu"
                >
                    <Avatar className="h-9 w-9 border border-primary/50">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="text-sm">{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            {/* Desktop version (with name and email) */}
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative hidden h-11 max-w-[200px] pl-2 pr-4 rounded-full items-center gap-3 shadow-md hover:bg-accent transition-all sm:flex"
                    aria-label="User menu"
                >
                    <Avatar className="h-9 w-9 border-2 border-primary/50 shadow">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="text-base font-semibold">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                        <span className="text-sm font-semibold leading-tight truncate max-w-[110px]">
                            {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground leading-tight truncate max-w-[110px]">
                            {user.email}
                        </span>
                    </div>
                    <span className="ml-auto">
                        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </span>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
                className="w-72 rounded-lg shadow-2xl border border-border bg-background/95 backdrop-blur-lg"
                // sideOffset={10}
                align="end"
                alignOffset={20}
            >
                <DropdownMenuLabel className="font-normal pb-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary shadow">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="text-lg font-bold">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold">{user.name}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-3 hover:bg-primary/10 rounded-lg transition-all">
                        <User className="mr-3 h-5 w-5 text-primary" />
                        <span className="font-medium">Profile</span>
                        <DropdownMenuShortcut className="hidden sm:inline-flex">⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-3 hover:bg-primary/10 rounded-lg transition-all">
                        <Settings className="mr-3 h-5 w-5 text-primary" />
                        <span className="font-medium">Account Settings</span>
                        <DropdownMenuShortcut className="hidden sm:inline-flex">⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-3 hover:bg-primary/10 rounded-lg transition-all">
                        <Command className="mr-3 h-5 w-5 text-primary" />
                        <span className="font-medium">Command Menu</span>
                        <DropdownMenuShortcut className="hidden sm:inline-flex">⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-3 hover:bg-primary/10 rounded-lg transition-all">
                    <Home className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-medium">Home Page</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={onSignOut}
                    className="py-3 hover:bg-destructive/10 rounded-lg transition-all text-destructive"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Log Out</span>
                    <DropdownMenuShortcut className="hidden sm:inline-flex">⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;