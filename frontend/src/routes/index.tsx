import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { PortalLayout } from '../layouts/PortalLayout';
import { StaffLayout } from '../layouts/StaffLayout';
import { RouteGuard } from './RouteGuard';

// Placeholder components
const Landing = () => <div>Landing Page</div>;
const Login = () => <div>Login Page</div>;
const Dashboard = () => <div>Dashboard</div>;
const Unauthorized = () => <div>Unauthorized</div>;

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register Page</div>} />
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
        {/* ... other customer routes */}
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
        {/* ... other staff routes */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
