import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  category?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  category = "Third Year B.Tech Deep Learning PBL"
}) => {
  return (
    <div className="space-y-1 pb-2 border-b border-slate-200">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-indigo-600 shrink-0" />}
        <h1 className="text-xl font-black tracking-tight text-slate-900">
          {title}
        </h1>
        {category && (
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 font-mono">
            {category}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500 font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
