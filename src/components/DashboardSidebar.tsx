"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, FileText, Settings, LogOut, Wallet, Flag } from "lucide-react";
import { useUser } from "@/hooks/userProvider";
import PluralityConnect from "@/components/PluralityConnect";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
export function DashboardSidebar() {
  const pathname = usePathname();
  const { userType } = useUser();

  const menuItems = {
    main: [
      {
        name: "Home",
        href: "/dashboard",
        icon: Home,
      },
      ...(userType === "organization"
        ? [
            {
              name: "Drafts",
              href: "/dashboard/drafts",
              icon: FileText,
            },
          ]
        : []),
    ],
    campaigns:
      userType === "organization"
        ? [
            {
              name: "Campaigns Created",
              href: "/dashboard/campaigns-created",
              icon: Flag,
            },
            {
              name: "Campaigns Backed",
              href: "/dashboard/campaigns-backed",
              icon: Wallet,
            },
          ]
        : [
            {
              name: "Campaigns Backed",
              href: "/dashboard/campaigns-backed",
              icon: Wallet,
            },
          ],
  };

  return (
    <Sidebar className="border-r border-[#00EE7D]/20 bg-[#040B08]">
      <SidebarHeader className="border-b border-[#00EE7D]/20 bg-[#040B08]">
        <div className="px-4 py-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="EcofundMe Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <h2 className="text-xl font-bold text-[#00EE7D]">EcofundMe</h2>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase font-medium px-3 py-2">
            Main
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.main.map((item) => (
              <SidebarMenuItem
                key={item.name}
                className={`transition-all duration-200 hover:bg-[#00EE7D]/10 rounded-lg ${
                  pathname === item.href
                    ? "bg-[#00EE7D] text-black font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {menuItems.campaigns.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 text-xs uppercase font-medium px-3 py-2">
              Campaigns
            </SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.campaigns.map((item) => (
                <SidebarMenuItem
                  key={item.name}
                  className={`transition-all duration-200 hover:bg-[#00EE7D]/10 rounded-lg ${
                    pathname === item.href
                      ? "bg-[#00EE7D] text-black font-medium"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-[#00EE7D]/20 bg-[#040B08] px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase font-medium px-3 py-2">
            Account
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="hover:bg-[#00EE7D]/10 rounded-lg transition-all duration-200">
              <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400">
                <Settings className="h-4 w-4" />
                <PluralityConnect />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
