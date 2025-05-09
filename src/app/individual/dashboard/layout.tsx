import type React from "react"
import NavBar from "@/components/NavBar"


export default function IndividualDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
    </div>
  )
}
