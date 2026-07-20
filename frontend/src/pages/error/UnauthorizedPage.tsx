import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/atoms/Button';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger-50 mb-6">
        <ShieldAlert className="h-10 w-10 text-danger-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl">
        Access Denied
      </h1>
      <p className="mt-4 text-lg text-neutral-500 max-w-md mx-auto">
        Sorry, you don't have the required permissions to access this page. Please contact your administrator if you think this is a mistake.
      </p>
      <div className="mt-10 flex gap-4">
        <Link to="/">
          <Button variant="outline">Go to Home</Button>
        </Link>
        <Link to="/login">
          <Button>Login with different account</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
