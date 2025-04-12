/**
 * Page de détail d'un projet
 * 
 * Affiche les informations détaillées d'un projet spécifique, y compris :
 * - Titre et description
 * - Catégorie et dates
 * - Suivi budgétaire
 * - Liste des œuvres associées
 * 
 * Cette page utilise le paramètre d'URL `id` pour charger les données du projet correspondant.
 * 
 * @component
 */

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast, Toaster } from "sonner"
import {
  Calendar,
  Tag,
  User,
  AlertCircle
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { projectService, artworkService, categoryService } from "@/services/api"

import { ArtworksTable } from "@/components/artworks-table"
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"

// Importations manquantes pour les composants de breadcrumb
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

type Artwork = {
  id: string
  title: string
  project_id: string
  // Ajoutez d'autres propriétés si nécessaire
}

type Project = {
  id: string
  title: string
  description: string
  budget: number
  start_date: string
  end_date: string
  category_id?: string
  created_at: string
}

type ProjectCategory = {
  id: string
  name: string
}

export default function ProjectDetailsPage() {
  // Extraction et validation du paramètre id
  const params = useParams()
  const id = params?.id ? String(params.id) : null

  const [project, setProject] = useState<Project | null>(null)
  const [artworks, setArtworks] = useState<import("@/types/index").Artwork[]>([])
  const [category, setCategory] = useState<ProjectCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [spentBudget, setSpentBudget] = useState(0)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const loadProjectData = async () => {
      try {
        const projectData = await projectService.getProjectById(id);
        setProject(projectData || null);

        if (projectData) {
          try {
            const artworksData = await artworkService.getArtworksByProject(id);
            setArtworks(artworksData || []);
          } catch (error) {
            console.error("Erreur lors du chargement des œuvres:", error);
            setArtworks([]);
          }

          if (projectData.category_id) {
            try {
              const categories = await categoryService.getProjectCategories();
              const projectCategory = categories.find(cat => cat.id === projectData.category_id);
              setCategory(projectCategory || null);
            } catch (error) {
              console.error("Erreur lors du chargement de la catégorie:", error);
              setCategory(null);
            }
          }

          if (typeof projectData.budget === 'number' && projectData.budget > 0) {
            const spent = Math.floor((0.5) * projectData.budget); // Utilisation d'une valeur fixe (50% du budget)
            setSpentBudget(spent);
          }
        }
      } catch (error) {
        toast.error("Erreur lors du chargement des données", {
          description: "Impossible de charger les détails du projet"
        });
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [id])

  const getStatusBadge = (status: string) => {
    if (!status) return null

    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Actif</Badge>
      case "planning":
        return <Badge className="bg-blue-600">Planification</Badge>
      case "completed":
        return <Badge className="bg-slate-600">Terminé</Badge>
      case "cancelled":
        return <Badge className="bg-red-600">Annulé</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non définie"
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: fr })
    } catch (error) {
      console.error("Erreur de formatage de date:", error)
      return dateString
    }
  }

  const formatBudget = (amount: number | null | undefined) => {
    if (amount === undefined || amount === null) return "0 €"
    try {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0
      }).format(amount)
    } catch (error) {
      console.error("Erreur de formatage du budget:", error)
      return `${amount} €`
    }
  }

  if (loading) {
    return (
      <div className="container p-4 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-8 w-1/4 mt-8" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container p-4">
        <div className="flex items-center rounded-lg border p-4 gap-3 bg-amber-50 text-amber-700 border-amber-200">
          <AlertCircle className="h-5 w-5" />
          <p>Projet non trouvé ou supprimé.</p>
        </div>
      </div>
    )
  }

  const budget = typeof project.budget === 'number' ? project.budget : 0
  const remainingBudget = budget - spentBudget
  const spentPercentage = budget > 0 ? Math.round((spentBudget / budget) * 100) : 0

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
                  <BreadcrumbPage>{project.title || "Aucun titre"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  Catégorie:
                </span>
                {category ? category.name : "Non catégorisé"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  Du
                </span>
                {formatDate(project.start_date)}&nbsp;
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  au
                </span>
                {formatDate(project.end_date)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1.5">
                Description
              </h3>
              <p>{project.description || "Aucune description"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>Budget</CardTitle>
            <CardDescription>Suivi des dépenses du projet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1.5">
                Budget total
              </h3>
              <div className="text-2xl font-bold">
                {formatBudget(budget)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1.5">
                  Dépensé
                </h3>
                <div className="font-semibold text-amber-600">
                  {formatBudget(spentBudget)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {spentPercentage}% du budget
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1.5">
                  Restant
                </h3>
                <div className="font-semibold text-emerald-600">
                  {formatBudget(remainingBudget)}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {100 - spentPercentage}% du budget
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${spentPercentage}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-bold">
          Œuvres associées ({artworks.length})
        </h2>
        {artworks.length > 0 ? (
          <ArtworksTable
            artworks={artworks}
            projectId={id || ""}
            hideProjectColumn={true}
          />
        ) : (
          <div className="text-center p-6 bg-slate-50 rounded-md border">
            <p className="text-slate-500">Aucune œuvre associée à ce projet</p>
          </div>
        )}
      </div>
    </div>
  )
}
