/**
 * Hooks personnalisés pour la gestion des médias avec React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMedias,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
} from '../services/media.service';
import { Media, CreateDTO, UpdateDTO } from '../types';

/**
 * Hook pour récupérer tous les médias
 * @returns Query object pour la liste des médias
 */
export function useMedias() {
  return useQuery({ 
    queryKey: ['medias'], 
    queryFn: getMedias 
  });
}

/**
 * Hook pour récupérer un média par son ID
 * @param id ID du média
 * @returns Query object pour le média
 */
export function useMedia(id: string) {
  return useQuery({
    queryKey: ['medias', id],
    queryFn: () => getMediaById(id),
    enabled: !!id
  });
}

/**
 * Hook pour créer un média
 * @returns Mutation object pour créer un média
 */
export function useCreateMedia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (mediaData: CreateDTO<Media>) => createMedia(mediaData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medias'] });
    }
  });
}

/**
 * Hook pour mettre à jour un média
 * @returns Mutation object pour mettre à jour un média
 */
export function useUpdateMedia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDTO<Media> }) => 
      updateMedia(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['medias'] });
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['medias', data.id] });
      }
    }
  });
}

/**
 * Hook pour supprimer un média
 * @returns Mutation object pour supprimer un média
 */
export function useDeleteMedia() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['medias'] });
      queryClient.removeQueries({ queryKey: ['medias', id] });
    }
  });
}