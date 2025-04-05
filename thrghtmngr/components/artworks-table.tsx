"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  ArrowUpDown,
  PencilIcon,
  TrashIcon,
} from "lucide-react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Artwork {
  id: string
  status: "available" | "on_display" | "stored" | "on_loan"
  thumbnail: string
  title: string
  author: string
  project: string
  exhibitNumber: string
  location: string
  origin: string
  rightsFee: number
}

const columns: ColumnDef<Artwork>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Statut
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap = {
        available: { label: "Disponible", variant: "default" },
        on_display: { label: "En exposition", variant: "success" },
        stored: { label: "En réserve", variant: "secondary" },
        on_loan: { label: "En prêt", variant: "warning" },
      }
      return (
        <Badge variant={statusMap[status].variant as any}>
          {statusMap[status].label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "thumbnail",
    header: "Vignette",
    cell: ({ row }) => (
      <div className="relative w-12 h-12">
        <img
          src={row.getValue("thumbnail")}
          alt={`Vignette de ${row.getValue("title")}`}
          className="absolute inset-0 w-full h-full rounded-md object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Titre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" className="w-fit px-0 text-left text-foreground">
            {row.getValue("title")}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-2xl w-full p-6">
          <SheetHeader className="space-y-2 pb-4">
            <SheetTitle className="text-2xl">{row.getValue("title")}</SheetTitle>
            <SheetDescription>
              Détails et modifications de l'œuvre
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div className="relative flex-1 overflow-y-auto">
            <div className="space-y-6">
              <div className="aspect-square w-full relative rounded-lg overflow-hidden">
                <img
                  src={row.getValue("thumbnail")}
                  alt={row.getValue("title")}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <form className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="title">Titre</Label>
                  <Input id="title" defaultValue={row.getValue("title")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <Label htmlFor="author">Auteur</Label>
                    <Input id="author" defaultValue={row.getValue("author")} />
                  </div>
                  <div className="grid gap-4">
                    <Label htmlFor="status">Statut</Label>
                    <Select defaultValue={row.getValue("status")}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="on_display">En exposition</SelectItem>
                        <SelectItem value="stored">En réserve</SelectItem>
                        <SelectItem value="on_loan">En prêt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* ... autres champs ... */}
              </form>
            </div>
          </div>
          <Separator className="my-4" />
          <SheetFooter className="flex justify-end gap-4">
            <SheetClose asChild>
              <Button variant="outline">Annuler</Button>
            </SheetClose>
            <Button type="submit">Enregistrer</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
},
  {
    accessorKey: "author",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Auteur
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "project",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Projet
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "exhibitNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        N° Expo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cote
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "origin",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Provenance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "rightsFee",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Montant droits
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("rightsFee"))
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Modifier", row.original.id)}
          >
            <PencilIcon className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/90 hover:text-destructive-foreground"
            onClick={() => console.log("Supprimer", row.original.id)}
          >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Supprimer</span>
          </Button>
        </div>
      )
    },
  },
]

export function ArtworksTable({ data: initialData }: { data: Artwork[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon className="mr-2 h-4 w-4" />
                Colonnes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter((column) => 
                column.getCanHide()
              ).map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} sur{" "}
          {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Lignes par page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Première page</span>
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Page précédente</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Page suivante</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Dernière page</span>
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}