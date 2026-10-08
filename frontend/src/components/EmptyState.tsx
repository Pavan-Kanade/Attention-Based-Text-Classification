import React from 'react';
import { Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description = "Implementation will be added in the next project phase.",
  icon: Icon = Clock
}) => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm text-center max-w-xl mx-auto space-y-4 my-8">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold font-mono border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span>Status: Phase 1 Layout Complete</span>
        </span>
      </div>
    </div>
  );
};
