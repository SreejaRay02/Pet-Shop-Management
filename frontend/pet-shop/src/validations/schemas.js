import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const registerSchema = yup.object({
  username: yup.string().min(3).required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  role: yup.string().oneOf(['Admin', 'Supplier', 'Customer']).default('Customer'),
});

export const petSchema = yup.object({
  name: yup.string().required('Name is required'),
  breed: yup.string().required('Breed is required'),
  age: yup.number().min(0, 'Age cannot be negative').required('Age is required'),
  price: yup.number().min(0, 'Price cannot be negative').required('Price is required'),
  category_id: yup.number().required('Category is required'),
  description: yup.string(),
  image_url: yup.string().url('Must be a valid URL').nullable(),
});

export const customerSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone_number: yup.string().required('Phone number is required'),
  address_id: yup.number().required('Address is required'),
});

export const supplierSchema = yup.object({
  name: yup.string().required('Supplier name is required'),
  contact_person: yup.string().required('Contact person is required'),
  phone_number: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address_id: yup.number().nullable(),
});

export const employeeSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  position: yup.string().required('Position is required'),
  hire_date: yup.string().required('Hire date is required'),
  phone_number: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address_id: yup.number().nullable(),
  role: yup.string().oneOf(['Admin', 'Supplier']).required(),
});

export const addressSchema = yup.object({
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip_code: yup.string().required('Zip code is required'),
});

export const groomingSchema = yup.object({
  name: yup.string().required('Service name is required'),
  description: yup.string(),
  price: yup.number().min(0).required('Price is required'),
  available: yup.boolean().default(true),
});

export const vaccinationSchema = yup.object({
  name: yup.string().required('Vaccination name is required'),
  description: yup.string(),
  price: yup.number().min(0).required('Price is required'),
  available: yup.boolean().default(true),
});

export const petFoodSchema = yup.object({
  name: yup.string().required('Food name is required'),
  brand: yup.string().required('Brand is required'),
  type: yup.string().required('Type is required'),
  quantity: yup.number().min(0).required('Quantity is required'),
  price: yup.number().min(0).required('Price is required'),
});

export const transactionSchema = yup.object({
  customer_id: yup.number().required('Customer is required'),
  pet_id: yup.number().required('Pet is required'),
  transaction_date: yup.string().required('Date is required'),
  amount: yup.number().min(0).required('Amount is required'),
  transaction_status: yup.string().oneOf(['Success', 'Failed']).required('Status is required'),
});

export const categorySchema = yup.object({
  name: yup.string().required('Category name is required'),
});