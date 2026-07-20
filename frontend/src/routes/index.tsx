import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { PortalLayout } from '../layouts/PortalLayout';
import { StaffLayout } from '../layouts/StaffLayout';
import { RouteGuard } from './RouteGuard';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));

// Placeholder components
const Landing = () => <div>Landing Page</div>;
const Dashboard = () => <div>Dashboard</div>;
const Unauthorized = () => <div>Unauthorized</div>;

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    }>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Customer Portal Routes */}
        <Route
          path="/portal"
          element={
            <RouteGuard allowedRoles={['CUSTOMER']}>
              <PortalLayout />
            </RouteGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="policies" element={<div>My Policies</div>} />
        </Route>

        {/* Staff Routes */}
        <Route
          path="/staff"
          element={
            <RouteGuard allowedRoles={['ADMIN', 'MANAGER', 'AGENT']}>
              <StaffLayout />
            </RouteGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<div>Customer Management</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
