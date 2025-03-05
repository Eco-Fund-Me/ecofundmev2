"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { UserProvider } from "@/hooks/userProvider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Function to generate breadcrumb title
  const getBreadcrumbTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/campaigns-backed":
        return "Campaigns Backed";
      case "/dashboard/campaigns-created":
        return "Campaigns Created";
      case "/dashboard/drafts":
        return "Drafts";
      default:
        return "Dashboard";
    }
  };

  // This would come from your authentication system
  const mockUserData = {
    userType: "organization" as const,
    userData: {
      name: "Organization Name",
      raised: 15700,
      backers: 1362,
      campaigns: 3,
    },
  };

  return (
    <UserProvider
      userType={mockUserData.userType}
      userData={mockUserData.userData}
    >
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-[#00EE7D]/20 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
