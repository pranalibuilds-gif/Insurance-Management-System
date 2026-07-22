import React from 'react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { Alert } from '../../../components/molecules/Alert';
import { Bell, Globe, Moon, Shield, Download, Trash2, Mail, MessageSquare } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Settings"
        description="Customize your portal experience and communication preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Communication Preferences */}
          <Card>
            <Card.Header>
              <h3 className="font-bold text-neutral-900">Communication Preferences</h3>
            </Card.Header>
            <Card.Content className="space-y-6">
               <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                       <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">Email Notifications</p>
                      <p className="text-xs text-neutral-500">Receive policy renewals and payment receipts via email.</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-neutral-300 text-brand-600 focus:ring-brand-500" />
               </div>

               <div className="flex items-center justify-between py-2 border-t border-neutral-50 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                       <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">SMS Alerts</p>
                      <p className="text-xs text-neutral-500">Get critical claim updates and payment reminders on your phone.</p>
                    </div>
                  </div>
                  <input type="checkbox" className="h-5 w-5 rounded border-neutral-300 text-brand-600 focus:ring-brand-500" />
               </div>
            </Card.Content>
          </Card>

          {/* Regional Settings */}
          <Card>
            <Card.Header>
              <h3 className="font-bold text-neutral-900">Regional & Display</h3>
            </Card.Header>
            <Card.Content className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Globe className="h-5 w-5 text-neutral-400" />
                    <span className="text-sm font-medium">Language</span>
                  </div>
                  <Badge variant="neutral">English (US)</Badge>
               </div>
               <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                  <div className="flex items-center gap-4">
                    <Moon className="h-5 w-5 text-neutral-400" />
                    <span className="text-sm font-medium">Dark Mode</span>
                  </div>
                  <Badge variant="neutral">Coming Soon</Badge>
               </div>
            </Card.Content>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="border-brand-100 bg-brand-50/20">
              <Card.Header className="bg-transparent border-none">
                 <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                    <Download className="h-4 w-4 text-brand-600" /> Data Privacy
                 </h4>
              </Card.Header>
              <Card.Content className="space-y-4">
                 <p className="text-xs text-neutral-500 leading-relaxed">
                    Download a full copy of your account data, including policy documents and transaction history.
                 </p>
                 <Button variant="outline" size="sm" className="w-full">Download Archive</Button>
              </Card.Content>
           </Card>

           <Card className="border-danger-100 bg-danger-50/20">
              <Card.Header className="bg-transparent border-none">
                 <h4 className="font-bold text-danger-900 flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-danger-600" /> Account Termination
                 </h4>
              </Card.Header>
              <Card.Content className="space-y-4">
                 <p className="text-xs text-danger-700/60 leading-relaxed">
                    This action is irreversible. All your active policies will be cancelled and data purged.
                 </p>
                 <Button variant="danger" size="sm" className="w-full">Delete My Account</Button>
              </Card.Content>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
