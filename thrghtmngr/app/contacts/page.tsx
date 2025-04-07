/**
 * Page de gestion des contacts
 * 
 * Cette page présente un tableau interactif des contacts du système, permettant
 * aux utilisateurs de visualiser et gérer l'ensemble des personnes et organisations
 * avec lesquelles ils interagissent pour négocier les droits d'images.
 * 
 * Fonctionnalités :
 * - Affichage des informations de contact (nom, email, téléphone, adresse)
 * - Filtrage et tri par différents critères
 * - Lien direct vers l'email et le téléphone des contacts
 * 
 * @component
 */

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
import { ContactsTable } from "@/components/contacts-table"

// Données de test
const contacts = [
  {
    id: "1",
    category: "institution",
    name: "Société ABC",
    contactPerson: "Jean Dupont",
    email: "jean.dupont@abc.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de Paris, 75001 Paris, France",
    notes: "Client fidèle depuis 2015.",
  },
  {
    id: "2",
    category: "galerie",
    name: "Entreprise XYZ",
    contactPerson: "Marie Curie",
    email: "marie.curie@xyz.com",
    phone: "+33 6 78 90 12 34",
    address: "456 Avenue des Champs, 75008 Paris, France",
    notes: "Partenaire stratégique pour les projets internationaux.",
  },
  {
    id: "3",
    category: "photographe",
    name: "Fournitures LMN",
    contactPerson: "Paul Martin",
    email: "paul.martin@lmn.com",
    phone: "+33 4 56 78 90 12",
    address: "789 Boulevard Haussmann, 75009 Paris, France",
    notes: "Fournisseur principal pour les expositions.",
  },
  // ... autres contacts
]

export default function ContactsPage() {
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
                  <BreadcrumbPage>Contacts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>
      <ContactsTable data={contacts} />
    </div>
  )
}
