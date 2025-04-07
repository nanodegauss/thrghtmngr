"use client"

import { useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CalendarIcon,
  Clock,
  PlusCircle,
  Search,
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
} from "lucide-react"

import { mockProjects, mockProjectCategories } from "../services/api"
import { Project } from "../types"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  category_id: string;
  start_date: string;
  end_date: string;
  budget: number;
  budget_spent?: number; 
  artworks_count?: number;
  // autres propriétés...
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Calculer le pourcentage de budget restant
  const budgetSpent = project.budget_spent || 0;
  const budgetRemaining = project.budget - budgetSpent;
  const budgetRemainingPercentage = Math.round((budgetRemaining / project.budget) * 100);
  
  // Nombre d'œuvres (utilisez la propriété si elle existe, sinon 0)
  const artworksCount = project.artworks_count || 0;
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="default">
            {project.status}
          </Badge>
          <Badge variant="outline">{artworksCount} œuvre{artworksCount > 1 ? 's' : ''}</Badge>
        </div>
        <CardTitle className="mt-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              Du {new Date(project.start_date).toLocaleDateString('fr-FR')} au {new Date(project.end_date).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(project.budget)}</div>
          <Badge variant={budgetRemainingPercentage > 50 ? "success" : budgetRemainingPercentage > 20 ? "warning" : "destructive"}>
            {budgetRemainingPercentage}% restant
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}


export function ProjectsDisplay() {
  // Utilisation temporaire des données mockées directement
  const projects = mockProjects;
  const categories = mockProjectCategories;
  const isLoadingProjects = false;
  const projectsError = null;
  
  // États pour le filtrage et la pagination
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"title" | "date" | "budget">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  
  const itemsPerPage = 6
  
  // Mappages des statuts pour l'affichage
  const statusMap: Record<string, { label: string; variant: "default" | "success" | "secondary" | "warning" | "destructive" }> = {
    active: { label: "Actif", variant: "success" },
    planning: { label: "En planification", variant: "secondary" },
    completed: { label: "Terminé", variant: "default" },
    cancelled: { label: "Annulé", variant: "destructive" },
    paused: { label: "En pause", variant: "warning" },
  };
  
  // Fonction pour trouver le nom de la catégorie
  const getCategoryName = (categoryId: string): string => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category?.name || "Catégorie inconnue";
  };
  
  // Fonction pour formater les montants
  const formatBudget = (budget: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(budget);
  };
  
  // Fonction pour le calcul de la durée du projet
  const getProjectDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    
    if (diffMonths < 1) {
      return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    }
    
    const remainingDays = diffDays % 30;
    
    if (remainingDays === 0) {
      return `${diffMonths} mois`;
    }
    
    return `${diffMonths} mois et ${remainingDays} jour${remainingDays > 1 ? 's' : ''}`;
  };
  
  // Filtrer les projets
  const filteredProjects = projects
    .filter(project => {
      // Filtrage par recherche
      if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtrage par catégorie
      if (selectedCategory && project.category_id !== selectedCategory) {
        return false;
      }
      
      // Filtrage par statut
      if (selectedStatus && project.status !== selectedStatus) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Tri
      if (sortBy === "title") {
        return sortOrder === "asc" 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
          : new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      } else if (sortBy === "budget") {
        return sortOrder === "asc" 
          ? a.budget - b.budget
          : b.budget - a.budget;
      }
      return 0;
    });
  
  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Afficher un état de chargement
  if (isLoadingProjects) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-current border-r-transparent mb-4"></div>
          <p>Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
        Erreur: {(projectsError as Error).message}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-4 border border-gray-300 bg-gray-50 rounded-md text-center">
        Aucun projet disponible
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => {
                  setSelectedCategory(null);
                  setSelectedStatus(null);
                }}>
                  Réinitialiser tous les filtres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <p className="px-2 py-1.5 text-sm font-semibold">Catégorie</p>
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === null}
                  onCheckedChange={() => setSelectedCategory(null)}
                >
                  Toutes les catégories
                </DropdownMenuCheckboxItem>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    checked={selectedCategory === category.id}
                    onCheckedChange={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <p className="px-2 py-1.5 text-sm font-semibold">Statut</p>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === null}
                  onCheckedChange={() => setSelectedStatus(null)}
                >
                  Tous les statuts
                </DropdownMenuCheckboxItem>
                {Object.entries(statusMap).map(([key, { label }]) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={selectedStatus === key}
                    onCheckedChange={() => setSelectedStatus(key)}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("asc"); }}>
                  Titre (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("title"); setSortOrder("desc"); }}>
                  Titre (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }}>
                  Date (récent en premier)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }}>
                  Date (ancien en premier)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("budget"); setSortOrder("desc"); }}>
                  Budget (élevé en premier)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("budget"); setSortOrder("asc"); }}>
                  Budget (faible en premier)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau projet
          </Button>
        </div>
      </div>
      
      {/* Indiquer le nombre de résultats */}
      <div className="text-sm text-muted-foreground mb-4">
        {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
      </div>

      {/* Affichage en grille */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <Sheet key={project.id}>
              <SheetTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={statusMap[project.status]?.variant || "default"}>
                        {statusMap[project.status]?.label || project.status}
                      </Badge>
                      <Badge variant="outline">{getCategoryName(project.category_id)}</Badge>
                    </div>
                    <CardTitle className="mt-2">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                          Du {new Date(project.start_date).toLocaleDateString('fr-FR')} au {new Date(project.end_date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Durée : {getProjectDuration(project.start_date, project.end_date)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="font-semibold">{formatBudget(project.budget)}</div>
                  </CardFooter>
                </Card>
              </SheetTrigger>
              
              <SheetContent side="right" className="sm:max-w-2xl w-full p-6">
                <SheetHeader className="space-y-2 pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={statusMap[project.status]?.variant || "default"}>
                      {statusMap[project.status]?.label || project.status}
                    </Badge>
                    <Badge variant="outline">{getCategoryName(project.category_id)}</Badge>
                  </div>
                  <SheetTitle className="text-2xl mt-4">{project.title}</SheetTitle>
                  <SheetDescription>
                    {project.description}
                  </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />
                <div className="space-y-6">
                  <Tabs defaultValue="details">
                    <TabsList>
                      <TabsTrigger value="details">Détails</TabsTrigger>
                      <TabsTrigger value="artworks">Œuvres</TabsTrigger>
                      <TabsTrigger value="tasks">Tâches</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                      <div className="space-y-6 pt-4">
                        <form className="grid gap-6">
                          <div className="grid gap-4">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" defaultValue={project.title} />
                          </div>
                          <div className="grid gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" defaultValue={project.description} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-4">
                              <Label htmlFor="startDate">Date de début</Label>
                              <Input id="startDate" type="date" defaultValue={project.start_date} />
                            </div>
                            <div className="grid gap-4">
                              <Label htmlFor="endDate">Date de fin</Label>
                              <Input id="endDate" type="date" defaultValue={project.end_date} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-4">
                              <Label htmlFor="budget">Budget</Label>
                              <Input 
                                id="budget" 
                                type="number" 
                                defaultValue={project.budget}
                                min="0"
                                step="1000"
                              />
                            </div>
                            <div className="grid gap-4">
                              <Label htmlFor="status">Statut</Label>
                              <Select defaultValue={project.status}>
                                <SelectTrigger id="status">
                                  <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusMap).map(([key, { label }]) => (
                                    <SelectItem key={key} value={key}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid gap-4">
                            <Label htmlFor="category">Catégorie</Label>
                            <Select defaultValue={project.category_id}>
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Sélectionner une catégorie" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </form>
                      </div>
                    </TabsContent>
                    <TabsContent value="artworks">
                      <div className="pt-4 text-center text-muted-foreground">
                        Aucune œuvre associée à ce projet
                      </div>
                    </TabsContent>
                    <TabsContent value="tasks">
                      <div className="pt-4 text-center text-muted-foreground">
                        Aucune tâche associée à ce projet
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <Separator className="my-4" />
                <SheetFooter className="flex justify-end gap-4 mt-6">
                  <SheetClose asChild>
                    <Button variant="outline">Fermer</Button>
                  </SheetClose>
                  <Button type="submit">Enregistrer</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      )}

      {/* Affichage en liste */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {paginatedProjects.map((project) => (
            <Sheet key={project.id}>
              <SheetTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={statusMap[project.status]?.variant || "default"}>
                          {statusMap[project.status]?.label || project.status}
                        </Badge>
                        <Badge variant="outline">{getCategoryName(project.category_id)}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                          {new Date(project.start_date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="font-semibold">{formatBudget(project.budget)}</div>
                    </div>
                  </div>
                </Card>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-2xl w-full p-6">
                {/* Même contenu que dans l'affichage en grille */}
                <SheetHeader className="space-y-2 pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={statusMap[project.status]?.variant || "default"}>
                      {statusMap[project.status]?.label || project.status}
                    </Badge>
                    <Badge variant="outline">{getCategoryName(project.category_id)}</Badge>
                  </div>
                  <SheetTitle className="text-2xl mt-4">{project.title}</SheetTitle>
                  <SheetDescription>
                    {project.description}
                  </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />
                {/* Même contenu que dans l'affichage en grille */}
                <div className="space-y-6">
                  <Tabs defaultValue="details">
                    <TabsList>
                      <TabsTrigger value="details">Détails</TabsTrigger>
                      <TabsTrigger value="artworks">Œuvres</TabsTrigger>
                      <TabsTrigger value="tasks">Tâches</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                      <div className="space-y-6 pt-4">
                        <form className="grid gap-6">
                          <div className="grid gap-4">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" defaultValue={project.title} />
                          </div>
                          <div className="grid gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" defaultValue={project.description} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-4">
                              <Label htmlFor="startDate">Date de début</Label>
                              <Input id="startDate" type="date" defaultValue={project.start_date} />
                            </div>
                            <div className="grid gap-4">
                              <Label htmlFor="endDate">Date de fin</Label>
                              <Input id="endDate" type="date" defaultValue={project.end_date} />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-4">
                              <Label htmlFor="budget">Budget</Label>
                              <Input 
                                id="budget" 
                                type="number" 
                                defaultValue={project.budget}
                                min="0"
                                step="1000"
                              />
                            </div>
                            <div className="grid gap-4">
                              <Label htmlFor="status">Statut</Label>
                              <Select defaultValue={project.status}>
                                <SelectTrigger id="status">
                                  <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusMap).map(([key, { label }]) => (
                                    <SelectItem key={key} value={key}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid gap-4">
                            <Label htmlFor="category">Catégorie</Label>
                            <Select defaultValue={project.category_id}>
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Sélectionner une catégorie" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </form>
                      </div>
                    </TabsContent>
                    <TabsContent value="artworks">
                      <div className="pt-4 text-center text-muted-foreground">
                        Aucune œuvre associée à ce projet
                      </div>
                    </TabsContent>
                    <TabsContent value="tasks">
                      <div className="pt-4 text-center text-muted-foreground">
                        Aucune tâche associée à ce projet
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <Separator className="my-4" />
                <SheetFooter className="flex justify-end gap-4 mt-6">
                  <SheetClose asChild>
                    <Button variant="outline">Fermer</Button>
                  </SheetClose>
                  <Button type="submit">Enregistrer</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Première page</span>
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Page précédente</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm">
              Page {currentPage} sur {totalPages}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Page suivante</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Dernière page</span>
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}