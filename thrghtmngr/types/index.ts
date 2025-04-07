export type UserRole = "admin" | "user" | "viewer"; // À adapter selon vos besoins

// Types principaux reflétant votre structure de base de données
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optionnel côté client
  role: UserRole;
  department: string;
  active: boolean;
  created_at: string;
}

export type ProjectStatus = "planning" | "active" | "completed" | "cancelled";

export interface Project {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  category_id: string;
  budget: number;
  status: ProjectStatus;
  created_by: string;
  created_at: string;
}

export type ArtworkStatus = "available" | "on_display" | "stored" | "on_loan";

export interface Artwork {
  id: string;
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
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  address: string;
  phone: string;
  notes: string;
  category_id: string;
  created_by: string;
  created_at: string;
}

export interface Media {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface ArtworkRightsHolder {
  id: string;
  artwork_id: string;
  contact_id: string;
  price: number;
  created_at: string;
}

export interface ArtworkRightsMedia {
  id: string;
  artwork_rights_holder_id: string;
  media_id: string;
}

export interface Task {
  id: string;
  artwork_id: string;
  description: string;
  due_date: string;
  created_by: string;
  created_at: string;
}

export interface ArtworkHistory {
  id: string;
  artwork_id: string;
  modified_by: string;
  modified_at: string;
  modified_field: string;
  old_value: string;
  new_value: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface ArtworkCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface ContactCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface ArtworkCustomField {
  id: string;
  field_name: string;
  field_type: string;
  department: string;
  created_at: string;
}

export interface ArtworkCustomValue {
  id: string;
  artwork_id: string;
  field_id: string;
  value: string;
}

// Types enrichis avec les relations
export interface ArtworkWithRelations extends Artwork {
  project?: Project;
  category?: ArtworkCategory;
  creator?: User;
  rights_holders?: Array<ArtworkRightsHolderWithRelations>;
  tasks?: Array<Task>;
  history?: Array<ArtworkHistory>;
  custom_values?: Array<ArtworkCustomValueWithField>;
}

export interface ArtworkRightsHolderWithRelations extends ArtworkRightsHolder {
  contact?: Contact;
  media_rights?: Array<ArtworkRightsMediaWithMedia>;
}

export interface ArtworkRightsMediaWithMedia extends ArtworkRightsMedia {
  media?: Media;
}

export interface ArtworkCustomValueWithField extends ArtworkCustomValue {
  field?: ArtworkCustomField;
}