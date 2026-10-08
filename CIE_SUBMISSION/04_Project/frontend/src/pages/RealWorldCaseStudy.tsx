import React from 'react';
import { Building2, MessageSquare, TrendingUp, AlertCircle, Headphones } from 'lucide-react';

export const RealWorldCaseStudy: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600" />
          <span>Real-World Case Study: E-Commerce Feedback Analysis</span>
        </h1>
        <p className="text-xs text-slate-500">
          Deploying Attention-Based Text Classification for automated customer feedback triage and brand sentiment monitoring.
        </p>
      </div>

      {/* Case Study Pipeline Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800">End-to-End Operational Pipeline</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-700 space-y-1">
            <MessageSquare className="w-5 h-5 text-indigo-600 mx-auto" />
            <div>1. Customer Review</div>
            <div className="text-[10px] text-slate-400 font-mono">Raw Feedback Text</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-700 space-y-1">
            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 mx-auto flex items-center justify-center font-bold text-[10px]">2</div>
            <div>NLP Preprocessing</div>
            <div className="text-[10px] text-slate-400 font-mono">Clean & Tokenize</div>
          </div>

          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 font-bold text-indigo-900 space-y-1">
            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white mx-auto flex items-center justify-center font-bold text-[10px]">3</div>
            <div>Attention Model</div>
            <div className="text-[10px] text-indigo-600 font-mono">Token Heatmap & BiLSTM</div>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 font-bold text-purple-900 space-y-1">
            <div className="w-5 h-5 rounded-full bg-purple-600 text-white mx-auto flex items-center justify-center font-bold text-[10px]">4</div>
            <div>Sentiment Class</div>
            <div className="text-[10px] text-purple-600 font-mono">Positive vs Negative</div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 font-bold text-emerald-900 space-y-1">
            <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto" />
            <div>5. Business Action</div>
            <div className="text-[10px] text-emerald-600 font-mono">Support Ticket Priority</div>
          </div>
        </div>
      </div>

      {/* Practical Industry Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Support Ticket Prioritization</h3>
          <p className="text-xs text-slate-500">
            Automatically routes urgent negative feedback containing high-attention dissatisfaction keywords directly to senior customer support reps.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 w-fit">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Social Media & Brand Monitoring</h3>
          <p className="text-xs text-slate-500">
            Monitors real-time tweet streams and product reviews to gauge sentiment trends during new product launches.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 w-fit">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Root-Cause Feature Diagnostics</h3>
          <p className="text-xs text-slate-500">
            Examines high-attention tokens across negative reviews to pinpoint specific product defects (e.g. "battery", "delivery", "slow").
          </p>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
        <strong>Academic Disclaimer:</strong> This Third-Year B.Tech PBL application represents a functional proof-of-concept prototype. Commercial production deployment would require domain-specific fine-tuning and safety filters.
      </div>
    </div>
  );
};
