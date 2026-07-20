import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/organisms/Sidebar';
import { Topbar } from '../components/organisms/Topbar';
import { customerNavigation } from '../config/navigation/customer';
import { useAuth } from '../context/AuthContext';

export const PortalLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Simple breadcrumb logic based on path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: index === pathSegments.length - 1 ? undefined : `/${pathSegments.slice(0, index + 1).join('/')}`,
  }));

  const userData = user ? {
    name: user.email.split('@')[0], // Mock name
    role: user.role,
  } : null;

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <Sidebar
        items={customerNavigation.primary}
        footerItems={customerNavigation.footer}
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={logout}
        brandName="IMP Portal"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          breadcrumbs={breadcrumbs}
          user={userData}
          onMenuClick={() => setIsSidebarCollapsed(false)}
        />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
