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
  
  // Données de test
  const artworks = [
    {
      id: "1",
      status: "on_display",
      thumbnail: "https://i.pinimg.com/736x/93/c7/b7/93c7b77544f43c3536a254f3776c53b4.jpg",
      title: "La Joconde",
      author: "Leonard de Vinci",
      project: "Exposition Renaissance",
      exhibitNumber: "EXP-2024-001",
      location: "PEIN-1234",
      origin: "Collection permanente",
      rightsFee: 1500,
    },
    {
      id: "2",
      status: "available",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      title: "La Nuit étoilée",
      author: "Vincent van Gogh",
      project: "Exposition Impressionnisme",
      exhibitNumber: "EXP-2024-002",
      location: "IMPR-5678",
      origin: "Musée d'Orsay",
      rightsFee: 2000,
    },
    {
      id: "3",
      status: "stored",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
      title: "Le Baiser",
      author: "Gustav Klimt",
      project: "Art Nouveau",
      exhibitNumber: "EXP-2024-003",
      location: "NOUV-9012",
      origin: "Collection privée",
      rightsFee: 3000,
    },
    {
      id: "4",
      status: "on_loan",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Meisje_met_de_parel.jpg/800px-Meisje_met_de_parel.jpg",
      title: "La Jeune Fille à la perle",
      author: "Johannes Vermeer",
      project: "Chefs-d'œuvre Hollandais",
      exhibitNumber: "EXP-2024-004",
      location: "HOLL-3456",
      origin: "Mauritshuis",
      rightsFee: 2500,
    },
    {
      id: "5",
      status: "on_display",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
      title: "La Grande Vague de Kanagawa",
      author: "Hokusai",
      project: "Art Japonais",
      exhibitNumber: "EXP-2024-005",
      location: "JAPO-7890",
      origin: "British Museum",
      rightsFee: 1800,
    },
    // ... autres œuvres
  ]
  
  export default function ArtworksPage() {
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
        <ArtworksTable data={artworks} />
      </div>
    )
  }