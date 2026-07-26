import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Settings, Save, ShieldCheck, Zap, Database, Server, Lock } from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { FormField } from '../../../components/molecules/FormField';
import { Input } from '../../../components/atoms/Input';
import { Badge } from '../../../components/atoms/Badge';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getSystemConfig } from '../../../mocks/admin';

const SystemSettings: React.FC = () => {
  const { data: config, isLoading } = useQuery({
    queryKey: ['system-config'],
    queryFn: getSystemConfig,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={10} />;

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="System Configuration"
        description="Global platform settings, operational thresholds, and security parameters."
        actions={<Button><Save className="h-4 w-4 mr-2" /> Save Changes</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <Card.Header className="flex items-center gap-2">
               <Settings className="h-5 w-5 text-brand-600" />
               <h4 className="font-bold">General Information</h4>
            </Card.Header>
            <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField label="Platform Name"><Input defaultValue={config?.general.companyName} /></FormField>
               <FormField label="Support Email"><Input defaultValue={config?.general.supportEmail} /></FormField>
               <FormField label="Default Currency"><Input defaultValue={config?.general.currency} disabled /></FormField>
               <FormField label="System Timezone"><Input defaultValue={config?.general.timezone} disabled /></FormField>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header className="flex items-center gap-2">
               <Zap className="h-5 w-5 text-brand-600" />
               <h4 className="font-bold">Operational Thresholds</h4>
            </Card.Header>
            <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField label="Default SLA (Hours)" helperText="Time allowed before claim escalation."><Input type="number" defaultValue={config?.operations.slaDeadlineHrs} /></FormField>
               <FormField label="Max Upload Size (MB)"><Input type="number" defaultValue={config?.operations.maxUploadSizeMb} /></FormField>
               <FormField label="Renewal Window (Days)"><Input type="number" defaultValue={config?.operations.autoRenewalWindowDays} /></FormField>
               <FormField label="Claims Limit (Per Agent)"><Input type="number" defaultValue={config?.operations.claimLimitPerAgent} /></FormField>
            </Card.Content>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="bg-brand-900 text-white border-none shadow-xl shadow-brand-900/10">
              <Card.Header className="bg-transparent border-none">
                 <h4 className="font-bold flex items-center gap-2"><Lock className="h-5 w-5 text-brand-300" /> Security Policies</h4>
              </Card.Header>
              <Card.Content className="space-y-6">
                 <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-xs text-brand-200">MFA Requirement</span>
                    <Badge variant="brand" className="bg-white/10 border-none text-white">{config?.security.mfaRequired ? 'Enabled' : 'Disabled'}</Badge>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-xs text-brand-200">Session Timeout</span>
                    <span className="text-sm font-bold">{config?.security.sessionTimeoutMins} mins</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-xs text-brand-200">Max Login Retries</span>
                    <span className="text-sm font-bold">{config?.security.maxLoginRetries}</span>
                 </div>
                 <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-none mt-4">
                    Rotate Encryption Keys
                 </Button>
              </Card.Content>
           </Card>

           <Card>
              <Card.Header><h4 className="font-bold text-sm">Services Status</h4></Card.Header>
              <Card.Content className="space-y-4">
                 {[
                   { name: 'Core API', icon: Server, status: 'Operational' },
                   { name: 'Primary Database', icon: Database, status: 'Operational' },
                   { name: 'File Storage Cluster', icon: ShieldCheck, status: 'Operational' },
                 ].map(s => (
                   <div key={s.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <s.icon className="h-4 w-4 text-neutral-400" />
                         <span className="text-xs font-medium text-neutral-600">{s.name}</span>
                      </div>
                      <Badge variant="success" size="sm">Online</Badge>
                   </div>
                 ))}
              </Card.Content>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
