import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Input } from '../../../components/atoms/Input';
import { FormField } from '../../../components/molecules/FormField';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getCustomerProfile } from '../../../mocks/customers';
import toast from 'react-hot-toast';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  dob: z.string().min(1, 'Date of birth is required'),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

const PersonalInformation: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    values: customer ? {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      dob: customer.dob,
    } : undefined,
  });

  const onSubmit = async (data: PersonalInfoValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Updating profile:', data);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) return <LoadingSkeleton variant="list" count={5} />;

  return (
    <Card className="animate-entrance">
      <Card.Header className="flex flex-row items-center justify-between">
        <h4 className="font-bold text-neutral-900 text-lg">Personal Details</h4>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="First Name" error={errors.firstName?.message} isRequired>
              <Input disabled={!isEditing} {...register('firstName')} />
            </FormField>
            <FormField label="Last Name" error={errors.lastName?.message} isRequired>
              <Input disabled={!isEditing} {...register('lastName')} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Email Address" error={errors.email?.message} isRequired>
              <Input type="email" disabled={!isEditing} {...register('email')} />
            </FormField>
            <FormField label="Phone Number" error={errors.phone?.message} isRequired>
              <Input disabled={!isEditing} {...register('phone')} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Date of Birth" error={errors.dob?.message} isRequired>
              <Input type="date" disabled={!isEditing} {...register('dob')} />
            </FormField>
            {customer && (
              <FormField label="Calculated Age">
                <Input
                  disabled
                  value={`${new Date().getFullYear() - new Date(customer.dob).getFullYear()} years`}
                />
              </FormField>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => { setIsEditing(false); reset(); }}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </Card.Content>
    </Card>
  );
};

export default PersonalInformation;
