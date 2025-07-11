"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/individual/dashboard",
      active: pathname === "/individual/dashboard",
    },
    {
      label: "Campaigns Backed",
      icon: CreditCard,
      href: "/individual/dashboard/campaigns-backed",
      active: pathname === "/individual/dashboard/campaigns-backed",
    },
    {
      label: "Account Settings",
      icon: Settings,
      href: "/individual/dashboard/account-settings",
      active: pathname === "/individual/dashboard/account-settings",
    },
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden w-full overflow-x-auto pb-2 mb-4 border-b">
        <div className="flex space-x-4 px-4 min-w-max">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                route.active ? "bg-green-500 text-white" : "hover:bg-gray-100",
              )}
            >
              <route.icon className="w-5 h-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={cn("hidden md:flex flex-col w-64 p-4 bg-white border-r", className)}>
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <nav className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                route.active ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <route.icon className="w-5 h-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
