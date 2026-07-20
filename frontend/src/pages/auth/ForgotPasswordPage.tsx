import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Alert } from '../../components/molecules/Alert';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      console.log('Password reset requested for:', data.email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success('Reset instructions sent to your email.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Forgot password?
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      {isSubmitted ? (
        <Alert variant="success" title="Email Sent">
          Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
          <div className="mt-4">
            <Link to="/login">
              <Button variant="outline" className="w-full">Back to Login</Button>
            </Link>
          </div>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Reset Password
          </Button>
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-brand-600 hover:text-brand-500"
            >
              Back to login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
