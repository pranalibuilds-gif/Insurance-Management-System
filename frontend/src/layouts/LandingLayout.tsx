import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="h-16 border-b flex items-center justify-between px-6 lg:px-12 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <Link to="/" className="text-xl font-bold text-brand-600">
          Insurance Management Platform
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="py-12 border-t bg-neutral-50 px-6 lg:px-12 text-center">
        <p className="text-neutral-500 text-sm">
          © 2026 Insurance Management Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
