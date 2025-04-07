/**
 * Hooks personnalisés pour la gestion des projets avec React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjects,
  getProjectById,
  getProjectsByStatus,
  createProject,
  updateProject,
  deleteProject,
  ProjectWithCategory
} from '../services/project.service';
import { Project, CreateDTO, UpdateDTO } from '../types';

/**
 * Hook pour récupérer tous les projets
 * @returns Query object pour la liste des projets
 */
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
}

/**
 * Hook pour récupérer un projet par son ID avec sa catégorie
 * @param id ID du projet
 * @returns Query object pour le projet avec sa catégorie
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProjectById(id),
    enabled: !!id
  });
}

/**
 * Hook pour récupérer les projets par statut
 * @param status Statut à filtrer
 * @returns Query object pour les projets filtrés par statut
 */
export function useProjectsByStatus(status: string) {
  return useQuery({
    queryKey: ['projects', 'status', status],
    queryFn: () => getProjectsByStatus(status),
    enabled: !!status
  });
}

/**
 * Hook pour créer un projet
 * @returns Mutation object pour créer un projet
 */
export function useCreateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projectData: CreateDTO<Project>) => createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

/**
 * Hook pour mettre à jour un projet
 * @returns Mutation object pour mettre à jour un projet
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDTO<Project> }) => 
      updateProject(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['projects', data.id] });
      }
    }
  });
}

/**
 * Hook pour supprimer un projet
 * @returns Mutation object pour supprimer un projet
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.removeQueries({ queryKey: ['projects', id] });
    }
  });
}