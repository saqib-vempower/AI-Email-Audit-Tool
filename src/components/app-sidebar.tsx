"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  SearchCode, 
  BarChart3, 
  UserCircle, 
  ShieldCheck,
  Mail,
  ClipboardCheck
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Leader Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Audit Dashboard",
    url: "/dashboard/audit",
    icon: ClipboardCheck,
  },
  {
    title: "Email Sandbox",
    url: "/dashboard/sandbox",
    icon: SearchCode,
  },
  {
    title: "Advisor Portal",
    url: "/dashboard/advisor",
    icon: UserCircle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-bold tracking-tight text-white">EduMail QA</span>
            <span className="text-xs font-medium text-sidebar-foreground/60">Compliance & Performance</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3 pt-6">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className="h-12 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
                tooltip={item.title}
              >
                <Link href={item.url} className="flex items-center gap-3 px-3">
                  <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-accent' : 'text-sidebar-foreground/70'}`} />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-6">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent">
            <ShieldCheck className="h-4 w-4 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">Admin Lead</span>
            <span className="text-[10px] text-sidebar-foreground/50">Verification Mode</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
