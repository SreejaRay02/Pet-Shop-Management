import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import EmployeeLayout from '../layouts/EmployeeLayout';

import HomePage from '../pages/public/Home';
import CatalogPage from '../pages/public/PetCatalog';
import PetDetailPage from '../pages/public/PetDetailPage';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';
import { NotFoundPage, UnauthorizedPage, AboutPage } from '../pages/public/MiscPages';

import ManagePets from '../pages/admin/ManagePets';
import ManageCategories from '../pages/admin/ManageCategories';
import ManageCustomers from '../pages/admin/ManageCustomers';
import ManageAddresses from '../pages/admin/ManageAddresses';
import ManageSuppliers from '../pages/admin/ManageSuppliers';
import ManageEmployees from '../pages/admin/ManageEmployees';
import ManageGrooming from '../pages/admin/ManageGrooming';
import ManageFoods from '../pages/admin/ManageFoods';

import CustomerProfile from '../pages/customer/Profile';
import EmployeeDashboard from '../pages/employee/Dashboard';

function RequireRole({ allowedRoles, children }) {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace state={{ from: location }} />;
  }

  return children || <Outlet />;
}

export default function AppRouter() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => { 
    restoreSession(); 
  }, [restoreSession]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <RequireRole allowedRoles={['Admin']}>
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="pets" replace />} />
          <Route path="dashboard" element={<Navigate to="pets" replace />} />
          <Route path="pets" element={<ManagePets />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="addresses" element={<ManageAddresses />} />
          <Route path="suppliers" element={<ManageSuppliers />} />
          <Route path="employees" element={<ManageEmployees />} />
          <Route path="grooming" element={<ManageGrooming />} />
          <Route path="foods" element={<ManageFoods />} />
        </Route>

        <Route
          path="/customer"
          element={
            <RequireRole allowedRoles={['Customer']}>
              <CustomerLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="my-pets" element={<Navigate to="profile" replace />} />
          <Route path="transactions" element={<Navigate to="profile" replace />} />
        </Route>

        <Route
          path="/employee"
          element={
            <RequireRole allowedRoles={['Employee']}>
              <EmployeeLayout />
            </RequireRole>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
        </Route>

        <Route path="/supplier" element={<Navigate to="/unauthorized" replace />} />
        <Route path="/supplier/*" element={<Navigate to="/unauthorized" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
