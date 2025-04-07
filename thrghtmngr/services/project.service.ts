/**
 * Service pour la gestion des projets
 * Fournit les méthodes pour récupérer, créer, mettre à jour et supprimer des projets
 */

import { Project, ProjectCategory, CreateDTO, UpdateDTO } from '../types';
import { mockProjects, mockProjectCategories } from '../mocks/data';
import { USE_MOCK_DATA, mockApiCall, generateId, generateTimestamp } from './config';

/**
 * Interface pour un projet avec sa catégorie reliée
 */
export interface ProjectWithCategory extends Project {
  category?: ProjectCategory;
}

/**
 * Récupère tous les projets
 * @returns Une liste de projets
 */
export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK_DATA) {
    return await mockApiCall([...mockProjects]);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère un projet par son ID
 * @param id L'ID du projet à récupérer
 * @returns Le projet trouvé ou undefined s'il n'existe pas
 */
export async function getProjectById(id: string): Promise<ProjectWithCategory | undefined> {
  if (USE_MOCK_DATA) {
    const project = mockProjects.find(project => project.id === id);
    
    if (!project) return undefined;
    
    // Récupérer la catégorie associée
    const category = mockProjectCategories.find(category => category.id === project.category_id);
    
    return await mockApiCall({
      ...project,
      category
    });
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Récupère les projets par statut
 * @param status Le statut des projets à récupérer
 * @returns Une liste de projets ayant le statut spécifié
 */
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  if (USE_MOCK_DATA) {
    const filteredProjects = mockProjects.filter(project => project.status === status);
    return await mockApiCall(filteredProjects);
  }

  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Crée un nouveau projet
 * @param projectData Les données du nouveau projet
 * @returns Le projet créé
 */
export async function createProject(projectData: CreateDTO<Project>): Promise<Project> {
  if (USE_MOCK_DATA) {
    const newProject: Project = {
      id: generateId(),
      created_at: generateTimestamp(),
      ...projectData
    };
    
    mockProjects.push(newProject);
    return await mockApiCall(newProject);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Met à jour un projet existant
 * @param id L'ID du projet à mettre à jour
 * @param projectData Les données à mettre à jour
 * @returns Le projet mis à jour ou undefined s'il n'existe pas
 */
export async function updateProject(id: string, projectData: UpdateDTO<Project>): Promise<Project | undefined> {
  if (USE_MOCK_DATA) {
    const index = mockProjects.findIndex(project => project.id === id);
    if (index === -1) return undefined;
    
    mockProjects[index] = { ...mockProjects[index], ...projectData };
    return await mockApiCall(mockProjects[index]);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}

/**
 * Supprime un projet
 * @param id L'ID du projet à supprimer
 * @returns true si le projet a été supprimé, false sinon
 */
export async function deleteProject(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const index = mockProjects.findIndex(project => project.id === id);
    if (index === -1) return false;
    
    mockProjects.splice(index, 1);
    return await mockApiCall(true);
  }
  
  // Implémentation future avec la base de données
  throw new Error("Fonctionnalité non implémentée avec la base de données réelle");
}