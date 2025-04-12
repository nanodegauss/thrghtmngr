/**
 * Service pour la gestion des ayants droit
 * Fournit les méthodes pour récupérer, créer, mettre à jour et supprimer des ayants droit
 */

import { 
  ArtworkRightsHolder, 
  ArtworkRightsMedia, 
  ArtworkRightsHolderWithRelations, 
  CreateDTO, 
  UpdateDTO 
} from '../types';
import { 
  mockArtworkRightsHolders, 
  mockArtworkRightsMedia, 
  mockMedia, 
  mockContacts 
} from '../mocks/data';
import { USE_MOCK_DATA, mockApiCall, generateId, generateTimestamp } from './config';

/**
 * Récupère tous les ayants droit
 * @returns Une liste d'ayants droit
 */
export async function getRightsHolders(): Promise<ArtworkRightsHolder[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockArtworkRightsHolders]);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère un ayant droit par son ID avec ses relations
 * @param id L'ID de l'ayant droit à récupérer
 * @returns L'ayant droit trouvé avec ses relations ou undefined s'il n'existe pas
 */
export async function getRightsHolderById(id: string): Promise<ArtworkRightsHolderWithRelations | undefined> {
  if (USE_MOCK_DATA) {
    const rightsHolder = mockArtworkRightsHolders.find(holder => holder.id === id);
    
    if (!rightsHolder) return undefined;
    
    // Récupérer le contact associé
    const contact = mockContacts.find(contact => contact.id === rightsHolder.contact_id);
    
    // Récupérer les médias associés
    const mediaRights = mockArtworkRightsMedia
      .filter(mediaRight => mediaRight.artwork_rights_holder_id === rightsHolder.id)
      .map(mediaRight => {
        const media = mockMedia.find(m => m.id === mediaRight.media_id);
        return {
          ...mediaRight,
          media
        };
      });
    
    return await mockApiCall({
      ...rightsHolder,
      contact,
      media_rights: mediaRights
    });
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère les ayants droit par œuvre d'art avec leurs relations
 * @param artworkId L'ID de l'œuvre d'art
 * @returns Une liste d'ayants droit avec leurs relations
 */
export async function getRightsHoldersByArtwork(artworkId: string): Promise<ArtworkRightsHolderWithRelations[]> {
  if (USE_MOCK_DATA) {
    // Récupérer tous les ayants droit de l'œuvre
    const rightsHolders = mockArtworkRightsHolders.filter(holder => holder.artwork_id === artworkId);
    
    // Pour chaque ayant droit, récupérer ses relations
    const rightsHoldersWithRelations = rightsHolders.map(holder => {
      const contact = mockContacts.find(contact => contact.id === holder.contact_id);
      
      const mediaRights = mockArtworkRightsMedia
        .filter(mediaRight => mediaRight.artwork_rights_holder_id === holder.id)
        .map(mediaRight => {
          const media = mockMedia.find(m => m.id === mediaRight.media_id);
          return {
            ...mediaRight,
            media
          };
        });
      
      return {
        ...holder,
        contact,
        media_rights: mediaRights
      };
    });
    
    return await mockApiCall(rightsHoldersWithRelations);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée un nouvel ayant droit
 * @param rightsHolderData Les données du nouvel ayant droit
 * @returns L'ayant droit créé
 */
export async function createRightsHolder(rightsHolderData: CreateDTO<ArtworkRightsHolder>): Promise<ArtworkRightsHolder> {
  if (USE_MOCK_DATA) {
    const newRightsHolder: ArtworkRightsHolder = {
      id: generateId(),
      created_at: generateTimestamp(),
      ...rightsHolderData
    };
    
    mockArtworkRightsHolders.push(newRightsHolder);
    return await mockApiCall(newRightsHolder);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour un ayant droit existant
 * @param id L'ID de l'ayant droit à mettre à jour
 * @param rightsHolderData Les données à mettre à jour
 * @returns L'ayant droit mis à jour ou undefined s'il n'existe pas
 */
export async function updateRightsHolder(id: string, rightsHolderData: UpdateDTO<ArtworkRightsHolder>): Promise<ArtworkRightsHolder | undefined> {
  if (USE_MOCK_DATA) {
    const index = mockArtworkRightsHolders.findIndex(holder => holder.id === id);
    if (index === -1) return undefined;
    
    mockArtworkRightsHolders[index] = { ...mockArtworkRightsHolders[index], ...rightsHolderData };
    return await mockApiCall(mockArtworkRightsHolders[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime un ayant droit
 * @param id L'ID de l'ayant droit à supprimer
 * @returns true si l'ayant droit a été supprimé, false sinon
 */
export async function deleteRightsHolder(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockArtworkRightsHolders.findIndex(holder => holder.id === id);
    if (index === -1) return false;
    
    mockArtworkRightsHolders.splice(index, 1);
    
    // Supprimer également les associations avec les médias
    const mediaRights = mockArtworkRightsMedia.filter(mediaRight => 
      mediaRight.artwork_rights_holder_id === id
    );
    
    mediaRights.forEach(mediaRight => {
      const mediaRightIndex = mockArtworkRightsMedia.findIndex(mr => mr.id === mediaRight.id);
      if (mediaRightIndex !== -1) {
        mockArtworkRightsMedia.splice(mediaRightIndex, 1);
      }
    });
    
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Ajoute un média à un ayant droit
 * @param rightsHolderId L'ID de l'ayant droit
 * @param mediaId L'ID du média à ajouter
 * @returns L'association créée
 */
export async function addMediaToRightsHolder(rightsHolderId: string, mediaId: string): Promise<ArtworkRightsMedia> {
  if (USE_MOCK_DATA) {
    // Vérifier que l'ayant droit existe
    const rightsHolder = mockArtworkRightsHolders.find(holder => holder.id === rightsHolderId);
    if (!rightsHolder) throw new Error("Ayant droit non trouvé");
    
    // Vérifier que le média existe
    const media = mockMedia.find(m => m.id === mediaId);
    if (!media) throw new Error("Média non trouvé");
    
    // Vérifier que l'association n'existe pas déjà
    const existingAssociation = mockArtworkRightsMedia.find(mr => 
      mr.artwork_rights_holder_id === rightsHolderId && mr.media_id === mediaId
    );
    
    if (existingAssociation) {
      return await mockApiCall(existingAssociation);
    }
    
    // Créer une nouvelle association
    const newMediaRight: ArtworkRightsMedia = {
      id: generateId(),
      artwork_rights_holder_id: rightsHolderId,
      media_id: mediaId,
      created_at: generateTimestamp()
    };
    
    mockArtworkRightsMedia.push(newMediaRight);
    return await mockApiCall(newMediaRight);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime un média d'un ayant droit
 * @param rightsHolderId L'ID de l'ayant droit
 * @param mediaId L'ID du média à supprimer
 * @returns true si l'association a été supprimée, false sinon
 */
export async function removeMediaFromRightsHolder(rightsHolderId: string, mediaId: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const mediaRightIndex = mockArtworkRightsMedia.findIndex(mr => 
      mr.artwork_rights_holder_id === rightsHolderId && mr.media_id === mediaId
    );
    
    if (mediaRightIndex === -1) return false;
    
    mockArtworkRightsMedia.splice(mediaRightIndex, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Calcule le coût total des ayants droit pour une œuvre d'art
 * @param artworkId L'ID de l'œuvre d'art
 * @returns Le coût total
 */
export async function getTotalRightsCost(artworkId: string): Promise<number> {
  if (USE_MOCK_DATA) {
    const rightsHolders = mockArtworkRightsHolders.filter(holder => holder.artwork_id === artworkId);
    const totalCost = rightsHolders.reduce((total, holder) => total + holder.price, 0);
    return await mockApiCall(totalCost);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère le nombre d'ayants droit pour une œuvre d'art
 * @param artworkId L'ID de l'œuvre d'art
 * @returns Le nombre d'ayants droit
 */
export async function getRightsHolderCount(artworkId: string): Promise<number> {
  if (USE_MOCK_DATA) {
    const rightsHolders = mockArtworkRightsHolders.filter(holder => holder.artwork_id === artworkId);
    return await mockApiCall(rightsHolders.length);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}