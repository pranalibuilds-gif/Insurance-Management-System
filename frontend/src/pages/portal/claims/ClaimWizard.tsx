import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { FormField } from '../../../components/molecules/FormField';
import { Input } from '../../../components/atoms/Input';
import { Select } from '../../../components/atoms/Select';
import { FileDropzone } from '../../../components/molecules/FileDropzone';
import { Alert } from '../../../components/molecules/Alert';
import { getCustomerPolicies } from '../../../mocks/policies';
import { Shield, Calendar, FileText, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../../utils/cn';
import toast from 'react-hot-toast';

const ClaimWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPolicyId, setSelectedPolicyId] = useState('');

  const { data: policies, isLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: () => getCustomerPolicies('cust_1'),
  });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    toast.loading('Submitting claim...', { id: 'claim' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success('Claim submitted successfully!', { id: 'claim' });
    navigate('/portal/claims');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-entrance pb-20">
      <PageHeader
        title="File a New Claim"
        description="Please provide the following information to initiate your claim process."
      />

      {/* Mini Stepper */}
      <div className="flex items-center justify-center gap-4 py-4">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
              step === s ? "bg-brand-600 text-white" : step > s ? "bg-success-500 text-white" : "bg-neutral-100 text-neutral-400"
            )}>
              {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
            </div>
            {s < 4 && <div className="w-12 h-0.5 bg-neutral-100" />}
          </div>
        ))}
      </div>

      <Card className="min-h-[400px]">
        <Card.Content className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-entrance">
              <div className="space-y-2 text-center max-w-sm mx-auto mb-8">
                <h3 className="text-xl font-bold">Select Policy</h3>
                <p className="text-sm text-neutral-500">Which policy would you like to file a claim against?</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {policies?.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPolicyId(p.id)}
                    className={cn(
                      "p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between",
                      selectedPolicyId === p.id ? "border-brand-600 bg-brand-50" : "border-neutral-100 hover:border-neutral-200"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", selectedPolicyId === p.id ? "bg-brand-600 text-white" : "bg-neutral-100 text-neutral-400")}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">{p.productName}</p>
                        <p className="text-xs text-neutral-500">{p.policyNumber}</p>
                      </div>
                    </div>
                    {selectedPolicyId === p.id && <CheckCircle2 className="h-6 w-6 text-brand-600" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-entrance">
              <div className="space-y-2 text-center max-w-sm mx-auto mb-8">
                <h3 className="text-xl font-bold">Incident Details</h3>
                <p className="text-sm text-neutral-500">What happened and when?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField label="Incident Date" isRequired>
                    <Input type="date" />
                 </FormField>
                 <FormField label="Claim Type" isRequired>
                    <Select options={[
                      { label: 'Hospitalization', value: 'HOSP' },
                      { label: 'Accident', value: 'ACC' },
                      { label: 'Theft', value: 'THEFT' }
                    ]} placeholder="Select type" />
                 </FormField>
              </div>
              <FormField label="Description of Incident" isRequired>
                 <Input className="h-32" placeholder="Provide a detailed description of what happened..." />
              </FormField>
              <FormField label="Estimated Loss / Requested Amount ($)" isRequired>
                 <Input type="number" placeholder="0.00" />
              </FormField>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-entrance">
              <div className="space-y-2 text-center max-w-sm mx-auto mb-8">
                <h3 className="text-xl font-bold">Upload Evidence</h3>
                <p className="text-sm text-neutral-500">Please provide supporting documents or photos.</p>
              </div>
              <FileDropzone onFileSelect={() => {}} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <Alert variant="info">Medical bills (if applicable)</Alert>
                <Alert variant="info">Incident photos / Police report</Alert>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-entrance">
              <div className="space-y-2 text-center max-w-sm mx-auto mb-8">
                <h3 className="text-xl font-bold">Review Submission</h3>
                <p className="text-sm text-neutral-500">Confirm all details before submitting for investigation.</p>
              </div>
              <div className="space-y-4 max-w-lg mx-auto">
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-neutral-500">Policy</span>
                    <span className="font-bold">IMP-HEA-2026-001</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-neutral-500">Incident Type</span>
                    <span className="font-bold">Hospitalization</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-neutral-500">Requested Amount</span>
                    <span className="font-bold">$45,000</span>
                 </div>
              </div>
              <Alert variant="warning">
                Submitting fraudulent information is a criminal offense and will result in immediate termination of all policies.
              </Alert>
            </div>
          )}
        </Card.Content>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        {step === 4 ? (
          <Button onClick={handleSubmit}>Submit Claim</Button>
        ) : (
          <Button onClick={handleNext} disabled={step === 1 && !selectedPolicyId}>
            Next Step <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClaimWizard;
