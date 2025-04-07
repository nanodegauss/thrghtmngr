/**
 * Tableau des œuvres d'art avec fonctionnalités avancées
 * 
 * Ce composant affiche un tableau interactif d'œuvres d'art avec les fonctionnalités suivantes :
 * - Tri des colonnes
 * - Filtrage par titre
 * - Pagination
 * - Sélection des colonnes à afficher
 * - Affichage des détails dans un panneau latéral
 * - Actions de modification et suppression
 * 
 * @component
 */

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

import { useArtworks } from "../hooks/useArtworks"
import { useQuery } from "@tanstack/react-query"
import { categoryService, mockArtworks, mockArtworkCategories } from "../services/api"
import { Artwork, ArtworkStatus } from "../types"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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

/**
 * Props du composant ArtworksTable
 * 
 * @typedef {Object} ArtworksTableProps
 * @property {Artwork[]} [artworks] - Liste d'œuvres d'art (déprécié, utilisez data à la place)
 * @property {Artwork[]} [data] - Liste d'œuvres d'art à afficher
 * @property {boolean} [hideProjectColumn] - Si true, masque la colonne Projet
 */
type ArtworksTableProps = {
  artworks?: Artwork[]
  data?: Artwork[]
  hideProjectColumn?: boolean
}

/**
 * Tableau des œuvres d'art
 * 
 * @param {ArtworksTableProps} props - Propriétés du composant
 * @returns {JSX.Element} - Composant de tableau d'œuvres d'art
 */
export function ArtworksTable({ artworks, data, hideProjectColumn }: ArtworksTableProps) {
  // Unifie les données provenant de artworks ou data
  const artworksData = data || artworks || [];
  
  // Solution temporaire : Utilisez les données mockées directement au lieu des hooks de React Query
  // à réactiver lorsque React Query sera pleinement configuré
  // const { data: artworks, isLoading: isLoadingArtworks, error: artworksError } = useArtworks();
  // const { data: categories } = useQuery({
  //   queryKey: ['artwork-categories'],
  //   queryFn: categoryService.getArtworkCategories
  // });
  
  // Utilisation temporaire des données mockées directement
  const categories = mockArtworkCategories;
  const isLoadingArtworks = false;
  const artworksError = null;
  
  // États pour la table
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    // Masquer la colonne projet si demandé
    project_id: hideProjectColumn ? false : true
  })
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  
  /**
   * Mappage des statuts d'œuvres vers des badges avec couleurs spécifiques
   */
  const statusMap: Record<ArtworkStatus, { label: string; variant: "default" | "success" | "secondary" | "warning" | "destructive" }> = {
    available: { label: "Disponible", variant: "default" },
    on_display: { label: "En exposition", variant: "success" },
    stored: { label: "En réserve", variant: "secondary" },
    on_loan: { label: "En prêt", variant: "warning" },
  };
  
  /**
   * Récupère le nom de la catégorie à partir de son ID
   * 
   * @param {string} categoryId - ID de la catégorie
   * @returns {string} Nom de la catégorie ou "Catégorie inconnue" si non trouvée
   */
  const getCategoryName = (categoryId: string): string => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category?.name || "Catégorie inconnue";
  };

  // Définition des colonnes de la table
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
        const status = row.getValue("status") as ArtworkStatus;
        return (
          <Badge variant={statusMap[status].variant}>
            {statusMap[status].label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "image_url",
      header: "Vignette",
      cell: ({ row }) => (
        <div className="relative w-12 h-12">
          <img
            src={row.getValue("image_url") || "/placeholder-artwork.jpg"}
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
                    src={row.getValue("image_url") || "/placeholder-artwork.jpg"}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-4">
                      <Label htmlFor="period">Période</Label>
                      <Input id="period" defaultValue={row.original.period} />
                    </div>
                    <div className="grid gap-4">
                      <Label htmlFor="origin">Provenance</Label>
                      <Input id="origin" defaultValue={row.original.origin} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-4">
                      <Label htmlFor="exhibition_number">N° Exposition</Label>
                      <Input id="exhibition_number" defaultValue={row.original.exhibition_number} />
                    </div>
                    <div className="grid gap-4">
                      <Label htmlFor="reference">Référence</Label>
                      <Input id="reference" defaultValue={row.original.reference} />
                    </div>
                  </div>
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
      accessorKey: "project_id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Projet
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        // Ce serait idéal d'avoir le nom du projet ici au lieu de l'ID
        // Une fois que vous aurez un hook useProjects ou similaire
        return row.getValue("project_id") || "Sans projet";
      }
    },
    {
      accessorKey: "exhibition_number",
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
      accessorKey: "reference",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Référence
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
      accessorKey: "category_id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Catégorie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return getCategoryName(row.getValue("category_id"));
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
  ];

  // Initialiser la table (TOUJOURS initialiser avant les retours conditionnels)
  const table = useReactTable({
    data: artworksData,
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

  // Afficher un état de chargement APRÈS l'initialisation de tous les hooks
  if (isLoadingArtworks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-current border-r-transparent mb-4"></div>
          <p>Chargement des œuvres d'art...</p>
        </div>
      </div>
    );
  }

  if (artworksError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
        Erreur: {(artworksError as Error).message}
      </div>
    );
  }

  if (artworksData.length === 0) {
    return (
      <div className="p-4 border border-gray-300 bg-gray-50 rounded-md text-center">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filtrer par titre..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
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