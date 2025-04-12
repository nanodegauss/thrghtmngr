/**
 * Service pour la gestion des catégories
 * Fournit les méthodes pour récupérer, créer, mettre à jour et supprimer des catégories
 */

import { BaseCategory, CreateDTO, UpdateDTO } from '../types';
import { mockProjectCategories, mockContactCategories, mockWorkStatuses } from '../mocks/data';
import { USE_MOCK_DATA, mockApiCall, generateId, generateTimestamp } from './config';

// Type pour les catégories de projets
export interface ProjectCategory extends BaseCategory {}

// Type pour les catégories de contacts
export interface ContactCategory extends BaseCategory {}

// Type pour les statuts des œuvres
export interface WorkStatus extends BaseCategory {}

/**
 * Récupère toutes les catégories de projets
 * @returns Une liste de catégories de projets
 */
export async function getProjectCategories(): Promise<ProjectCategory[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockProjectCategories]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère une catégorie de projet par son ID
 * @param id L'ID de la catégorie à récupérer
 * @returns La catégorie trouvée ou undefined si elle n'existe pas
 */
export async function getProjectCategoryById(id: string): Promise<ProjectCategory | undefined> {
  if (USE_MOCK_DATA) {
    const category = mockProjectCategories.find(cat => cat.id === id);
    return await mockApiCall(category);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée une nouvelle catégorie de projet
 * @param categoryData Les données de la nouvelle catégorie
 * @returns La catégorie créée
 */
export async function createProjectCategory(categoryData: CreateDTO<ProjectCategory>): Promise<ProjectCategory> {
  if (USE_MOCK_DATA) {
    const newCategory: ProjectCategory = {
      id: generateId(),
      name: categoryData.name,
      description: categoryData.description,
      created_at: generateTimestamp()
    };
    
    mockProjectCategories.push(newCategory);
    return await mockApiCall(newCategory);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour une catégorie de projet existante
 * @param id L'ID de la catégorie à mettre à jour
 * @param categoryData Les nouvelles données de la catégorie
 * @returns La catégorie mise à jour
 */
export async function updateProjectCategory(id: string, categoryData: UpdateDTO<ProjectCategory>): Promise<ProjectCategory> {
  if (USE_MOCK_DATA) {
    const index = mockProjectCategories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error(`Catégorie avec l'ID ${id} non trouvée`);
    }
    
    mockProjectCategories[index] = {
      ...mockProjectCategories[index],
      ...categoryData
    };
    
    return await mockApiCall(mockProjectCategories[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime une catégorie de projet
 * @param id L'ID de la catégorie à supprimer
 * @returns true si la suppression a réussi
 */
export async function deleteProjectCategory(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockProjectCategories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error(`Catégorie avec l'ID ${id} non trouvée`);
    }
    
    mockProjectCategories.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère toutes les catégories de contacts
 * @returns Une liste de catégories de contacts
 */
export async function getContactCategories(): Promise<ContactCategory[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockContactCategories]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée une nouvelle catégorie de contact
 * @param categoryData Les données de la nouvelle catégorie
 * @returns La catégorie créée
 */
export async function createContactCategory(categoryData: CreateDTO<ContactCategory>): Promise<ContactCategory> {
  if (USE_MOCK_DATA) {
    const newCategory: ContactCategory = {
      id: generateId(),
      name: categoryData.name,
      description: categoryData.description,
      created_at: generateTimestamp()
    };
    
    mockContactCategories.push(newCategory);
    return await mockApiCall(newCategory);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour une catégorie de contact existante
 * @param id L'ID de la catégorie à mettre à jour
 * @param categoryData Les nouvelles données de la catégorie
 * @returns La catégorie mise à jour
 */
export async function updateContactCategory(id: string, categoryData: UpdateDTO<ContactCategory>): Promise<ContactCategory> {
  if (USE_MOCK_DATA) {
    const index = mockContactCategories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error(`Catégorie avec l'ID ${id} non trouvée`);
    }
    
    mockContactCategories[index] = {
      ...mockContactCategories[index],
      ...categoryData
    };
    
    return await mockApiCall(mockContactCategories[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime une catégorie de contact
 * @param id L'ID de la catégorie à supprimer
 * @returns true si la suppression a réussi
 */
export async function deleteContactCategory(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockContactCategories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error(`Catégorie avec l'ID ${id} non trouvée`);
    }
    
    mockContactCategories.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère tous les statuts des œuvres
 * @returns Une liste de statuts d'œuvres
 */
export async function getWorkStatuses(): Promise<WorkStatus[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockWorkStatuses]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée un nouveau statut d'œuvre
 * @param statusData Les données du nouveau statut
 * @returns Le statut créé
 */
export async function createWorkStatus(statusData: CreateDTO<WorkStatus>): Promise<WorkStatus> {
  if (USE_MOCK_DATA) {
    const newStatus: WorkStatus = {
      id: generateId(),
      name: statusData.name,
      description: statusData.description,
      created_at: generateTimestamp()
    };
    
    mockWorkStatuses.push(newStatus);
    return await mockApiCall(newStatus);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour un statut d'œuvre existant
 * @param id L'ID du statut à mettre à jour
 * @param statusData Les nouvelles données du statut
 * @returns Le statut mis à jour
 */
export async function updateWorkStatus(id: string, statusData: UpdateDTO<WorkStatus>): Promise<WorkStatus> {
  if (USE_MOCK_DATA) {
    const index = mockWorkStatuses.findIndex(status => status.id === id);
    if (index === -1) {
      throw new Error(`Statut avec l'ID ${id} non trouvé`);
    }
    
    mockWorkStatuses[index] = {
      ...mockWorkStatuses[index],
      ...statusData
    };
    
    return await mockApiCall(mockWorkStatuses[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime un statut d'œuvre
 * @param id L'ID du statut à supprimer
 * @returns true si la suppression a réussi
 */
export async function deleteWorkStatus(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockWorkStatuses.findIndex(status => status.id === id);
    if (index === -1) {
      throw new Error(`Statut avec l'ID ${id} non trouvé`);
    }
    
    mockWorkStatuses.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}