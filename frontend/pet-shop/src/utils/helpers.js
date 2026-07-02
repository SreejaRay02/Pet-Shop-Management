/*
----------------------------------
Purpose of this file

This file contains small, reusable utility functions used throughout the app.

How it fits into the project

Whenever a component needs to format a price, slice a string, or format a date, 
it calls one of these functions instead of writing the logic from scratch.
----------------------------------
*/

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
  if (status === 'Success') return 'success'; // Green in Material UI
  if (status === 'Failed') return 'error'; // Red in Material UI
  return 'default'; // Grey
};

/*
----------------------------------
Summary
✔ Export simple, pure JavaScript functions to handle string and number formatting
----------------------------------
*/
