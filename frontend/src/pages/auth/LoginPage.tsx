import React from 'react';
import { LoginForm } from '../../features/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
