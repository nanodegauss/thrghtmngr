/**
 * Hooks personnalisés pour la gestion des œuvres d'art avec React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getArtworks, 
  getArtworkById, 
  getArtworksByStatus, 
  getArtworksByProject,
  createArtwork,
  updateArtwork,
  deleteArtwork
} from '../services/artwork.service';
import { Artwork, ArtworkWithRelations, ArtworkStatus, CreateDTO, UpdateDTO } from '../types';

/**
 * Hook pour récupérer toutes les œuvres d'art
 * @returns Query object pour la liste des œuvres d'art
 */
export function useArtworks() {
  return useQuery({ 
    queryKey: ['artworks'], 
    queryFn: getArtworks 
  });
}

/**
 * Hook pour récupérer une œuvre d'art par son ID avec ses relations
 * @param id ID de l'œuvre d'art
 * @returns Query object pour l'œuvre d'art avec ses relations
 */
export function useArtwork(id: string) {
  return useQuery({
    queryKey: ['artworks', id],
    queryFn: () => getArtworkById(id),
    enabled: !!id
  });
}

/**
 * Hook pour récupérer les œuvres d'art par statut
 * @param status Statut à filtrer
 * @returns Query object pour les œuvres d'art filtrées par statut
 */
export function useArtworksByStatus(status: ArtworkStatus) {
  return useQuery({
    queryKey: ['artworks', 'status', status],
    queryFn: () => getArtworksByStatus(status),
    enabled: !!status
  });
}

/**
 * Hook pour récupérer les œuvres d'art par projet
 * @param projectId ID du projet
 * @returns Query object pour les œuvres d'art associées au projet
 */
export function useArtworksByProject(projectId: string) {
  return useQuery({
    queryKey: ['artworks', 'project', projectId],
    queryFn: () => getArtworksByProject(projectId),
    enabled: !!projectId
  });
}

/**
 * Hook pour créer une œuvre d'art
 * @returns Mutation object pour créer une œuvre d'art
 */
export function useCreateArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (artworkData: CreateDTO<Artwork>) => createArtwork(artworkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    }
  });
}

/**
 * Hook pour mettre à jour une œuvre d'art
 * @returns Mutation object pour mettre à jour une œuvre d'art
 */
export function useUpdateArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDTO<Artwork> }) => 
      updateArtwork(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['artworks', data.id] });
      }
    }
  });
}

/**
 * Hook pour supprimer une œuvre d'art
 * @returns Mutation object pour supprimer une œuvre d'art
 */
export function useDeleteArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteArtwork(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
      queryClient.removeQueries({ queryKey: ['artworks', id] });
    }
  });
}