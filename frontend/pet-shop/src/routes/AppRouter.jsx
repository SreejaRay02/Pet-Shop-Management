import React, { useEffect, Suspense } from 'react';
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
const HomePage = React.lazy(() => import('../pages/public/Home'));
const CatalogPage = React.lazy(() => import('../pages/public/PetCatalog'));
const PetDetailPage = React.lazy(() => import('../pages/public/PetDetailPage'));
const LoginPage = React.lazy(() => import('../pages/auth/Login'));
const RegisterPage = React.lazy(() => import('../pages/auth/Register'));
const NotFoundPage = React.lazy(() => import('../pages/public/MiscPages').then(m => ({ default: m.NotFoundPage })));
const UnauthorizedPage = React.lazy(() => import('../pages/public/MiscPages').then(m => ({ default: m.UnauthorizedPage })));
const AboutPage = React.lazy(() => import('../pages/public/MiscPages').then(m => ({ default: m.AboutPage })));

// Admin Pages
const AdminDashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const ManagePets = React.lazy(() => import('../pages/admin/ManagePets'));
const ManageCategories = React.lazy(() => import('../pages/admin/ManageCategories'));
const ManageCustomers = React.lazy(() => import('../pages/admin/ManageCustomers'));
const ManageAddresses = React.lazy(() => import('../pages/admin/ManageAddresses'));
const ManageSuppliers = React.lazy(() => import('../pages/admin/ManageSuppliers'));
const ManageEmployees = React.lazy(() => import('../pages/admin/ManageEmployees'));
const ManageVaccinations = React.lazy(() => import('../pages/admin/ManageVaccinations'));
const ManageGrooming = React.lazy(() => import('../pages/admin/ManageGrooming'));
const ManageFoods = React.lazy(() => import('../pages/admin/ManageFoods'));
const ManageTransactions = React.lazy(() => import('../pages/admin/ManageTransactions'));

// Customer Pages
const CustomerProfile = React.lazy(() => import('../pages/customer/Profile'));
const MyPets = React.lazy(() => import('../pages/customer/MyPets'));
const MyTransactions = React.lazy(() => import('../pages/customer/MyTransactions'));

// Supplier Pages
const SupplierDashboard = React.lazy(() => import('../pages/supplier/Dashboard'));
const Inventory = React.lazy(() => import('../pages/supplier/Inventory'));

// Employee Pages
const EmployeeDashboard = React.lazy(() => import('../pages/employee/Dashboard'));

export default function AppRouter() {
  const restoreSession = useAuthStore((s) => s.restoreSession);
  
  // When the app loads, check if we have a saved login session
  useEffect(() => { 
    restoreSession(); 
  }, [restoreSession]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary"></div></div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

