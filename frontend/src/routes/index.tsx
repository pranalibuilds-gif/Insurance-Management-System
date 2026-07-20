import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { PortalLayout } from '../layouts/PortalLayout';
import { StaffLayout } from '../layouts/StaffLayout';
import { LandingLayout } from '../layouts/LandingLayout';
import { RouteGuard } from './RouteGuard';
import { Spinner } from '../components/atoms/Spinner';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const CustomerDashboard = lazy(() => import('../pages/portal/CustomerDashboard'));
const UnauthorizedPage = lazy(() => import('../pages/error/UnauthorizedPage'));

// Placeholder components
const Landing = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-6">
    <h1 className="text-5xl font-extrabold text-neutral-900 mb-6">
      Enterprise Insurance <span className="text-brand-600">Simplified.</span>
    </h1>
    <p className="text-xl text-neutral-500 max-w-2xl mb-10">
      A comprehensive platform for managing policies, claims, and customers with role-based efficiency.
    </p>
  </div>
);

const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <div className="p-12 border-2 border-dashed border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400">
      Feature components coming soon...
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Spinner variant="fullscreen" />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="products" element={<div>Product Catalog</div>} />
          <Route path="policies" element={<div>My Policies</div>} />
          <Route path="claims" element={<div>My Claims</div>} />
          <Route path="billing" element={<div>Payment History</div>} />
          <Route path="documents" element={<div>My Documents</div>} />
          <Route path="notifications" element={<div>All Notifications</div>} />
          <Route path="profile" element={<div>Profile Settings</div>} />
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
          <Route path="policies" element={<div>Policy Management</div>} />
          <Route path="claims" element={<div>Claims Queue</div>} />
          <Route path="products" element={<div>Product Builder</div>} />
          <Route path="reports" element={<div>Reports & Analytics</div>} />
          <Route path="audit" element={<div>Audit Logs</div>} />
          <Route path="notifications" element={<div>Staff Alerts</div>} />
          <Route path="settings" element={<div>System Settings</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
