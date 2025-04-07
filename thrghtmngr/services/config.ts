/**
 * Configuration pour les services API
 * Cette configuration permet de basculer facilement entre les données mockées et une vraie base de données
 */

// Si cette variable est true, l'application utilisera des données mockées
// Si elle est false, l'application utilisera une vraie base de données
export const USE_MOCK_DATA = true;

// Délai simulé pour les appels API mockés (en ms)
export const MOCK_API_DELAY = 300;

/**
 * Fonction utilitaire pour simuler un délai d'API
 * @param data Les données à retourner après le délai
 * @returns Une promesse qui se résout avec les données après le délai configuré
 */
export async function mockApiCall<T>(data: T): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
  return data;
}

/**
 * Crée un nouvel ID (UUID moqué)
 * @returns Un ID unique généré
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Crée un nouveau timestamp ISO pour les entités créées
 * @returns Une chaîne de caractères ISO représentant la date/heure actuelle
 */
export function generateTimestamp(): string {
  return new Date().toISOString();
}