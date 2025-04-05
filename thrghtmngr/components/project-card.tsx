import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Image } from "lucide-react"
import { ProjectActions } from "./project-actions"

interface ProjectCardProps {
  project: {
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
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progressPercentage = (project.budgetSpent / project.budget) * 100
  const formatDate = (date: string) => new Date(date).toLocaleDateString('fr-FR')
  const formatBudget = (amount: number) => 
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            <Link 
              href={`/projets/${project.id}`} 
              className="hover:underline hover:text-primary transition-colors"
            >
              {project.title}
            </Link>
          </CardTitle>
          <Badge variant={project.isActive ? "default" : "secondary"}>
            {project.isActive ? "Actif" : "Inactif"}
          </Badge>
        </div>
        <Badge variant="outline">{project.category}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Image className="mr-1 h-4 w-4" />
            <span>{project.artworksCount} œuvres</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Budget</span>
            <span>{formatBudget(project.budgetSpent)} / {formatBudget(project.budget)}</span>
          </div>
          <Progress value={progressPercentage} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardContent>
      <CardFooter>
        <ProjectActions projectId={project.id} />
      </CardFooter>
    </Card>
  )
}