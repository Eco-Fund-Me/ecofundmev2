"use client"

import { useState } from "react"
import { Home, FileText, LayoutGrid, Bookmark, Settings, Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function OrganizationSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: "drafts",
      label: "Drafts",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "campaigns-created",
      label: "Campaigns Created",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "campaigns-backed",
      label: "Campaigns Backed",
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      id: "kyb-verification",
      label: "Business Verification",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      id: "account-settings",
      label: "Account Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu} className="rounded-full">
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar - Full on desktop, overlay on mobile when open */}
      <div
        className={cn(
          "fixed inset-0 z-20 bg-white transform transition-transform duration-300 md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="w-full md:w-64 p-4 md:min-h-screen overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full flex items-center p-3 rounded-md ${
                  activeTab === item.id ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-10 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
