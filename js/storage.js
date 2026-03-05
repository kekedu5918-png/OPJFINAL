/**
 * OPJ EXAMEN — Abstraction localStorage
 * get, set, remove, clear, exists. Migration automatique si _version change.
 * Gestion des erreurs (quota exceeded, parse errors).
 */

const STORAGE_KEY = 'opj_examen_state';

/**
 * Récupère une valeur depuis localStorage.
 * @param {string} key - Clé à lire (optionnel, défaut: STORAGE_KEY)
 * @returns {*} Valeur parsée ou null si absente / invalide
 */
function get(key) {
  if (key === undefined) key = STORAGE_KEY;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('[Storage] get parse error', e);
    return null;
  }
}

/**
 * Enregistre une valeur dans localStorage.
 * @param {*} value - Valeur sérialisable en JSON
 * @param {string} key - Clé (optionnel)
 * @returns {boolean} true si succès, false en cas d'erreur (ex: quota)
 */
function set(value, key) {
  if (key === undefined) key = STORAGE_KEY;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.warn('[Storage] QuotaExceededError');
    } else {
      console.warn('[Storage] set error', e);
    }
    return false;
  }
}

/**
 * Supprime une entrée.
 * @param {string} key - Clé à supprimer (optionnel)
 */
function remove(key) {
  if (key === undefined) key = STORAGE_KEY;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('[Storage] remove error', e);
  }
}

/**
 * Vide tout le localStorage (usage prudent).
 */
function clear() {
  try {
    localStorage.clear();
  } catch (e) {
    console.warn('[Storage] clear error', e);
  }
}

/**
 * Indique si une clé existe.
 * @param {string} key - Clé à tester (optionnel)
 * @returns {boolean}
 */
function exists(key) {
  if (key === undefined) key = STORAGE_KEY;
  try {
    return localStorage.getItem(key) !== null;
  } catch (e) {
    return false;
  }
}

/**
 * Applique une migration si la version stockée est inférieure à la version cible.
 * @param {object} data - Données chargées (avec _version)
 * @param {number} targetVersion - Version attendue
 * @param {function(object): object} migrator - Fonction (state) => newState
 * @returns {object} État après migration
 */
function migrate(data, targetVersion, migrator) {
  if (!data || typeof data._version !== 'number') return data;
  if (data._version >= targetVersion) return data;
  try {
    return migrator(data);
  } catch (e) {
    console.warn('[Storage] migration error', e);
    return data;
  }
}
window.Storage = { get, set, remove, clear, exists, migrate };
