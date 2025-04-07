"use client"

import { useState } from "react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, PenSquare, Trash2 } from "lucide-react"
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  ColumnDef
} from "@tanstack/react-table"
import CategoryFormDialog from "./category-form-dialog"

interface Category {
  id: string
  name: string
  description: string
}

interface CategoryTableProps {
  title: string
  data: Category[]
  type: 'project' | 'contact' | 'status'
  onAdd: (type: string, data: Partial<Category>) => Promise<void>
  onEdit: (type: string, id: string, data: Partial<Category>) => Promise<void>
  onDelete: (type: string, id: string) => void
  isLoading: boolean
}

export default function CategoryTable({ 
  title, 
  data, 
  type, 
  onAdd, 
  onEdit, 
  onDelete, 
  isLoading 
}: CategoryTableProps) {
  const [openForm, setOpenForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Category | null>(null)
  
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => (
        <div 
          className="cursor-pointer hover:underline"
          onClick={() => handleEdit(row.original)}
        >
          {row.getValue("name")}
        </div>
      )
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleEdit(row.original)}
          >
            <PenSquare className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(type, row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ]
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  const handleAdd = () => {
    setEditingItem(null)
    setOpenForm(true)
  }
  
  const handleEdit = (item: Category) => {
    setEditingItem(item)
    setOpenForm(true)
  }
  
  const handleSave = (formData: Partial<Category>) => {
    if (editingItem) {
      onEdit(type, editingItem.id, formData)
    } else {
      onAdd(type, formData)
    }
    setOpenForm(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={handleAdd} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun élément trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <CategoryFormDialog
        open={openForm}
        onOpenChange={setOpenForm}
        onSave={handleSave}
        title={
          editingItem 
            ? `Modifier ${type === 'project' 
                ? 'une catégorie de projet' 
                : type === 'contact' 
                ? 'une catégorie de contact' 
                : 'un statut d\'œuvre'}`
            : `Ajouter ${type === 'project' 
                ? 'une catégorie de projet' 
                : type === 'contact' 
                ? 'une catégorie de contact' 
                : 'un statut d\'œuvre'}`
        }
        defaultValues={editingItem || { name: '', description: '' }}
      />
    </div>
  )
}