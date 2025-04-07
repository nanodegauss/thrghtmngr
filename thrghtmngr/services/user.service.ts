/**
 * Service pour la gestion des utilisateurs
 * Fournit les méthodes pour récupérer, créer, mettre à jour et supprimer des utilisateurs
 */

import { User, CreateDTO, UpdateDTO } from '../types';
import { mockUsers } from '../mocks/data';
import { USE_MOCK_DATA, mockApiCall, generateId, generateTimestamp } from './config';

/**
 * Récupère tous les utilisateurs
 * @returns Une liste d'utilisateurs
 */
export async function getUsers(): Promise<User[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockUsers]);
  }

  // Ici, l'implémentation avec une vraie base de données quand USE_MOCK_DATA sera false
  // Par exemple: return await db.select().from(users);
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère un utilisateur par son ID
 * @param id L'ID de l'utilisateur à récupérer
 * @returns L'utilisateur trouvé ou undefined s'il n'existe pas
 */
export async function getUserById(id: string): Promise<User | undefined> {
  if (USE_MOCK_DATA) {
    const user = mockUsers.find(user => user.id === id);
    return await mockApiCall(user);
  }

  // Ici, l'implémentation avec une vraie base de données
  // Par exemple: return await db.select().from(users).where(eq(users.id, id)).first();
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée un nouvel utilisateur
 * @param userData Les données du nouvel utilisateur
 * @returns L'utilisateur créé
 */
export async function createUser(userData: CreateDTO<User>): Promise<User> {
  if (USE_MOCK_DATA) {
    const newUser: User = {
      id: generateId(),
      created_at: generateTimestamp(),
      ...userData
    };
    
    mockUsers.push(newUser);
    return await mockApiCall(newUser);
  }
  
  // Ici, l'implémentation avec une vraie base de données
  // Par exemple: return await db.insert(users).values(userData).returning();
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour un utilisateur existant
 * @param id L'ID de l'utilisateur à mettre à jour
 * @param userData Les données à mettre à jour
 * @returns L'utilisateur mis à jour ou undefined s'il n'existe pas
 */
export async function updateUser(id: string, userData: UpdateDTO<User>): Promise<User | undefined> {
  if (USE_MOCK_DATA) {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) return undefined;
    
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return await mockApiCall(mockUsers[index]);
  }
  
  // Ici, l'implémentation avec une vraie base de données
  // Par exemple: return await db.update(users).set(userData).where(eq(users.id, id)).returning();
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime un utilisateur
 * @param id L'ID de l'utilisateur à supprimer
 * @returns true si l'utilisateur a été supprimé, false sinon
 */
export async function deleteUser(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    mockUsers.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Ici, l'implémentation avec une vraie base de données
  // Par exemple: await db.delete(users).where(eq(users.id, id));
  // return true;
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}