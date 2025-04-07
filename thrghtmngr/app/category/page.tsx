"use client"

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
import { useState, useEffect } from "react"
import { toast, Toaster } from "sonner"
import CategoryTable from "@/components/category-table"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { categoryService, workStatusService } from "./../../services/api"

interface Category {
  id: string
  name: string
  description?: string
  created_at?: string
}

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [projectCategories, setProjectCategories] = useState<Category[]>([])
  const [contactCategories, setContactCategories] = useState<Category[]>([])
  const [workStatuses, setWorkStatuses] = useState<Category[]>([])
  const [deleteDialog, setDeleteDialog] = useState({ 
    open: false, 
    type: '', 
    id: null as string | null 
  })

  useEffect(() => {
    loadAllCategories()
  }, [])

  const loadAllCategories = async () => {
    setIsLoading(true)
    try {
      const projectCats = await categoryService.getProjectCategories()
      const contactCats = await categoryService.getContactCategories()
      const statuses = await workStatusService.getWorkStatuses()
      
      setProjectCategories(projectCats)
      setContactCategories(contactCats)
      setWorkStatuses(statuses)
    } catch (error) {
      toast.error("Impossible de charger les données", {
        description: "Une erreur s'est produite lors du chargement des catégories"
      })
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async (type: string, data: Partial<Category>) => {
    try {
      if (type === 'project') {
        await categoryService.createProjectCategory({
          name: data.name || '',
          description: data.description
        })
      } else if (type === 'contact') {
        await categoryService.createContactCategory({
          name: data.name || '',
          description: data.description
        })
      } else if (type === 'status') {
        await workStatusService.createWorkStatus({
          name: data.name || '',
          description: data.description
        })
      }
      
      loadAllCategories()
      toast.success("Élément ajouté avec succès")
    } catch (error) {
      toast.error("Impossible d'ajouter l'élément", {
        description: "Veuillez réessayer ultérieurement"
      })
      console.error('Erreur:', error)
    }
  }

  const handleEdit = async (type: string, id: string, data: Partial<Category>) => {
    try {
      if (type === 'project') {
        await categoryService.updateProjectCategory(id, {
          name: data.name,
          description: data.description
        })
      } else if (type === 'contact') {
        await categoryService.updateContactCategory(id, {
          name: data.name,
          description: data.description
        })
      } else if (type === 'status') {
        await workStatusService.updateWorkStatus(id, {
          name: data.name,
          description: data.description
        })
      }
      
      loadAllCategories()
      toast.success("Élément modifié avec succès")
    } catch (error) {
      toast.error("Impossible de modifier l'élément", {
        description: "Veuillez réessayer ultérieurement"
      })
      console.error('Erreur:', error)
    }
  }

  const confirmDelete = (type: string, id: string) => {
    setDeleteDialog({ open: true, type, id })
  }

  const handleDelete = async () => {
    const { type, id } = deleteDialog
    if (!id) return
    
    try {
      if (type === 'project') {
        await categoryService.deleteProjectCategory(id)
      } else if (type === 'contact') {
        await categoryService.deleteContactCategory(id)
      } else if (type === 'status') {
        await workStatusService.deleteWorkStatus(id)
      }
      
      loadAllCategories()
      toast.success("Élément supprimé avec succès")
    } catch (error) {
      toast.error("Impossible de supprimer l'élément", {
        description: "Veuillez réessayer ultérieurement"
      })
      console.error('Erreur:', error)
    } finally {
      setDeleteDialog({ open: false, type: '', id: null })
    }
  }

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
                  <BreadcrumbPage>Gestion des catégories</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>
      
      <CategoryTable 
        title="Catégories de projets"
        data={projectCategories}
        type="project"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        isLoading={isLoading}
      />
      
      <CategoryTable 
        title="Catégories de contacts"
        data={contactCategories}
        type="contact"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        isLoading={isLoading}
      />
      
      <CategoryTable 
        title="Statuts des œuvres"
        data={workStatuses}
        type="status"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={confirmDelete}
        isLoading={isLoading}
      />
      
      <AlertDialog 
        open={deleteDialog.open} 
        onOpenChange={(open) => !open && setDeleteDialog(prev => ({ ...prev, open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>

  )
}