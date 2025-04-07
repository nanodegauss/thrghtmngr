"use client"

import * as React from "react"
import {
  BookOpen,
  Command,
  SquareTerminal,
  Palette,
  Tags,
  History,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@doe.com",
    avatar: "/av1tars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Projets",
      url: "/projects",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Oeuvres",
      url: "/artworks",
      icon: Palette,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: BookOpen,
    },
  ],
  navSecondary: [
/*     {
      title: "Catégories",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Historique",
      url: "#",
      icon: Send,
    }, */
  ],
  projects: [
    {
      name: "Catégories",
      url: "/category",
      icon: Tags,
    },
    {
      name: "Historique",
      url: "#",
      icon: History,
    },
    {
      name: "Utilisateurs",
      url: "/users",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">THRGHTMNGR</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
