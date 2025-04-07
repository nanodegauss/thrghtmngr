import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { artworkService } from '../services/api';
import { Artwork, ArtworkWithRelations, ArtworkStatus } from '../types';

// Hook pour récupérer toutes les œuvres d'art
export function useArtworks() {
  return useQuery({ 
    queryKey: ['artworks'], 
    queryFn: artworkService.getArtworks 
  });
}

// Hook pour récupérer une œuvre d'art avec ses relations
export function useArtwork(id: string) {
  return useQuery({
    queryKey: ['artworks', id],
    queryFn: () => artworkService.getArtworkById(id),
    enabled: !!id
  });
}

// Hook pour filtrer les œuvres d'art par statut
export function useArtworksByStatus(status: ArtworkStatus) {
  const { data: artworks, ...rest } = useArtworks();
  
  const filteredArtworks = artworks?.filter(
    artwork => artwork.status === status
  ) || [];
  
  return { ...rest, data: filteredArtworks };
}

// Hook pour filtrer les œuvres d'art par projet
export function useArtworksByProject(projectId: string) {
  const { data: artworks, ...rest } = useArtworks();
  
  const filteredArtworks = artworks?.filter(
    artwork => artwork.project_id === projectId
  ) || [];
  
  return { ...rest, data: filteredArtworks };
}

// Hooks de mutation (création, mise à jour, suppression)
export function useCreateArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (artworkData: Omit<Artwork, 'id' | 'created_at'>) => 
      artworkService.createArtwork(artworkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    }
  });
}

// Autres hooks de mutation...