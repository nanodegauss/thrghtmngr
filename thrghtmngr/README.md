# THE RIGHT MANAGER

Une application web conçue pour simplifier la gestion et la négociation des droits d'images. Cet outil permet aux utilisateurs de suivre les projets, les œuvres d'art, les contacts (détenteurs de droits), les budgets et les tâches associées de manière centralisée et efficace.

## 🚀 Fonctionnalités

- **Authentification et rôles utilisateurs :**
  - Administrateurs : accès complet pour gérer les projets, œuvres, contacts et tâches.
  - Utilisateurs standard : gestion de leurs propres projets, œuvres et contacts.
  - Visualiseurs : accès en lecture seule.

- **Gestion de projets :**
  - Création et suivi de projets avec descriptions détaillées, calendriers, budgets et catégories.
  - Suivi budgétaire en temps réel basé sur les tarifs négociés.

- **Gestion des œuvres d'art :**
  - Gestion d'informations détaillées comme le titre, l'auteur, la période, l'origine, le numéro d'exposition, la référence et les visuels.
  - Champs personnalisés dynamiques pouvant être ajoutés ou modifiés via le panneau d'administration.
  - Suivi des modifications historiques apportées à chaque œuvre.

- **Gestion des détenteurs de droits (contacts) :**
  - Maintien d'informations de contact complètes.
  - Attribution de détenteurs de droits aux œuvres avec tarifs négociés et médias pris en charge.

- **Gestion des tâches :**
  - Ajout de tâches associées à des œuvres spécifiques avec échéances et utilisateurs assignés.

- **Système de notifications et rappels :** *(planifié)*
  - Notifications automatisées pour les échéances de tâches et les négociations de droits.

## 🛠 Technologies

- **Base de données :** Supabase (PostgreSQL) prévue pour production
- **ORM :** Drizzle ORM
- **Frontend :** Next.js avec React
- **Composants UI :** shadcn/ui avec Tailwind CSS
- **Validation des données :** Zod
- **Gestion des formulaires :** React Hook Form
- **Gestion d'état :** TanStack Query (React Query)

## 📁 Structure du projet

```bash
/
├── app/                   # Pages et routes Next.js (App Router)
│   ├── artworks/          # Pages de gestion des œuvres
│   ├── contacts/          # Pages de gestion des contacts
│   ├── projects/          # Pages de gestion des projets
│   ├── users/             # Pages de gestion des utilisateurs
│   └── ...
├── components/            # Composants UI réutilisables
│   ├── ui/                # Composants UI de base (shadcn/ui)
│   └── ...                # Composants métier spécifiques
├── drizzle/               # Configuration et schéma Drizzle ORM
├── hooks/                 # Hooks React personnalisés
│   ├── useArtworks.ts     # Hook pour les œuvres d'art
│   ├── useProjects.ts     # Hook pour les projets
│   └── ...
├── lib/                   # Utilitaires et configuration
├── mocks/                 # Données mockées pour le développement
├── public/                # Fichiers statiques
├── schemas/               # Schémas de validation Zod
├── services/              # Services API
│   ├── artwork.service.ts # Service pour les œuvres d'art
│   ├── project.service.ts # Service pour les projets
│   ├── user.service.ts    # Service pour les utilisateurs
│   └── config.ts          # Configuration des services
└── types/                 # Types et interfaces TypeScript
```

## 🚧 Démarrage rapide

### Prérequis
- Node.js (LTS)
- Compte Supabase (pour la production)

### Installation
```bash
git clone <repository-url>
cd <repository-name>
npm install
```

### Variables d'environnement
Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Lancement de l'application en mode développement

```bash
npm run dev
```

L'application sera disponible à l'adresse `http://localhost:3000`.

## 🧪 Architecture du code

### Services API

Les services API sont organisés par entité (œuvres d'art, projets, utilisateurs...) et fournissent une interface cohérente pour interagir avec les données. En mode développement, ces services utilisent des données mockées, et en production, ils utiliseront Supabase.

Exemple d'utilisation d'un service :
```typescript
import { getArtworks, getArtworkById } from '@/services/artwork.service';

// Récupérer toutes les œuvres d'art
const artworks = await getArtworks();

// Récupérer une œuvre spécifique
const artwork = await getArtworkById('123');
```

### Hooks React Query

Des hooks personnalisés sont disponibles pour chaque entité, encapsulant la logique de récupération et de mutation des données avec React Query.

Exemple d'utilisation d'un hook :
```typescript
import { useArtworks, useArtwork } from '@/hooks/useArtworks';

// Dans un composant React
function ArtworksList() {
  const { data: artworks, isLoading } = useArtworks();
  
  if (isLoading) return <p>Chargement...</p>;
  
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>{artwork.title}</li>
      ))}
    </ul>
  );
}
```

### Validation des données

Les schémas Zod sont utilisés pour valider les données dans toute l'application, assurant la cohérence et la sécurité.

Exemple d'utilisation avec React Hook Form :
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { artworkSchema } from '@/schemas';

function ArtworkForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(artworkSchema)
  });
  
  const onSubmit = (data) => {
    // Les données sont validées par Zod avant d'arriver ici
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... */}
    </form>
  );
}
```

## 🤝 Contribution

Les pull requests et les retours sont les bienvenus. Pour des changements majeurs, veuillez d'abord ouvrir une issue pour discuter de ce que vous aimeriez modifier.

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

© 2025 The Right Manager.