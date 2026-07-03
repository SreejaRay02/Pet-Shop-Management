import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { PrivateRoute, RoleRoute } from './ProtectedRoute';

// Layouts (Headers/Footers that wrap around pages)
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import SupplierLayout from '../layouts/SupplierLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';

// Public Pages
import HomePage from '../pages/public/Home';
import CatalogPage from '../pages/public/PetCatalog';
import PetDetailPage from '../pages/public/PetDetailPage';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';
import { NotFoundPage, UnauthorizedPage, AboutPage } from '../pages/public/MiscPages';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import ManagePets from '../pages/admin/ManagePets';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageCustomers from '../pages/admin/ManageCustomers';
import ManageAddresses from '../pages/admin/ManageAddresses';
import ManageSuppliers from '../pages/admin/ManageSuppliers';
import ManageEmployees from '../pages/admin/ManageEmployees';
import ManageVaccinations from '../pages/admin/ManageVaccinations';
import ManageGrooming from '../pages/admin/ManageGrooming';
import ManageFoods from '../pages/admin/ManageFoods';
import ManageTransactions from '../pages/admin/ManageTransactions';

// Customer Pages
import CustomerProfile from '../pages/customer/Profile';
import MyPets from '../pages/customer/MyPets';
import MyTransactions from '../pages/customer/MyTransactions';

// Supplier Pages
import SupplierDashboard from '../pages/supplier/Dashboard';
import Inventory from '../pages/supplier/Inventory';

// Employee Pages
import EmployeeDashboard from '../pages/employee/Dashboard';

export default function AppRouter() {
  const restoreSession = useAuthStore((s) => s.restoreSession);
  
  // When the app loads, check if we have a saved login session
  useEffect(() => { 
    restoreSession(); 
  }, [restoreSession]);

  return (
    <BrowserRouter>
      <Routes>
        
        
        {/* PUBLIC ROUTES (Anyone can see) */}
       
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {/* The * catches any wrong URLs and shows 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        
        {/* ADMIN ROUTES (Protected) */}
        
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={['Admin']}>
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pets" element={<ManagePets />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="addresses" element={<ManageAddresses />} />
          <Route path="suppliers" element={<ManageSuppliers />} />
          <Route path="employees" element={<ManageEmployees />} />
          <Route path="vaccinations" element={<ManageVaccinations />} />
          <Route path="grooming" element={<ManageGrooming />} />
          <Route path="foods" element={<ManageFoods />} />
          <Route path="transactions" element={<ManageTransactions />} />
        </Route>

       
        {/* CUSTOMER ROUTES (Protected) */}
        
        <Route
          path="/customer"
          element={
            <RoleRoute allowedRoles={['Customer']}>
              <CustomerLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="my-pets" element={<MyPets />} />
          <Route path="transactions" element={<MyTransactions />} />
          <Route path="catalog" element={<CatalogPage />} />
        </Route>

        {/* SUPPLIER ROUTES (Protected) */}
        
        <Route
          path="/supplier"
          element={
            <RoleRoute allowedRoles={['Supplier']}>
              <SupplierLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SupplierDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="catalog" element={<CatalogPage />} />
        </Route>
        
        {/* EMPLOYEE ROUTES (Protected) */}
        
        <Route
          path="/employee"
          element={
            <RoleRoute allowedRoles={['Employee']}>
              <EmployeeLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

