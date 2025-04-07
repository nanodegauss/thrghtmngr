/**
 * Tableau de gestion des utilisateurs
 * 
 * Affiche et permet de gérer les utilisateurs du système avec leurs rôles et permissions.
 * Ce composant inclut des fonctionnalités de tri, filtrage et pagination des utilisateurs.
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {User[]} props.data - Liste des utilisateurs à afficher dans le tableau
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
  Mail,
  UserIcon,
  Badge as BadgeIcon,
  CalendarIcon,
} from "lucide-react"

import { mockUsers } from "../services/api"
import { User } from "../types"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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

export function UsersTable() {
  // Utilisation temporaire des données mockées directement
  const users = mockUsers;
  const isLoadingUsers = false;
  const usersError = null;
  
  // États pour la table
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  
  // Mappages des rôles pour l'affichage
  const roleMap: Record<string, { label: string; variant: "default" | "success" | "secondary" | "destructive" }> = {
    admin: { label: "Administrateur", variant: "destructive" },
    user: { label: "Utilisateur", variant: "default" },
    viewer: { label: "Visiteur", variant: "secondary" },
  };

  // Définition des colonnes de la table
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link" className="w-fit px-0 text-left text-foreground">
              {row.getValue("name")}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-2xl w-full p-6">
            <SheetHeader className="space-y-2 pb-4">
              <SheetTitle className="text-2xl">{row.getValue("name")}</SheetTitle>
              <SheetDescription>
                Détails et modifications de l'utilisateur
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="relative flex-1 overflow-y-auto">
              <div className="space-y-6">
                <form className="grid gap-6">
                  <div className="grid gap-4">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" defaultValue={row.getValue("name")} />
                  </div>
                  <div className="grid gap-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={row.original.email} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-4">
                      <Label htmlFor="role">Rôle</Label>
                      <Select defaultValue={row.original.role}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="user">Utilisateur</SelectItem>
                          <SelectItem value="viewer">Visiteur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-4">
                      <Label htmlFor="department">Département</Label>
                      <Input id="department" defaultValue={row.original.department} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="active" 
                      defaultChecked={row.original.active}
                    />
                    <Label htmlFor="active">Compte actif</Label>
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
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <a 
            href={`mailto:${email}`} 
            className="flex items-center hover:underline text-blue-600"
          >
            <Mail className="h-4 w-4 mr-2" />
            {email}
          </a>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rôle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge variant={roleMap[role]?.variant || "default"}>
            {roleMap[role]?.label || role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Département
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            {row.getValue("department")}
          </div>
        );
      },
    },
    {
      accessorKey: "active",
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
        const isActive = row.getValue("active") as boolean;
        return (
          <Badge variant={isActive ? "success" : "destructive"}>
            {isActive ? "Actif" : "Inactif"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de création
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string);
        return (
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            {date.toLocaleDateString('fr-FR')}
          </div>
        );
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
    data: users,
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
  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-current border-r-transparent mb-4"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
        Erreur: {(usersError as Error).message}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-4 border border-gray-300 bg-gray-50 rounded-md text-center">
        Aucun utilisateur disponible
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filtrer par nom..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
        <Button variant="default">
          <UserIcon className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
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
          {table.getFilteredRowModel().rows.length} utilisateur(s) sélectionné(s).
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