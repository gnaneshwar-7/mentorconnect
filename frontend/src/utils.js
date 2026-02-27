// Utility functions for the application

/**
 * Create a page URL from a page name
 * @param {string} pageName - The name of the page (e.g., "Dashboard", "Mentors")
 * @returns {string} The URL path for the page
 */
export function createPageUrl(pageName) {
  if (!pageName || pageName === 'Dashboard') {
    return '/';
  }
  return `/${pageName}`;
}

/**
 * Format a date string to a readable format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
