import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Input } from '../../../components/atoms/Input';
import { FormField } from '../../../components/molecules/FormField';
import { Badge } from '../../../components/atoms/Badge';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getSessions } from '../../../mocks/customers';
import { Monitor, Smartphone, Globe, LogOut, ShieldAlert } from 'lucide-react';

const SecurityInformation: React.FC = () => {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['user-sessions'],
    queryFn: getSessions,
  });

  const getSessionIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) return Smartphone;
    return Monitor;
  };

  return (
    <div className="space-y-8 animate-entrance">
      <Card>
        <Card.Header>
          <h4 className="font-bold text-neutral-900 text-lg">Change Password</h4>
        </Card.Header>
        <Card.Content className="max-w-xl">
          <form className="space-y-4">
            <FormField label="Current Password">
              <Input type="password" placeholder="••••••••" />
            </FormField>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="New Password">
                <Input type="password" placeholder="••••••••" />
              </FormField>
              <FormField label="Confirm New Password">
                <Input type="password" placeholder="••••••••" />
              </FormField>
            </div>
            <div className="pt-4">
              <Button>Update Password</Button>
            </div>
          </form>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header className="flex flex-row items-center justify-between">
          <div>
            <h4 className="font-bold text-neutral-900 text-lg">Active Sessions</h4>
            <p className="text-xs text-neutral-500 mt-0.5">Manage your logged-in devices and locations.</p>
          </div>
          <Button variant="outline" size="sm" className="text-danger-600 hover:bg-danger-50">
            Revoke All
          </Button>
        </Card.Header>
        <Card.Content className="p-0">
          {isLoading ? (
            <div className="p-6"><LoadingSkeleton variant="list" count={3} /></div>
          ) : (
            <div className="divide-y divide-neutral-50">
              {sessions?.map((session) => {
                const Icon = getSessionIcon(session.device);
                return (
                  <div key={session.id} className="p-6 flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900">{session.device}</span>
                          {session.isCurrent && (
                            <Badge variant="success" size="sm">Current</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {session.location}</span>
                          <span>•</span>
                          <span>Last active: {session.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <Button variant="ghost" size="sm" isIconOnly className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-danger-600 transition-all">
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card.Content>
      </Card>

      <Card className="border-danger-100 bg-danger-50/20">
        <Card.Content className="p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-danger-100 flex items-center justify-center text-danger-600">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h5 className="font-bold text-neutral-900">Danger Zone</h5>
              <p className="text-sm text-neutral-500">Deactivating your account will suspend all insurance operations.</p>
            </div>
          </div>
          <Button variant="danger" size="sm">Deactivate Account</Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SecurityInformation;
