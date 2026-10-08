import React from 'react';
import { AppWindow, Smile, ShieldAlert, Newspaper, MessageSquare, FileText, Share2 } from 'lucide-react';

export const Applications: React.FC = () => {
  const apps = [
    { title: "Sentiment Analysis", desc: "Evaluating customer emotion in movie & product reviews.", icon: Smile },
    { title: "Spam & Phishing Detection", desc: "Identifying malicious emails by highlighting suspicious token patterns.", icon: ShieldAlert },
    { title: "News Topic Categorization", desc: "Classifying articles into Politics, Tech, Business, or Sports.", icon: Newspaper },
    { title: "Customer Feedback Triage", desc: "Routing urgent complaints to appropriate support channels.", icon: MessageSquare },
    { title: "Legal & Medical Document Parsing", desc: "Extracting critical clauses and terms from lengthy contracts.", icon: FileText },
    { title: "Social Media Trend Mining", desc: "Analyzing real-time hashtag streams for brand monitoring.", icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <AppWindow className="w-5 h-5 text-indigo-600" />
          <span>Industry Applications of Attention-Based NLP</span>
        </h1>
        <p className="text-xs text-slate-500">
          Real-world deployment domains benefiting from interpretable sequence classification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {apps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5 hover:border-indigo-300 transition-all">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
