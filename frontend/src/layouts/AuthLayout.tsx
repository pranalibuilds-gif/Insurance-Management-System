import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-soft">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Insurance Management Platform
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
