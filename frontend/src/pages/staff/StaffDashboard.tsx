import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/molecules/PageHeader';
import { AgentDashboard } from '../../features/staff-dashboard/AgentDashboard';
import { ManagerDashboard } from '../../features/staff-dashboard/ManagerDashboard';
import { AdminDashboard } from '../../features/staff-dashboard/AdminDashboard';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title={`${user.role.charAt(0) + user.role.slice(1).toLowerCase()} Dashboard`}
        description="Welcome to the Insurance Management Platform operational hub."
      />

      {user.role === 'AGENT' && <AgentDashboard />}
      {user.role === 'MANAGER' && <ManagerDashboard />}
      {user.role === 'ADMIN' && <AdminDashboard />}
    </div>
  );
};

export default StaffDashboard;
