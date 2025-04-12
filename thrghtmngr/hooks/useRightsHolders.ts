/**
 * Hooks personnalisés pour la gestion des ayants droit avec React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getRightsHolders,
  getRightsHolderById,
  getRightsHoldersByArtwork,
  createRightsHolder,
  updateRightsHolder,
  deleteRightsHolder,
  addMediaToRightsHolder,
  removeMediaFromRightsHolder,
  getTotalRightsCost,
  getRightsHolderCount
} from '../services/rights-holder.service';
import { 
  ArtworkRightsHolder, 
  ArtworkRightsHolderWithRelations, 
  CreateDTO, 
  UpdateDTO 
} from '../types';

/**
 * Hook pour récupérer tous les ayants droit
 * @returns Query object pour la liste des ayants droit
 */
export function useRightsHolders() {
  return useQuery({ 
    queryKey: ['rights-holders'], 
    queryFn: getRightsHolders 
  });
}

/**
 * Hook pour récupérer un ayant droit par son ID avec ses relations
 * @param id ID de l'ayant droit
 * @returns Query object pour l'ayant droit avec ses relations
 */
export function useRightsHolder(id: string) {
  return useQuery({
    queryKey: ['rights-holders', id],
    queryFn: () => getRightsHolderById(id),
    enabled: !!id
  });
}

/**
 * Hook pour récupérer les ayants droit par œuvre d'art
 * @param artworkId ID de l'œuvre d'art
 * @returns Query object pour les ayants droit associés à l'œuvre d'art
 */
export function useRightsHoldersByArtwork(artworkId: string) {
  return useQuery({
    queryKey: ['rights-holders', 'artwork', artworkId],
    queryFn: () => getRightsHoldersByArtwork(artworkId),
    enabled: !!artworkId
  });
}

/**
 * Hook pour créer un ayant droit
 * @returns Mutation object pour créer un ayant droit
 */
export function useCreateRightsHolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (rightsHolderData: CreateDTO<ArtworkRightsHolder>) => createRightsHolder(rightsHolderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rights-holders'] });
      queryClient.invalidateQueries({ queryKey: ['rights-holders', 'artwork', data.artwork_id] });
      // Invalider également les requêtes liées au coût et au nombre d'ayants droit
      queryClient.invalidateQueries({ queryKey: ['artworks', 'rights', 'cost', data.artwork_id] });
      queryClient.invalidateQueries({ queryKey: ['artworks', 'rights', 'count', data.artwork_id] });
    }
  });
}

/**
 * Hook pour mettre à jour un ayant droit
 * @returns Mutation object pour mettre à jour un ayant droit
 */
export function useUpdateRightsHolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDTO<ArtworkRightsHolder> }) => 
      updateRightsHolder(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rights-holders'] });
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['rights-holders', data.id] });
        queryClient.invalidateQueries({ queryKey: ['rights-holders', 'artwork', data.artwork_id] });
        // Invalider également les requêtes liées au coût et au nombre d'ayants droit
        queryClient.invalidateQueries({ queryKey: ['artworks', 'rights', 'cost', data.artwork_id] });
        queryClient.invalidateQueries({ queryKey: ['artworks', 'rights', 'count', data.artwork_id] });
      }
    }
  });
}

/**
 * Hook pour supprimer un ayant droit
 * @returns Mutation object pour supprimer un ayant droit
 */
export function useDeleteRightsHolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, artworkId }: { id: string; artworkId: string }) => {
      const result = await deleteRightsHolder(id);
      return { success: result, artworkId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rights-holders'] });
      queryClient.removeQueries({ queryKey: ['rights-holders', data.artworkId] });
      queryClient.invalidateQueries({ queryKey: ['rights-holders', 'artwork', data.artworkId] });
      // Invalider également les requêtes liées au coût et au nombre d'ayants droit
      queryClient.invalidateQueries({ queryKey: ['artworks', 'rights', 'cost', data.artworkId] });
      queryClient.invalidateQueries({ queryKey: ['artworks', 'rights', 'count', data.artworkId] });
    }
  });
}

/**
 * Hook pour ajouter un média à un ayant droit
 * @returns Mutation object pour ajouter un média à un ayant droit
 */
export function useAddMediaToRightsHolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ rightsHolderId, mediaId }: { rightsHolderId: string; mediaId: string }) => 
      addMediaToRightsHolder(rightsHolderId, mediaId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rights-holders', variables.rightsHolderId] });
    }
  });
}

/**
 * Hook pour supprimer un média d'un ayant droit
 * @returns Mutation object pour supprimer un média d'un ayant droit
 */
export function useRemoveMediaFromRightsHolder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ rightsHolderId, mediaId }: { rightsHolderId: string; mediaId: string }) => 
      removeMediaFromRightsHolder(rightsHolderId, mediaId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rights-holders', variables.rightsHolderId] });
    }
  });
}

/**
 * Hook pour récupérer le coût total des ayants droit pour une œuvre d'art
 * @param artworkId ID de l'œuvre d'art
 * @returns Query object pour le coût total
 */
export function useTotalRightsCost(artworkId: string) {
  return useQuery({
    queryKey: ['artworks', 'rights', 'cost', artworkId],
    queryFn: () => getTotalRightsCost(artworkId),
    enabled: !!artworkId
  });
}

/**
 * Hook pour récupérer le nombre d'ayants droit pour une œuvre d'art
 * @param artworkId ID de l'œuvre d'art
 * @returns Query object pour le nombre d'ayants droit
 */
export function useRightsHolderCount(artworkId: string) {
  return useQuery({
    queryKey: ['artworks', 'rights', 'count', artworkId],
    queryFn: () => getRightsHolderCount(artworkId),
    enabled: !!artworkId
  });
}