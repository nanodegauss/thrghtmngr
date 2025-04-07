/**
 * Types et interfaces pour l'application THRGHTMNGR
 * Contient toutes les définitions de types principaux utilisés dans l'application
 */

/**
 * Rôles d'utilisateurs disponibles dans l'application
 */
export type UserRole = "admin" | "user" | "viewer";

/**
 * Statuts possibles pour les projets
 */
export type ProjectStatus = "planning" | "active" | "completed" | "cancelled";

/**
 * Statuts possibles pour les œuvres d'art
 */
export type ArtworkStatus = "available" | "on_display" | "stored" | "on_loan";

/**
 * Base commune pour les entités avec métadonnées de création
 */
export interface BaseEntity {
  id: string;
  created_at: string;
  created_by?: string;
}

/**
 * Base commune pour les catégories
 */
export interface BaseCategory extends BaseEntity {
  name: string;
  description?: string;
}

/**
 * Représente un utilisateur du système
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
  password?: string; // Optionnel côté client
  role: UserRole;
  department: string;
  active: boolean;
}

/**
 * Représente un projet artistique
 */
export interface Project extends BaseEntity {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  category_id: string;
  budget: number;
  status: ProjectStatus;
  created_by: string;
}

/**
 * Représente une œuvre d'art
 */
export interface Artwork extends BaseEntity {
  title: string;
  author: string;
  period: string;
  origin: string;
  exhibition_number: string;
  reference: string;
  image_url: string;
  project_id: string;
  category_id: string;
  status: ArtworkStatus;
  created_by: string;
}

/**
 * Représente un contact (institution, personne, etc.)
 */
export interface Contact extends BaseEntity {
  name: string;
  contact_person: string;
  email: string;
  address: string;
  phone: string;
  notes: string;
  category_id: string;
  created_by: string;
}

/**
 * Représente un média (type de support pour les droits)
 */
export interface Media extends BaseEntity {
  name: string;
  created_by: string;
}

/**
 * Représente un détenteur de droits pour une œuvre
 */
export interface ArtworkRightsHolder extends BaseEntity {
  artwork_id: string;
  contact_id: string;
  price: number;
}

/**
 * Association entre un détenteur de droits et un média
 */
export interface ArtworkRightsMedia extends BaseEntity {
  artwork_rights_holder_id: string;
  media_id: string;
}

/**
 * Représente une tâche associée à une œuvre
 */
export interface Task extends BaseEntity {
  artwork_id: string;
  description: string;
  due_date: string;
  created_by: string;
}

/**
 * Représente une entrée d'historique pour les modifications d'œuvre
 */
export interface ArtworkHistory extends BaseEntity {
  artwork_id: string;
  modified_by: string;
  modified_at: string;
  modified_field: string;
  old_value: string;
  new_value: string;
}

/**
 * Représente une catégorie de projet
 */
export interface ProjectCategory extends BaseCategory {}

/**
 * Représente une catégorie d'œuvre d'art
 */
export interface ArtworkCategory extends BaseCategory {}

/**
 * Représente une catégorie de contact
 */
export interface ContactCategory extends BaseCategory {}

/**
 * Représente un champ personnalisé pour les œuvres d'art
 */
export interface ArtworkCustomField extends BaseEntity {
  field_name: string;
  field_type: string;
  department: string;
}

/**
 * Représente une valeur pour un champ personnalisé d'œuvre d'art
 */
export interface ArtworkCustomValue extends BaseEntity {
  artwork_id: string;
  field_id: string;
  value: string;
}

// Types enrichis avec les relations

/**
 * Œuvre d'art avec ses relations (projet, catégorie, créateur, etc.)
 */
export interface ArtworkWithRelations extends Artwork {
  project?: Project;
  category?: ArtworkCategory;
  creator?: User;
  rights_holders?: Array<ArtworkRightsHolderWithRelations>;
  tasks?: Array<Task>;
  history?: Array<ArtworkHistory>;
  custom_values?: Array<ArtworkCustomValueWithField>;
}

/**
 * Détenteur de droits avec ses relations (contact, droits média)
 */
export interface ArtworkRightsHolderWithRelations extends ArtworkRightsHolder {
  contact?: Contact;
  media_rights?: Array<ArtworkRightsMediaWithMedia>;
}

/**
 * Association détenteur de droits/média avec la relation média
 */
export interface ArtworkRightsMediaWithMedia extends ArtworkRightsMedia {
  media?: Media;
}

/**
 * Valeur de champ personnalisé avec la relation vers le champ
 */
export interface ArtworkCustomValueWithField extends ArtworkCustomValue {
  field?: ArtworkCustomField;
}

/**
 * Type pour les requêtes de création (omit ID et created_at)
 */
export type CreateDTO<T extends BaseEntity> = Omit<T, 'id' | 'created_at'>;

/**
 * Type pour les requêtes de mise à jour (tous les champs optionnels)
 */
export type UpdateDTO<T> = Partial<T>;