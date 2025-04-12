/**
 * Service pour la gestion des médias (supports)
 * Fournit les méthodes pour récupérer, créer, mettre à jour et supprimer des médias
 */

import { Media, CreateDTO, UpdateDTO } from '../types';
import { mockMedia } from '../mocks/data';
import { USE_MOCK_DATA, mockApiCall, generateId, generateTimestamp } from './config';

/**
 * Récupère tous les médias
 * @returns Une liste de médias
 */
export async function getMedias(): Promise<Media[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockMedia]);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère un média par son ID
 * @param id L'ID du média à récupérer
 * @returns Le média trouvé ou undefined si il n'existe pas
 */
export async function getMediaById(id: string): Promise<Media | undefined> {
  if (USE_MOCK_DATA) {
    const media = mockMedia.find(media => media.id === id);
    return await mockApiCall(media);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée un nouveau média
 * @param mediaData Les données du nouveau média
 * @returns Le média créé
 */
export async function createMedia(mediaData: CreateDTO<Media>): Promise<Media> {
  if (USE_MOCK_DATA) {
    const newMedia: Media = {
      id: generateId(),
      created_at: generateTimestamp(),
      ...mediaData
    };
    
    mockMedia.push(newMedia);
    return await mockApiCall(newMedia);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour un média existant
 * @param id L'ID du média à mettre à jour
 * @param mediaData Les données à mettre à jour
 * @returns Le média mis à jour ou undefined s'il n'existe pas
 */
export async function updateMedia(id: string, mediaData: UpdateDTO<Media>): Promise<Media | undefined> {
  if (USE_MOCK_DATA) {
    const index = mockMedia.findIndex(media => media.id === id);
    if (index === -1) return undefined;
    
    mockMedia[index] = { ...mockMedia[index], ...mediaData };
    return await mockApiCall(mockMedia[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime un média
 * @param id L'ID du média à supprimer
 * @returns true si le média a été supprimé, false sinon
 */
export async function deleteMedia(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockMedia.findIndex(media => media.id === id);
    if (index === -1) return false;
    
    mockMedia.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}