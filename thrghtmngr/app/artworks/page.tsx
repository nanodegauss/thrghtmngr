/**
 * Page de liste des œuvres d'art
 * 
 * Présente un tableau interactif de toutes les œuvres d'art dans le système.
 * Permet de filtrer, trier et accéder aux détails de chaque œuvre.
 * 
 * Fonctionnalités :
 * - Affichage sous forme de tableau avec colonnes personnalisables
 * - Visualisation rapide des informations clés (statut, auteur, référence...)
 * - Accès aux détails complets via un panneau latéral
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
  import { ArtworksTable } from "@/components/artworks-table"
  import { mockArtworks, mockProjects, mockArtworkCategories } from "@/mocks/data"
  
  export default function ArtworksPage() {
    // Adapter le format des données mockées au format attendu par le composant ArtworksTable
    const formattedArtworks = mockArtworks.map(artwork => {
      const project = mockProjects.find(p => p.id === artwork.project_id);
      const category = mockArtworkCategories.find(c => c.id === artwork.category_id);

      return {
        id: artwork.id,
        status: artwork.status,
        image_url: artwork.image_url,
        title: artwork.title,
        author: artwork.author,
        project: project?.title || "Non assigné",
        project_id: artwork.project_id, // Corriger pour inclure l'identifiant du projet
        exhibitNumber: artwork.exhibition_number,
        exhibition_number: artwork.exhibition_number,
        location: artwork.reference,
        reference: artwork.reference,
        category: category?.name || "Non catégorisé",
        category_id: artwork.category_id,
        origin: artwork.origin,
        rightsFee: artwork.rights_fee || 0,
        period: artwork.period
      };
    });
  
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
                    <BreadcrumbPage>Œuvres</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        </div>
        <ArtworksTable data={formattedArtworks} />
      </div>
    )
  }