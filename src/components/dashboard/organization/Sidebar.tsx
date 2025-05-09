"use client"

import { Home, FileText, LayoutGrid, Bookmark, Settings } from "lucide-react"

interface DashboardSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function OrganizationSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "drafts", label: "Drafts", icon: FileText },
    { id: "campaigns-created", label: "Campaigns Created", icon: LayoutGrid },
    { id: "campaigns-backed", label: "Campaigns Backed", icon: Bookmark },
    { id: "account-settings", label: "Account Settings", icon: Settings },
  ]

  return (
    <div className="w-full md:w-64 p-4 bg-white border-b md:border-b-0 md:border-r border-gray-200 md:min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Dashboard</h1>

      <nav className="flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 space-x-2 md:space-x-0 md:space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-shrink-0 md:w-full flex items-center p-2 md:p-3 rounded-md text-sm md:text-base ${
              activeTab === item.id ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
