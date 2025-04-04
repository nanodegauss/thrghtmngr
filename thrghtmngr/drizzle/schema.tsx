// src/lib/schema.ts

import { pgTable, text, uuid, boolean, numeric, timestamp, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

//----------------------------------------------
// USERS
//----------------------------------------------
export const users = pgTable("users", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'admin' | 'utilisateur' | 'viewer'
  department: text("department"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// PROJECT CATEGORIES
//----------------------------------------------
export const projectCategories = pgTable("project_categories", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// PROJECTS
//----------------------------------------------
export const projects = pgTable("projects", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  categoryId: uuid("category_id"),
  budget: numeric("budget"),
  status: text("status").default("actif"), // 'actif' | 'inactif' | 'archivé'
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// ARTWORK CATEGORIES
//----------------------------------------------
export const artworkCategories = pgTable("artwork_categories", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// ARTWORKS
//----------------------------------------------
export const artworks = pgTable("artworks", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  title: text("title"),
  author: text("author"),
  period: text("period"),
  origin: text("origin"),
  exhibitionNumber: text("exhibition_number"),
  reference: text("reference"),
  imageUrl: text("image_url"),
  projectId: uuid("project_id"),
  categoryId: uuid("category_id"),
  status: text("status"),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// CONTACT CATEGORIES
//----------------------------------------------
export const contactCategories = pgTable("contact_categories", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// CONTACTS
//----------------------------------------------
export const contacts = pgTable("contacts", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  name: text("name"),
  contactPerson: text("contact_person"),
  email: text("email"),
  address: text("address"),
  phone: text("phone"),
  notes: text("notes"),
  categoryId: uuid("category_id"),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// MEDIA
//----------------------------------------------
export const media = pgTable("media", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  name: text("name"),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// ARTWORK_RIGHTS_HOLDERS
//----------------------------------------------
export const artworkRightsHolders = pgTable("artwork_rights_holders", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  artworkId: uuid("artwork_id"),
  contactId: uuid("contact_id"),
  price: numeric("price"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// ARTWORK_RIGHTS_MEDIA
//----------------------------------------------
export const artworkRightsMedia = pgTable("artwork_rights_media", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  artworkRightsHolderId: uuid("artwork_rights_holder_id"),
  mediaId: uuid("media_id"),
});

//----------------------------------------------
// TASKS
//----------------------------------------------
export const tasks = pgTable("tasks", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  artworkId: uuid("artwork_id"),
  description: text("description"),
  dueDate: date("due_date"),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// ARTWORKS_HISTORY
//----------------------------------------------
export const artworksHistory = pgTable("artworks_history", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  artworkId: uuid("artwork_id"),
  modifiedBy: uuid("modified_by"),
  modifiedAt: timestamp("modified_at").default(sql`now()`),
  modifiedField: text("modified_field"),
  oldValue: text("old_value"),
  newValue: text("new_value"),
});

//----------------------------------------------
// PROJECT_CATEGORIES
//----------------------------------------------
// Déjà défini plus haut ( projectCategories )
// inclus dans l'ER diagram

//----------------------------------------------
// ARTWORK_CUSTOM_FIELDS
//----------------------------------------------
export const artworkCustomFields = pgTable("artwork_custom_fields", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  fieldName: text("field_name"),
  fieldType: text("field_type"),
  department: text("department"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

//----------------------------------------------
// ARTWORK_CUSTOM_VALUES
//----------------------------------------------
export const artworkCustomValues = pgTable("artwork_custom_values", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
  artworkId: uuid("artwork_id"),
  fieldId: uuid("field_id"),
  value: text("value"),
});
