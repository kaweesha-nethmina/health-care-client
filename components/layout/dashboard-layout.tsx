"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Bell,
  Menu,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Activity,
  CreditCard,
  Shield,
  ClipboardList,
  BarChart3,
  AlertTriangle,
  Package,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: UserRole
}

const getNavigationForRole = (role: UserRole) => {
  const navigationMap: Record<
    UserRole,
    Array<{
      name: string
      href: string
      icon: React.ComponentType<{ className?: string }>
    }>
  > = {
    patient: [
      { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
      { name: "Appointments", href: "/patient/appointments", icon: Calendar },
      { name: "Medical Records", href: "/patient/medical-records", icon: FileText },
      { name: "Billing", href: "/patient/billing", icon: CreditCard },
      { name: "Insurance", href: "/patient/insurance", icon: Shield },
      { name: "Profile", href: "/patient/profile", icon: User },
    ],
    doctor: [
      { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
      { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
      { name: "Patients", href: "/doctor/patients", icon: Users },
      { name: "Medical Records", href: "/doctor/medical-records", icon: FileText },
      { name: "Profile", href: "/doctor/profile", icon: User },
    ],
    nurse: [
      { name: "Dashboard", href: "/nurse/dashboard", icon: LayoutDashboard },
      { name: "Patients", href: "/nurse/patients", icon: Users },
      { name: "Care Records", href: "/nurse/care-records", icon: ClipboardList },
      { name: "Profile", href: "/nurse/profile", icon: User },
    ],
    staff: [
      { name: "Dashboard", href: "/staff/dashboard", icon: LayoutDashboard },
      { name: "Check-in", href: "/staff/check-in", icon: ClipboardList },
      { name: "Profile", href: "/staff/profile", icon: User },
    ],
    admin: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Appointments", href: "/admin/appointments", icon: Calendar },
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
    healthcare_manager: [
      { name: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
      { name: "Staff", href: "/manager/staff", icon: Users },
      { name: "Analytics", href: "/manager/analytics", icon: BarChart3 },
      { name: "Resources", href: "/manager/resources", icon: Package },
    ],
    system_admin: [
      { name: "Dashboard", href: "/system-admin/dashboard", icon: LayoutDashboard },
      { name: "System Config", href: "/system-admin/config", icon: Settings },
      { name: "Users", href: "/system-admin/users", icon: Users },
      { name: "Logs", href: "/system-admin/logs", icon: FileText },
    ],
    emergency_services: [
      { name: "Dashboard", href: "/emergency/dashboard", icon: LayoutDashboard },
      { name: "Active Cases", href: "/emergency/cases", icon: AlertTriangle },
      { name: "Resources", href: "/emergency/resources", icon: Package },
      { name: "Triage", href: "/emergency/triage", icon: Activity },
    ],
  }

  return navigationMap[role] || []
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = getNavigationForRole(role)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-2 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <svg className="h-6 w-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">Lifeline</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/patient/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/patient/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

export { DashboardLayout }
