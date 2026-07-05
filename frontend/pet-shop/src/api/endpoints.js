export const ENDPOINTS = {
  // Authentication endpoints
  AUTH_LOGIN: '/users',
  AUTH_REGISTER: '/users',
  USER: (id) => `/users/${id}`,

  // Customers
  CUSTOMERS: '/api/v1/customers',
  CUSTOMER: (id) => `/api/v1/customers/${id}`,
  CUSTOMER_BY_EMAIL: (email) => `/api/v1/customers/email/${email}`,
  CUSTOMER_BY_NAME: (firstName, lastName) => `/api/v1/customers/name/${firstName}/${lastName}`,
  CUSTOMER_BY_CITY: (city) => `/api/v1/customers/by_city/${city}`,
  CUSTOMER_BY_STATE: (state) => `/api/v1/customers/by_state/${state}`,
  CUSTOMER_TRANSACTIONS: (id) => `/api/v1/customers/transactions/${id}`,
  CUSTOMER_TRANSACTIONS_STATUS: (status) => `/api/v1/customers/transactions_status/${status}`,
  CUSTOMER_NO_TRANSACTIONS: '/api/v1/customers/no-transactions',
  CUSTOMER_PETS: (id) => `/api/v1/customers/pets/${id}`,

  // Addresses
  ADDRESSES: '/api/v1/address',
  ADDRESS: (id) => `/api/v1/address/${id}`,

  // Categories
  CATEGORIES: '/api/v1/categories',
  CATEGORY: (id) => `/api/v1/categories/${id}`,
  CATEGORY_BY_NAME: (name) => `/api/v1/categories/name/${name}`,

  // Pets
  PETS: '/api/v1/pets',
  PET: (id) => `/api/v1/pets/${id}`,
  PETS_BY_CATEGORY: (category) => `/api/v1/pets/category/${category}`,
  PET_GROOMING_SERVICES: (id) => `/api/v1/pets/grooming_services/${id}`,
  PET_VACCINATIONS: (id) => `/api/v1/pets/vaccinations/${id}`,
  PET_FOOD_INFO: (id) => `/api/v1/pets/food_info/${id}`,
  PET_SUPPLIERS: (id) => `/api/v1/pets/suppliers/${id}`,
  PET_TRANSACTIONS: (id) => `/api/v1/pets/transaction_history/${id}`,

  // Services (Grooming)
  SERVICES: '/api/v1/services',
  SERVICE: (id) => `/api/v1/services/${id}`,
  SERVICES_AVAILABLE: '/api/v1/services/available',
  SERVICES_UNAVAILABLE: '/api/v1/services/unavailable',

  // Vaccinations
  VACCINATIONS: '/api/v1/vaccinations',
  VACCINATION: (id) => `/api/v1/vaccinations/${id}`,
  VACCINATIONS_AVAILABLE: '/api/v1/vaccinations/available',
  VACCINATIONS_UNAVAILABLE: '/api/v1/vaccinations/unavailable',

  // Pet Foods
  PET_FOODS: '/api/v1/pet_foods',
  PET_FOOD: (id) => `/api/v1/pet_foods/${id}`,
  PET_FOOD_SEARCH: (name) => `/api/v1/pet_foods/search/${name}`,
  PET_FOOD_BY_TYPE: (type) => `/api/v1/pet_foods/food_type/${type}`,
  PET_FOOD_BY_BRAND: (brand) => `/api/v1/pet_foods/brand/${brand}`,

  // Transactions
  TRANSACTIONS: '/api/v1/transaction_history',
  TRANSACTION: (id) => `/api/v1/transaction_history/${id}`,
  TRANSACTIONS_BY_CUSTOMER: (id) => `/api/v1/transaction_history/by_customer/${id}`,
  TRANSACTIONS_SUCCESSFUL: '/api/v1/transaction_history/successful',
  TRANSACTIONS_FAILED: '/api/v1/transaction_history/failed',

  // Suppliers
  SUPPLIERS: '/api/v1/suppliers',
  SUPPLIER: (id) => `/api/v1/suppliers/${id}`,
  SUPPLIER_BY_EMAIL: (email) => `/api/v1/suppliers/email/${email}`,
  SUPPLIER_BY_NAME: (name) => `/api/v1/suppliers/name/${name}`,
  SUPPLIER_BY_CITY: (city) => `/api/v1/suppliers/city/${city}`,
  SUPPLIER_BY_STATE: (state) => `/api/v1/suppliers/state/${state}`,

  // Employees
  EMPLOYEES: '/api/v1/employees',
  EMPLOYEE: (id) => `/api/v1/employees/${id}`,
  EMPLOYEE_BY_EMAIL: (email) => `/api/v1/employees/email/${email}`,
  EMPLOYEE_BY_NAME: (name) => `/api/v1/employees/name/${name}`,
  EMPLOYEE_BY_POSITION: (position) => `/api/v1/employees/position/${position}`
};
