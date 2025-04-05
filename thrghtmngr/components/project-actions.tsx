"use client"

import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

export function ProjectActions({ projectId }: { projectId: string }) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => {
          console.log("Modifier", projectId)
        }}
      >
        <Pencil className="h-4 w-4 mr-1" />
        Modifier
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 bg-black text-white hover:bg-red-600 hover:text-white transition-colors"
        onClick={() => {
          console.log("Supprimer", projectId)
        }}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Supprimer
      </Button>
    </div>
  )
}