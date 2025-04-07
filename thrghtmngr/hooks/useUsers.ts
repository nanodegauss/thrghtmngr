/**
 * Hooks personnalisés pour la gestion des utilisateurs avec React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../services/user.service';
import { User, CreateDTO, UpdateDTO } from '../types';

/**
 * Hook pour récupérer tous les utilisateurs
 * @returns Query object pour la liste des utilisateurs
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });
}

/**
 * Hook pour récupérer un utilisateur par son ID
 * @param id ID de l'utilisateur
 * @returns Query object pour l'utilisateur
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
    enabled: !!id
  });
}

/**
 * Hook pour créer un utilisateur
 * @returns Mutation object pour créer un utilisateur
 */
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: CreateDTO<User>) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
}

/**
 * Hook pour mettre à jour un utilisateur
 * @returns Mutation object pour mettre à jour un utilisateur
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDTO<User> }) => 
      updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['users', data.id] });
      }
    }
  });
}

/**
 * Hook pour supprimer un utilisateur
 * @returns Mutation object pour supprimer un utilisateur
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.removeQueries({ queryKey: ['users', id] });
    }
  });
}