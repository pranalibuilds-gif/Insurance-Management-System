import React from 'react';
import { Outlet } from 'react-router-dom';

export const StaffLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Placeholder Sidebar */}
      <aside className="w-64 bg-brand-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">IMP Staff</h1>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Placeholder Topbar */}
        <header className="h-16 border-b bg-white flex items-center px-8">
          <span className="text-slate-500 font-medium">Staff Workspace</span>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
