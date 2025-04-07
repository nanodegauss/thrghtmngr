import { 
    User, Artwork, ArtworkWithRelations, Project, 
    Contact, Media, Task, ArtworkCategory,
    ProjectCategory, ContactCategory, ArtworkStatus
  } from '../types';
  

  // Interface pour les statuts d'œuvres avec description
  interface WorkStatusWithDescription {
    id: string;
    name: string;
    description: string;
}
  // Données mockées pour les statuts d'œuvres
const mockWorkStatuses: WorkStatusWithDescription[] = [
  { id: "available", name: "Disponible", description: "Œuvre disponible pour exposition", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "on_display", name: "Exposée", description: "Actuellement exposée au public", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "stored", name: "En réserve", description: "Conservée dans les réserves du musée", created_at: "2023-01-01T00:00:00.000Z" },
  { id: "on_loan", name: "En prêt", description: "Prêtée à une autre institution", created_at: "2023-01-01T00:00:00.000Z" }
];

  // Données mockées pour les utilisateurs
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Thomas Dupont",
      email: "thomas@example.com",
      password: "hashed_password",
      role: "admin",
      department: "Conservation",
      active: true,
      created_at: "2023-01-23T13:23:00.000Z"
    },
    {
      id: "2",
      name: "Marie Lefèvre",
      email: "marie@example.com",
      password: "hashed_password",
      role: "user",
      department: "Exposition",
      active: true,
      created_at: "2023-02-15T09:45:00.000Z"
    },
    {
      id: "3",
      name: "Pierre Martin",
      email: "pierre@example.com",
      password: "hashed_password",
      role: "viewer",
      department: "Recherche",
      active: true,
      created_at: "2023-03-10T14:30:00.000Z"
    }
  ];
  
  // Données mockées pour les catégories d'œuvres d'art
  const mockArtworkCategories: ArtworkCategory[] = [
    { id: "1", name: "Peinture", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "2", name: "Sculpture", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "3", name: "Photographie", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "4", name: "Installation", created_at: "2023-01-01T00:00:00.000Z" }
  ];
  
  // Données mockées pour les catégories de projets
  const mockProjectCategories: ProjectCategory[] = [
    { id: "1", name: "Exposition temporaire", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "2", name: "Exposition permanente", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "3", name: "Restauration", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "4", name: "Acquisition", created_at: "2023-01-01T00:00:00.000Z" }
  ];
  
  // Données mockées pour les catégories de contacts
  const mockContactCategories: ContactCategory[] = [
    { id: "1", name: "Musée", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "2", name: "Fondation", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "3", name: "Galerie", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "4", name: "Collectionneur", created_at: "2023-01-01T00:00:00.000Z" },
    { id: "5", name: "Fournisseur", created_at: "2023-01-01T00:00:00.000Z" }
  ];

  // Données mockées pour les projets
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "Modernisme Européen",
      description: "Exposition temporaire sur les mouvements modernistes en Europe",
      start_date: "2023-06-01",
      end_date: "2023-09-30",
      category_id: "1",
      budget: 150000,
      status: "active",
      created_by: "1",
      created_at: "2023-01-10T10:00:00.000Z"
    },
    {
      id: "2",
      title: "Art Contemporain",
      description: "Nouvelle section permanente dédiée à l'art contemporain",
      start_date: "2023-04-15",
      end_date: "2024-04-15",
      category_id: "2",
      budget: 300000,
      status: "planning",
      created_by: "1",
      created_at: "2023-02-05T11:30:00.000Z"
    }
  ];
  
  // Données mockées pour les œuvres d'art
  const mockArtworks: Artwork[] = [
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
      created_at: "2023-01-15T10:30:00.000Z"
    },
    {
      id: "2",
      title: "La Joconde",
      author: "Leonardo da Vinci",
      period: "1503-1506",
      origin: "Italie",
      exhibition_number: "L234",
      reference: "REF-002",
      image_url: "data:image/jpeg;base64,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",
      project_id: "2",
      category_id: "1",
      status: "on_display",
      created_by: "1",
      created_at: "2023-01-16T11:20:00.000Z"
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
      created_at: "2023-01-17T09:15:00.000Z"
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
      created_at: "2023-01-18T14:40:00.000Z"
    }
  ];
  
  // Données mockées pour les contacts
  const mockContacts: Contact[] = [
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
  
  
  // Service utilisateurs
  export const userService = {
    getUsers: async (): Promise<User[]> => {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockUsers];
    },
    
    getUserById: async (id: string): Promise<User | undefined> => {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockUsers.find(user => user.id === id);
    }
  };
  
  // Service œuvres d'art
  export const artworkService = {
    getArtworks: async (): Promise<Artwork[]> => {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockArtworks];
    },
    
    getArtworkById: async (id: string): Promise<ArtworkWithRelations | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const artwork = mockArtworks.find(artwork => artwork.id === id);
      
      if (!artwork) return undefined;
      const project = mockProjects.find(project => project.id === artwork.project_id);
      const category = mockArtworkCategories.find(category => category.id === artwork.category_id);
      
      return {
        ...artwork,
        project,
        category
      };
    },
    
    getArtworksByStatus: async (status: ArtworkStatus): Promise<Artwork[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockArtworks.filter(artwork => artwork.status === status);
    },
      
    getArtworksByProject: async (projectId: string): Promise<Artwork[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockArtworks.filter(artwork => artwork.project_id === projectId);
    },
    
    createArtwork: async (artworkData: Omit<Artwork, 'id' | 'created_at'>): Promise<Artwork> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newArtwork: Artwork = {
        id: Math.random().toString(36).substring(2, 10),
        created_at: new Date().toISOString(),
        ...artworkData
      };
      
      mockArtworks.push(newArtwork);
      return newArtwork;
    },
      
    updateArtwork: async (id: string, artworkData: Partial<Artwork>): Promise<Artwork | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockArtworks.findIndex(artwork => artwork.id === id);
      if (index === -1) return undefined;
      
      mockArtworks[index] = { ...mockArtworks[index], ...artworkData };
      return mockArtworks[index];
    },
      
    deleteArtwork: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockArtworks.findIndex(artwork => artwork.id === id);
      if (index === -1) return false;
      
      mockArtworks.splice(index, 1);
      return true;
    }
  };
  
  // Service projets
  export const projectService = {
    getProjects: async (): Promise<Project[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockProjects];
    },
    
    getProjectById: async (id: string): Promise<Project | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockProjects.find(project => project.id === id);
    }
  };
  
  // Service contacts
  export const contactService = {
    getContacts: async (): Promise<Contact[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockContacts];
    },
    
    getContactById: async (id: string): Promise<Contact | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockContacts.find(contact => contact.id === id);
    }
  };
  
  // Services pour les catégories
  export const categoryService = {
    // Méthodes existantes
    getArtworkCategories: async (): Promise<ArtworkCategory[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockArtworkCategories];
    },
    
    getProjectCategories: async (): Promise<ProjectCategory[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockProjectCategories];
    },
    
    getContactCategories: async (): Promise<ContactCategory[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockContactCategories];
    },
    
    // Nouvelles méthodes pour les catégories de projet
    createProjectCategory: async (data: { name: string, description?: string }): Promise<ProjectCategory> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCategory: ProjectCategory = {
        id: Math.random().toString(36).substring(2, 10),
        name: data.name,
        description: data.description || "",
        created_at: new Date().toISOString()
      };
      
      mockProjectCategories.push(newCategory);
      return newCategory;
    },
    
    updateProjectCategory: async (id: string, data: { name?: string, description?: string }): Promise<ProjectCategory | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockProjectCategories.findIndex(category => category.id === id);
      if (index === -1) return undefined;
      
      mockProjectCategories[index] = { ...mockProjectCategories[index], ...data };
      return mockProjectCategories[index];
    },
    
    deleteProjectCategory: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockProjectCategories.findIndex(category => category.id === id);
      if (index === -1) return false;
      
      mockProjectCategories.splice(index, 1);
      return true;
    },
    
    // Nouvelles méthodes pour les catégories de contact
    createContactCategory: async (data: { name: string, description?: string }): Promise<ContactCategory> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCategory: ContactCategory = {
        id: Math.random().toString(36).substring(2, 10),
        name: data.name,
        description: data.description || "",
        created_at: new Date().toISOString()
      };
      
      mockContactCategories.push(newCategory);
      return newCategory;
    },
    
    updateContactCategory: async (id: string, data: { name?: string, description?: string }): Promise<ContactCategory | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockContactCategories.findIndex(category => category.id === id);
      if (index === -1) return undefined;
      
      mockContactCategories[index] = { ...mockContactCategories[index], ...data };
      return mockContactCategories[index];
    },
    
    deleteContactCategory: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockContactCategories.findIndex(category => category.id === id);
      if (index === -1) return false;
      
      mockContactCategories.splice(index, 1);
      return true;
    }
  };
  
  // Nouveau service pour les statuts d'œuvres
  export const workStatusService = {
    getWorkStatuses: async (): Promise<WorkStatusWithDescription[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockWorkStatuses];
    },
    
    getWorkStatusById: async (id: string): Promise<WorkStatusWithDescription | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockWorkStatuses.find(status => status.id === id);
    },
    
    createWorkStatus: async (data: { name: string, description?: string }): Promise<WorkStatusWithDescription> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newStatus: WorkStatusWithDescription = {
        id: data.name.toLowerCase().replace(/\s+/g, '_'),
        name: data.name,
        description: data.description || "",
        created_at: new Date().toISOString()
      };
      
      mockWorkStatuses.push(newStatus);
      return newStatus;
    },
    
    updateWorkStatus: async (id: string, data: { name?: string, description?: string }): Promise<WorkStatusWithDescription | undefined> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockWorkStatuses.findIndex(status => status.id === id);
      if (index === -1) return undefined;
      
      mockWorkStatuses[index] = { 
        ...mockWorkStatuses[index], 
        ...data,
        // Mettre à jour l'id si le nom change
        ...(data.name ? { id: data.name.toLowerCase().replace(/\s+/g, '_') } : {})
      };
      
      return mockWorkStatuses[index];
    },
    
    deleteWorkStatus: async (id: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockWorkStatuses.findIndex(status => status.id === id);
      if (index === -1) return false;
      
      mockWorkStatuses.splice(index, 1);
      return true;
    }
  };
  
  // Export des données mockées mis à jour
  export {
    mockUsers,
    mockArtworks,
    mockProjects,
    mockContacts,
    mockArtworkCategories,
    mockProjectCategories,
    mockContactCategories,
    mockWorkStatuses
  };