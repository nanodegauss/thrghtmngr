/**
 * Page du tableau de bord
 * 
 * Affiche une vue d'ensemble des projets, tâches et statistiques importantes pour l'utilisateur.
 * Cette page est accessible après connexion et sert de point d'entrée principal dans l'application.
 * 
 * @component
 */

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        {/* ... reste du code header ... */}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* ... reste du code contenu ... */}
      </div>
    </>
  )
}
