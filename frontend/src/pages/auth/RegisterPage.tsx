import React from 'react';
import { RegisterForm } from '../../features/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create an account
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Join the platform to manage your insurance policies
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
