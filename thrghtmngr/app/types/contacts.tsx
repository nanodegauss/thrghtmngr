export interface Contacts {
    id: string
    category: "galerie" | "institution" | "photographe" | "particulier"
    contact: string
    email: string
    phone: string
    address: string
    notes: string
  }