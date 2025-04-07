/**
 * Barre latérale principale de l'application
 * 
 * Fournit la navigation principale de l'application avec les sections suivantes :
 * - Tableau de bord
 * - Projets
 * - Œuvres d'art
 * - Contacts
 * - Gestion des catégories
 * - Administration des utilisateurs
 * 
 * La sidebar est responsive et s'adapte aux écrans mobiles comme aux grands écrans.
 * Elle peut être réduite en mode icônes uniquement et offre des info-bulles dans ce mode.
 * 
 * @component
 */

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
import { mockNavigation } from "@/mocks/data"

// Mapping des icônes aux noms de chaînes
const iconMapping = {
  SquareTerminal,
  Palette,
  BookOpen,
  Tags,
  History,
  Users,
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
        <NavMain items={mockNavigation.navMain.map(item => ({
          ...item,
          icon: iconMapping[item.icon as keyof typeof iconMapping]
        }))} />
        <NavProjects projects={mockNavigation.projects.map(item => ({
          ...item,
          icon: iconMapping[item.icon as keyof typeof iconMapping]
        }))} />
        <NavSecondary items={mockNavigation.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={mockNavigation.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
