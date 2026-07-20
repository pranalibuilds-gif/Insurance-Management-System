import React from 'react';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { FileText, ExternalLink, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const documentTypes = [
  { id: 'aadhaar', label: 'Aadhaar Card', status: 'VERIFIED', date: '2026-02-10' },
  { id: 'pan', label: 'PAN Card', status: 'VERIFIED', date: '2026-02-10' },
  { id: 'license', label: 'Driving License', status: 'PENDING', date: '2026-03-15' },
  { id: 'passport', label: 'Passport', status: 'NOT_SUBMITTED', date: null },
  { id: 'medical', label: 'Medical Report', status: 'REJECTED', date: '2026-03-18', reason: 'Document image was blurry.' },
];

const ProfileDocuments: React.FC = () => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'VERIFIED': return { variant: 'success', icon: <CheckCircle2 className="h-4 w-4" /> };
      case 'PENDING': return { variant: 'warning', icon: <Clock className="h-4 w-4" /> };
      case 'REJECTED': return { variant: 'danger', icon: <XCircle className="h-4 w-4" /> };
      default: return { variant: 'neutral', icon: null };
    }
  };

  return (
    <div className="space-y-6 animate-entrance">
      <div className="flex justify-between items-center px-2">
        <h4 className="font-bold text-neutral-900 text-lg">Documents Summary</h4>
        <Link to="/portal/documents">
          <Button variant="outline" size="sm">
            Manage All Documents <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((doc) => {
          const config = getStatusConfig(doc.status);
          return (
            <Card key={doc.id} className="relative group">
              <Card.Content className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">{doc.label}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={config.variant as any} size="sm" className="flex items-center gap-1 normal-case font-medium">
                          {config.icon} {doc.status.replace('_', ' ')}
                        </Badge>
                        {doc.date && <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">{new Date(doc.date).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </div>
                </div>
                {doc.status === 'REJECTED' && (
                  <p className="mt-4 p-3 bg-danger-50 rounded-lg text-danger-700 text-xs border border-danger-100">
                    <span className="font-bold">Rejection Reason:</span> {doc.reason}
                  </p>
                )}
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDocuments;
