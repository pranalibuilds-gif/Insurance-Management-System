import React from 'react';
import { CheckCircle2, XCircle, Info, UserCheck, Calendar, FileCheck, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ProductEligibility } from '../../types/product';

interface EligibilitySummaryProps {
  eligibility: ProductEligibility;
  customerAge?: number;
  isKYCVerified?: boolean;
  hasDocuments?: boolean;
  className?: string;
}

export const EligibilitySummary: React.FC<EligibilitySummaryProps> = ({
  eligibility,
  customerAge,
  isKYCVerified,
  hasDocuments,
  className,
}) => {
  const checkAge = customerAge ? (customerAge >= eligibility.minAge && customerAge <= eligibility.maxAge) : null;

  const requirements = [
    {
      label: `Age between ${eligibility.minAge} - ${eligibility.maxAge} years`,
      status: checkAge,
      icon: Calendar,
    },
    {
      label: eligibility.requiresKYC ? 'KYC Verification Required' : 'KYC Not Required',
      status: isKYCVerified ?? null,
      icon: UserCheck,
    },
    {
      label: 'Residency: ' + eligibility.residencyType,
      status: true, // Mocked as true
      icon: MapPin,
    },
    {
      label: 'Required Documents Uploaded',
      status: hasDocuments ?? null,
      icon: FileCheck,
    },
  ];

  return (
    <div className={cn('bg-neutral-50 rounded-2xl border border-neutral-100 p-6', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-brand-600" />
        <h4 className="font-bold text-neutral-900">Eligibility Requirements</h4>
      </div>

      <div className="space-y-4">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-neutral-100 shadow-sm group-hover:border-brand-100 transition-colors">
                <req.icon className="h-4 w-4 text-neutral-500 group-hover:text-brand-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-neutral-600">{req.label}</span>
            </div>

            {req.status === true && <CheckCircle2 className="h-5 w-5 text-success-500" />}
            {req.status === false && <XCircle className="h-5 w-5 text-danger-500" />}
            {req.status === null && <div className="h-5 w-5 rounded-full border-2 border-neutral-200" />}
          </div>
        ))}
      </div>
    </div>
  );
};
