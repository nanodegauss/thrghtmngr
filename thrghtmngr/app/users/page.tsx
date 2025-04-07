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
import { UsersTable } from "@/components/users-table"

// Données factices pour l'exemple
const dummyUsers = [
  {
    id: "1",
    role: "admin" as "admin",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    department: "Direction",
    isActive: true,
  },
  {
    id: "2",
    role: "user" as "user",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    department: "Marketing",
    isActive: true,
  },
  {
    id: "3",
    role: "viewer" as "viewer",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    department: "Finance",
    isActive: false,
  },
  // Ajoutez d'autres utilisateurs si nécessaire
]


export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <header className="flex h-16 shrink-0 items-center gap-2">
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
                  <BreadcrumbPage>Gestion des utilisateurs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>
      <UsersTable data={dummyUsers} />
    </div>
  )
}