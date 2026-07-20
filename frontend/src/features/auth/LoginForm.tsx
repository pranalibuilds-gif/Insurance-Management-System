import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { useAuth } from '../../context/AuthContext';
import { mockLogin } from '../../mocks/auth';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const userData = await mockLogin(data.email);
      login(userData);
      toast.success('Successfully logged in!');

      if (userData.role === 'CUSTOMER') {
        navigate('/portal/dashboard');
      } else {
        navigate('/staff/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-brand-600 hover:text-brand-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign in
      </Button>
      <p className="text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-brand-600 hover:text-brand-500"
        >
          Register here
        </Link>
      </p>
    </form>
  );
};
