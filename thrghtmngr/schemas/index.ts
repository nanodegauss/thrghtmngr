/**
 * Schémas de validation pour les entités principales de l'application
 * Utilise Zod pour définir des schémas de validation typés
 */

import { z } from 'zod';
import { ArtworkStatus, ProjectStatus, UserRole } from '../types';

/**
 * Schéma pour la validation d'un utilisateur
 */
export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }).optional(),
  role: z.enum(['admin', 'user', 'viewer'] as const, {
    errorMap: () => ({ message: "Rôle invalide" })
  }),
  department: z.string().min(2, { message: "Le département doit contenir au moins 2 caractères" }),
  active: z.boolean().default(true),
  created_at: z.string().optional()
});

/**
 * Schéma pour la validation d'un projet
 */
export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
  description: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  category_id: z.string(),
  budget: z.number().positive({ message: "Le budget doit être un montant positif" }).optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled'] as const, {
    errorMap: () => ({ message: "Statut invalide" })
  }),
  created_by: z.string().optional(),
  created_at: z.string().optional()
}).refine(data => {
  if (data.end_date && data.start_date) {
    return new Date(data.end_date) >= new Date(data.start_date);
  }
  return true;
}, {
  message: "La date de fin doit être postérieure à la date de début",
  path: ["end_date"]
});

/**
 * Schéma pour la validation d'une œuvre d'art
 */
export const artworkSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Le titre est requis" }),
  author: z.string().min(1, { message: "L'auteur est requis" }),
  period: z.string().optional(),
  origin: z.string().optional(),
  exhibition_number: z.string().optional(),
  reference: z.string().optional(),
  image_url: z.string().url({ message: "URL d'image invalide" }).optional(),
  project_id: z.string().optional(),
  category_id: z.string(),
  status: z.enum(['available', 'on_display', 'stored', 'on_loan'] as const, {
    errorMap: () => ({ message: "Statut invalide" })
  }),
  created_by: z.string().optional(),
  created_at: z.string().optional()
});

/**
 * Schéma pour la validation d'un contact
 */
export const contactSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  contact_person: z.string().min(2, { message: "Le nom de la personne de contact doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  category_id: z.string(),
  created_by: z.string().optional(),
  created_at: z.string().optional()
});

/**
 * Schéma pour la validation d'une catégorie
 */
export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  description: z.string().optional(),
  created_at: z.string().optional()
});

/**
 * Schéma pour la validation du formulaire de connexion
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" })
});

/**
 * Types inférés à partir des schémas Zod
 */
export type UserFormValues = z.infer<typeof userSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type ArtworkFormValues = z.infer<typeof artworkSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;