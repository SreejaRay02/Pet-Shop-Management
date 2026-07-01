export const ENDPOINTS = {
  // Authentication endpoints
  AUTH_LOGIN: '/users',
  AUTH_REGISTER: '/users',

  // Customer endpoints
  CUSTOMERS: '/customers',
  // Dynamic endpoint to get, update, or delete a specific customer
  CUSTOMER: (id) => `/customers/${id}`,

  // Address endpoints
  ADDRESSES: '/addresses',
  ADDRESS: (id) => `/addresses/${id}`,

  // Pet Categories endpoints
  CATEGORIES: '/petCategories',
  CATEGORY: (id) => `/petCategories/${id}`,

  // Pets endpoints
  PETS: '/pets',
  PET: (id) => `/pets/${id}`,

  // Grooming Services endpoints
  GROOMING: '/groomingServices',
  GROOMING_SERVICE: (id) => `/groomingServices/${id}`,

  // Vaccinations endpoints
  VACCINATIONS: '/vaccinations',
  VACCINATION: (id) => `/vaccinations/${id}`,

  // Pet Foods endpoints
  PET_FOODS: '/petFoods',
  PET_FOOD: (id) => `/petFoods/${id}`,

  // Supplier endpoints
  SUPPLIERS: '/suppliers',
  SUPPLIER: (id) => `/suppliers/${id}`,

  // Employee endpoints
  EMPLOYEES: '/employees',
  EMPLOYEE: (id) => `/employees/${id}`,

  // Transaction endpoints
  TRANSACTIONS: '/transactions',
  TRANSACTION: (id) => `/transactions/${id}`,

  // Relationship tables (Many-to-Many mappings in JSON Server)
  PET_GROOMING_REL: '/petGroomingRelationship',
  PET_VACCINATION_REL: '/petVaccinationRelationship',
  PET_FOOD_REL: '/petFoodRelationship',
  PET_SUPPLIER_REL: '/petSupplierRelationship',
  EMPLOYEE_PET_REL: '/employeePetRelationship',
};

