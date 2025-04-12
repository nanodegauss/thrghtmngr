/**
 * Données mockées pour l'application
 * Ces données seront remplacées par des appels à la base de données dans les versions futures
 */

import { 
  User, Artwork, Project, Contact, Media, Task, 
  ArtworkCategory, ProjectCategory, ContactCategory, ArtworkStatus, ArtworkRightsHolder, ArtworkRightsMedia
} from '../types';

/**
 * Interface pour les statuts d'œuvres avec description
 */
export interface WorkStatusWithDescription {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

/**
 * Utilisateurs mockés
 */
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Thomas Dupont",
    email: "thomas@example.com",
    password: "hashed_password",
    role: "admin",
    department: "DCO",
    active: true,
    created_at: "2023-01-23T13:23:00.000Z"
  },
  {
    id: "2",
    name: "Marie Lefèvre",
    email: "marie@example.com",
    password: "hashed_password",
    role: "user",
    department: "DCO",
    active: true,
    created_at: "2023-02-15T09:45:00.000Z"
  },
  {
    id: "3",
    name: "Pierre Martin",
    email: "pierre@example.com",
    password: "hashed_password",
    role: "viewer",
    department: "DELCOM",
    active: true,
    created_at: "2023-03-10T14:30:00.000Z"
  }
];

/**
 * Catégories d'œuvres d'art mockées
 */
export const mockArtworkCategories: ArtworkCategory[] = [
  { id: "1", name: "Peinture", description: "Œuvres peintes", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "2", name: "Sculpture", description: "Œuvres en trois dimensions", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "3", name: "Photographie", description: "Images photographiques", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "4", name: "Installation", description: "Œuvres immersives", created_at: "2023-01-01T00:00:00.000Z" }
];

/**
 * Catégories de projets mockées
 */
export const mockProjectCategories: ProjectCategory[] = [
  { id: "1", name: "Exposition", description: "Exposition à durée limitée", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "2", name: "Print", description: "Exposition sur le long terme", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "3", name: "Online", description: "Projets de restauration d'œuvres", created_at: "2023-01-01T00:00:00.000Z" },
];

/**
 * Catégories de contacts mockées
 */
export const mockContactCategories: ContactCategory[] = [
  { id: "1", name: "Musée", description: "Institutions muséales", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "2", name: "Fondation", description: "Organisations à but non lucratif", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "3", name: "Galerie", description: "Espaces d'exposition commerciaux", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "4", name: "Collectionneur", description: "Collectionneurs privés", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "5", name: "Photographe", description: "Fournisseurs de services", created_at: "2023-01-01T00:00:00.000Z" }
];

/**
 * Statuts d'œuvres mockés
 */
export const mockWorkStatuses: WorkStatusWithDescription[] = [
  { id: "available", name: "Disponible", description: "Œuvre disponible pour exposition", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "on_display", name: "Exposée", description: "Actuellement exposée au public", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "stored", name: "En réserve", description: "Conservée dans les réserves du musée", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "on_loan", name: "En prêt", description: "Prêtée à une autre institution", created_at: "2023-01-01T00:00:00.000Z" }
];

/**
 * Projets mockés
 */
export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Exposition Apocalypse",
    description: "Exposition temporaire sur les mouvements modernistes en Europe",
    start_date: "2023-06-01",
    end_date: "2023-09-30",
    category_id: "1",
    budget: 5000,
    status: "active",
    created_by: "1",
    created_at: "2023-01-10T10:00:00.000Z"
  },
  {
    id: "2",
    title: "Chroniques n°104",
    description: "Magazine",
    start_date: "2023-04-15",
    end_date: "2024-04-15",
    category_id: "2",
    budget: 8000,
    status: "paused",
    created_by: "1",
    created_at: "2023-02-05T11:30:00.000Z"
  }
];

/**
 * Projets mockés avec des données additionnelles pour l'UI
 */
export const mockProjectsWithUI = mockProjects.map(project => ({
  ...project,
  // Budget dépensé (entre 10% et 90% du budget total)
  budget_spent: Math.round(project.budget * (0.1 + Math.random() * 0.8)),
  // Nombre d'oeuvres associées au projet (entre 0 et 15)
  artworks_count: Math.floor(Math.random() * 16)
}));

/**
 * Mapping des statuts de projet pour l'affichage
 */
export const statusMap = {
  active: { label: "Actif", variant: "success" as const },
  completed: { label: "Terminé", variant: "default" as const },
  cancelled: { label: "Annulé", variant: "destructive" as const },
  paused: { label: "En pause", variant: "warning" as const },
};

/**
 * Œuvres d'art mockées
 */
export const mockArtworks: Artwork[] = [
  {
    id: "1",
    title: "Sans titre",
    author: "Pablo Picasso",
    period: "1937",
    origin: "France",
    exhibition_number: "P123",
    reference: "REF-001",
    image_url: "https://barnies.fr/wp-content/uploads/2016/03/Picasso-square.jpg",
    project_id: "1",
    category_id: "1",
    status: "available",
    created_by: "1",
    created_at: "2023-01-15T10:30:00.000Z",
    rights_fee: 1500
  },
  {
    id: "2",
    title: "La Joconde",
    author: "Leonardo da Vinci",
    period: "1503-1506",
    origin: "Italie",
    exhibition_number: "L234",
    reference: "REF-002",
    image_url: "https://mr-expert.com/wp-content/uploads/2020/07/1200px-mona_lisa_by_leonardo_da_vinci_from_c2rmf_retouched.jpg",
    project_id: "2",
    category_id: "1",
    status: "on_display",
    created_by: "1",
    created_at: "2023-01-16T11:20:00.000Z",
    rights_fee: 2000
  },
  {
    id: "3",
    title: "Le Penseur",
    author: "Auguste Rodin",
    period: "1880",
    origin: "France",
    exhibition_number: "R345",
    reference: "REF-003",
    image_url: "https://leclaireur.fnac.com/wp-content/uploads/2022/04/rodin.jpg",
    project_id: "1",
    category_id: "2",
    status: "stored",
    created_by: "2",
    created_at: "2023-01-17T09:15:00.000Z",
    rights_fee: 3000
  },
  {
    id: "4",
    title: "Nymphéas",
    author: "Claude Monet",
    period: "1914-1926",
    origin: "France",
    exhibition_number: "M456",
    reference: "REF-004",
    image_url: "https://www.connaissancedesarts.com/wp-content/thumbnails/uploads/2024/08/cda_24_actu_vente_aux_encheres_nympheas_monet_hong_kong-tt-width-335-height-188-fill-1-crop-0-bgcolor-ffffff.jpg",
    project_id: "2",
    category_id: "1",
    status: "on_loan",
    created_by: "2",
    created_at: "2023-01-18T14:40:00.000Z",
    rights_fee: 2500
  }
];

/**
 * Contacts mockés
 */
export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Galerie Nationale",
    contact_person: "Jean Dupuis",
    email: "contact@galerie-nationale.fr",
    address: "1 rue des Arts, 75001 Paris",
    phone: "+33 1 23 45 67 89",
    notes: "Partenaire régulier pour les prêts",
    category_id: "1", 
    created_by: "1",
    created_at: "2023-01-20T11:00:00.000Z"
  },
  {
    id: "2",
    name: "Fondation des Arts",
    contact_person: "Sophie Laurent",
    email: "contact@fondation-arts.fr",
    address: "15 avenue de la Culture, 69001 Lyon",
    phone: "+33 4 56 78 90 12",
    notes: "Mécène important",
    category_id: "2",
    created_by: "1",
    created_at: "2023-01-21T13:30:00.000Z"
  }
];

/**
 * Médias (supports) mockés pour les droits d'œuvres
 */
export const mockMedia: Media[] = [
  { id: "1", name: "Print", created_by: "1", created_at: "2023-01-05T10:00:00.000Z" },
  { id: "2", name: "Web", created_by: "1", created_at: "2023-01-05T10:10:00.000Z" },
  { id: "3", name: "Exposition", created_by: "1", created_at: "2023-01-05T10:20:00.000Z" },
  { id: "4", name: "Télévision", created_by: "1", created_at: "2023-01-05T10:30:00.000Z" },
  { id: "5", name: "Réseaux sociaux", created_by: "1", created_at: "2023-01-05T10:40:00.000Z" }
];

/**
 * Ayants droits mockés pour les œuvres d'art
 */
export const mockArtworkRightsHolders: ArtworkRightsHolder[] = [
  { 
    id: "1", 
    artwork_id: "1", 
    contact_id: "1", 
    price: 500, 
    created_at: "2023-01-25T14:30:00.000Z" 
  },
  { 
    id: "2", 
    artwork_id: "1", 
    contact_id: "2", 
    price: 300, 
    created_at: "2023-01-26T09:20:00.000Z" 
  },
  { 
    id: "3", 
    artwork_id: "2", 
    contact_id: "1", 
    price: 700, 
    created_at: "2023-01-27T16:45:00.000Z" 
  },
  { 
    id: "4", 
    artwork_id: "3", 
    contact_id: "2", 
    price: 400, 
    created_at: "2023-01-28T11:10:00.000Z" 
  }
];

/**
 * Associations entre ayants droits et médias (supports) mockées
 */
export const mockArtworkRightsMedia: ArtworkRightsMedia[] = [
  { 
    id: "1", 
    artwork_rights_holder_id: "1", 
    media_id: "1", 
    created_at: "2023-01-25T14:35:00.000Z" 
  },
  { 
    id: "2", 
    artwork_rights_holder_id: "1", 
    media_id: "2", 
    created_at: "2023-01-25T14:36:00.000Z" 
  },
  { 
    id: "3", 
    artwork_rights_holder_id: "2", 
    media_id: "3", 
    created_at: "2023-01-26T09:25:00.000Z" 
  },
  { 
    id: "4", 
    artwork_rights_holder_id: "3", 
    media_id: "1", 
    created_at: "2023-01-27T16:50:00.000Z" 
  },
  { 
    id: "5", 
    artwork_rights_holder_id: "3", 
    media_id: "4", 
    created_at: "2023-01-27T16:51:00.000Z" 
  },
  { 
    id: "6", 
    artwork_rights_holder_id: "4", 
    media_id: "5", 
    created_at: "2023-01-28T11:15:00.000Z" 
  }
];

/**
 * Données de navigation
 */
export const mockNavigation = {
  user: {
    name: "John Doe",
    email: "john@doe.com",
    avatar: "/av1tars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Projets",
      url: "/projects",
      icon: "SquareTerminal",
      isActive: true,
    },
    {
      title: "Oeuvres",
      url: "/artworks",
      icon: "Palette",
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: "BookOpen",
    },
  ],
  navSecondary: [],
  projects: [
    {
      name: "Catégories",
      url: "/category",
      icon: "Tags",
    },
    {
      name: "Historique",
      url: "#",
      icon: "History",
    },
    {
      name: "Utilisateurs",
      url: "/users",
      icon: "Users",
    },
  ],
};