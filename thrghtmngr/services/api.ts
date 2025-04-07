/**
 * Point d'entrée principal pour les services API
 * Ce fichier réexporte les services spécifiques pour maintenir la compatibilité
 * avec le code existant pendant la transition.
 * 
 * DÉPRÉCIÉ: Utilisez plutôt les services spécifiques directement:
 * - services/user.service.ts
 * - services/artwork.service.ts
 * - services/project.service.ts
 */

// Réexportation des services pour assurer la compatibilité avec le code existant
import * as userServiceFunctions from './user.service';
import * as artworkServiceFunctions from './artwork.service';
import * as projectServiceFunctions from './project.service';

// Réexportation des données mockées depuis leur nouvel emplacement (pour la compatibilité)
export { 
  mockUsers,
  mockArtworks,
  mockProjects,
  mockContacts,
  mockArtworkCategories,
  mockProjectCategories,
  mockContactCategories,
  mockWorkStatuses
} from '../mocks/data';

// Services ancienne API (compatibilité)
export const userService = {
  getUsers: userServiceFunctions.getUsers,
  getUserById: userServiceFunctions.getUserById,
  createUser: userServiceFunctions.createUser,
  updateUser: userServiceFunctions.updateUser,
  deleteUser: userServiceFunctions.deleteUser
};

export const artworkService = {
  getArtworks: artworkServiceFunctions.getArtworks,
  getArtworkById: artworkServiceFunctions.getArtworkById,
  getArtworksByStatus: artworkServiceFunctions.getArtworksByStatus,
  getArtworksByProject: artworkServiceFunctions.getArtworksByProject,
  createArtwork: artworkServiceFunctions.createArtwork,
  updateArtwork: artworkServiceFunctions.updateArtwork,
  deleteArtwork: artworkServiceFunctions.deleteArtwork
};

export const projectService = {
  getProjects: projectServiceFunctions.getProjects,
  getProjectById: projectServiceFunctions.getProjectById,
  getProjectsByStatus: projectServiceFunctions.getProjectsByStatus,
  createProject: projectServiceFunctions.createProject,
  updateProject: projectServiceFunctions.updateProject,
  deleteProject: projectServiceFunctions.deleteProject
};