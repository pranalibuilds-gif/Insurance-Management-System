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

const addressSchema = z.object({
  addressLine1: z.string().min(5, 'Address is too short'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Invalid postal code'),
  country: z.string().min(2, 'Country is required'),
});

type AddressValues = z.infer<typeof addressSchema>;

const AddressInformation: React.FC = () => {
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
  } = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    values: customer?.address,
  });

  const onSubmit = async (data: AddressValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Address updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update address');
    }
  };

  if (isLoading) return <LoadingSkeleton variant="list" count={5} />;

  return (
    <Card className="animate-entrance">
      <Card.Header className="flex flex-row items-center justify-between">
        <h4 className="font-bold text-neutral-900 text-lg">Residential Address</h4>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Update Address
          </Button>
        )}
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Address Line 1" error={errors.addressLine1?.message} isRequired>
            <Input disabled={!isEditing} {...register('addressLine1')} placeholder="123 Street Name" />
          </FormField>

          <FormField label="Address Line 2 (Optional)" error={errors.addressLine2?.message}>
            <Input disabled={!isEditing} {...register('addressLine2')} placeholder="Apartment, suite, etc." />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="City" error={errors.city?.message} isRequired>
              <Input disabled={!isEditing} {...register('city')} />
            </FormField>
            <FormField label="State / Province" error={errors.state?.message} isRequired>
              <Input disabled={!isEditing} {...register('state')} />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Postal / Zip Code" error={errors.postalCode?.message} isRequired>
              <Input disabled={!isEditing} {...register('postalCode')} />
            </FormField>
            <FormField label="Country" error={errors.country?.message} isRequired>
              <Input disabled={!isEditing} {...register('country')} />
            </FormField>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); reset(); }}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Save Address
              </Button>
            </div>
          )}
        </form>
      </Card.Content>
    </Card>
  );
};

export default AddressInformation;
