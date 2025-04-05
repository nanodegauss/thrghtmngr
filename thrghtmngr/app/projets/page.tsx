import { ProjectCard } from "@/components/project-card"
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

// Types pour les projets
interface Project {
  id: string
  title: string
  startDate: string
  endDate: string
  budget: number
  budgetSpent: number
  artworksCount: number
  category: string
  isActive: boolean
  description: string
}

// Données de test
const projects: Project[] = [
  {
    id: "1",
    title: "Exposition Printemps 2024",
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    budget: 50000,
    budgetSpent: 30000,
    artworksCount: 25,
    category: "Exposition",
    isActive: true,
    description: "Exposition temporaire présentant les œuvres de jeunes artistes émergents."
  },
  // ... autres projets
]

export default function ProjectsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    The Right Manager
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Mes projets</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}