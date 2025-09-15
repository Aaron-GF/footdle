/**
 * Normalize a search String:
* - Turn tiny
* - Eliminate accents and diacritics
 * @param {string} str
 * @returns {string}
 */
export const normalizeString = (str) => 
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();