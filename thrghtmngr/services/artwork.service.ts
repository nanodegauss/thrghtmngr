/**
 * Service pour la gestion des œuvres d'art
 * Fournit les méthodes pour récupérer, créer, mettre à jour et supprimer des œuvres d'art
 */

import { Artwork, ArtworkWithRelations, ArtworkStatus, CreateDTO, UpdateDTO } from '../types';
import { 
  mockArtworks, 
  mockProjects, 
  mockArtworkCategories 
} from '../mocks/data';
import { USE_MOCK_DATA, mockApiCall, generateId, generateTimestamp } from './config';

/**
 * Récupère toutes les œuvres d'art
 * @returns Une liste d'œuvres d'art
 */
export async function getArtworks(): Promise<Artwork[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockArtworks]);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère une œuvre d'art par son ID, avec ses relations
 * @param id L'ID de l'œuvre à récupérer
 * @returns L'œuvre trouvée avec ses relations ou undefined si elle n'existe pas
 */
export async function getArtworkById(id: string): Promise<ArtworkWithRelations | undefined> {
  if (USE_MOCK_DATA) {
    const artwork = mockArtworks.find(artwork => artwork.id === id);
    
    if (!artwork) return undefined;
    
    // Récupérer les relations
    const project = mockProjects.find(project => project.id === artwork.project_id);
    const category = mockArtworkCategories.find(category => category.id === artwork.category_id);
    
    return await mockApiCall({
      ...artwork,
      project,
      category
    });
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère les œuvres d'art par statut
 * @param status Le statut des œuvres à récupérer
 * @returns Une liste d'œuvres d'art ayant le statut spécifié
 */
export async function getArtworksByStatus(status: ArtworkStatus): Promise<Artwork[]> {
  if (USE_MOCK_DATA) {
    const filteredArtworks = mockArtworks.filter(artwork => artwork.status === status);
    return await mockApiCall(filteredArtworks);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère les œuvres d'art par projet
 * @param projectId L'ID du projet
 * @returns Une liste d'œuvres d'art associées au projet
 */
export async function getArtworksByProject(projectId: string): Promise<Artwork[]> {
  if (USE_MOCK_DATA) {
    const filteredArtworks = mockArtworks.filter(artwork => artwork.project_id === projectId);
    return await mockApiCall(filteredArtworks);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée une nouvelle œuvre d'art
 * @param artworkData Les données de la nouvelle œuvre
 * @returns L'œuvre créée
 */
export async function createArtwork(artworkData: CreateDTO<Artwork>): Promise<Artwork> {
  if (USE_MOCK_DATA) {
    const newArtwork: Artwork = {
      id: generateId(),
      created_at: generateTimestamp(),
      ...artworkData
    };
    
    mockArtworks.push(newArtwork);
    return await mockApiCall(newArtwork);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour une œuvre d'art existante
 * @param id L'ID de l'œuvre à mettre à jour
 * @param artworkData Les données à mettre à jour
 * @returns L'œuvre mise à jour ou undefined si elle n'existe pas
 */
export async function updateArtwork(id: string, artworkData: UpdateDTO<Artwork>): Promise<Artwork | undefined> {
  if (USE_MOCK_DATA) {
    const index = mockArtworks.findIndex(artwork => artwork.id === id);
    if (index === -1) return undefined;
    
    mockArtworks[index] = { ...mockArtworks[index], ...artworkData };
    return await mockApiCall(mockArtworks[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime une œuvre d'art
 * @param id L'ID de l'œuvre à supprimer
 * @returns true si l'œuvre a été supprimée, false sinon
 */
export async function deleteArtwork(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockArtworks.findIndex(artwork => artwork.id === id);
    if (index === -1) return false;
    
    mockArtworks.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}