/**
 * Takes a number and formats it as Indian Rupees (INR)
 * Example: 1500 -> "₹1,500"
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * Takes a date string and makes it readable.
 * Example: "2023-10-01" -> "Oct 1, 2023"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
/**
 * Gets the first letter of the first and last name to make an Avatar icon.
 * Example: ("John", "Doe") -> "JD"
 */
export const getInitials = (firstName, lastName) => {
  return `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase();
};

/**
 * Simple helper to decide what color a Chip should be based on transaction status.
 */
export const statusColor = (status) => {
  if (status === 'Success') return 'success'; // Green
  if (status === 'Failed') return 'error'; // Red 
  return 'default'; // Grey
};