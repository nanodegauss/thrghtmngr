/**
 * Formulaire de gestion des catégories
 * 
 * Ce composant affiche un dialogue modal permettant d'ajouter ou de modifier une catégorie.
 * Il est utilisé pour gérer :
 * - Les catégories de projets
 * - Les catégories de contacts
 * - Les statuts des œuvres d'art
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.open - État d'ouverture du dialogue
 * @param {Function} props.onOpenChange - Fonction de changement d'état d'ouverture
 * @param {Function} props.onSave - Fonction appelée lors de la soumission du formulaire
 * @param {string} props.title - Titre du dialogue
 * @param {Object} props.defaultValues - Valeurs par défaut pour les champs du formulaire
 */

"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { categorySchema, CategoryFormValues } from "@/schemas"

interface CategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (formData: CategoryFormValues) => void
  title: string
  defaultValues: CategoryFormValues
}

export default function CategoryFormDialog({ 
  open, 
  onOpenChange, 
  onSave, 
  title, 
  defaultValues = { name: '', description: '' } 
}: CategoryFormDialogProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitting }, 
    reset 
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues
  })
  
  // Réinitialiser le formulaire quand il s'ouvre ou que les valeurs par défaut changent
  useEffect(() => {
    if (open) {
      reset(defaultValues)
    }
  }, [open, defaultValues, reset])

  const onSubmit = (data: CategoryFormValues) => {
    onSave(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                Nom
              </Label>
              <Input
                id="name"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                className={errors.description ? "border-destructive" : ""}
                rows={4}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}