import React from 'react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  BookOpen,
  ShieldQuestion,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const faqs = [
  { q: 'How do I renew my policy?', a: 'You can renew any active policy 30 days before its expiry date by clicking the "Renew" button on the policy workspace.' },
  { q: 'What documents are required for a claim?', a: 'Required evidence depends on the claim type, but generally includes medical bills, incident photos, or police reports.' },
  { q: 'Can I change my nominees after purchase?', a: 'Yes, you can manage and update your nominees anytime from your Profile Workspace.' },
];

const HelpCenter: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions or reach out to our support team."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-brand-200 transition-colors">
          <Card.Content className="p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900">Live Chat</h4>
              <p className="text-xs text-neutral-500 mt-1">Chat with our support agents 24/7.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">Start Chat</Button>
          </Card.Content>
        </Card>

        <Card className="hover:border-brand-200 transition-colors">
          <Card.Content className="p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900">Call Support</h4>
              <p className="text-xs text-neutral-500 mt-1">Toll free: 1-800-IMP-SAFE</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">Call Now</Button>
          </Card.Content>
        </Card>

        <Card className="hover:border-brand-200 transition-colors">
          <Card.Content className="p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900">Knowledge Base</h4>
              <p className="text-xs text-neutral-500 mt-1">Read our guides and tutorials.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">Browse Articles</Button>
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <ShieldQuestion className="h-5 w-5 text-brand-600" />
            <h3 className="text-xl font-bold text-neutral-900">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} variant="outlined">
                <Card.Content className="p-6 space-y-2">
                  <p className="font-bold text-neutral-900">{faq.q}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            <h3 className="text-xl font-bold text-neutral-900">Popular Guides</h3>
          </div>
          <div className="space-y-3">
             {['How to file a health claim', 'Understanding Vehicle Depreciation', 'Nominee Rights & Regulations', 'Tax benefits for Life Insurance'].map(guide => (
               <div key={guide} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer group">
                  <span className="text-sm font-medium text-neutral-700">{guide}</span>
                  <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-brand-500 transition-colors" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
