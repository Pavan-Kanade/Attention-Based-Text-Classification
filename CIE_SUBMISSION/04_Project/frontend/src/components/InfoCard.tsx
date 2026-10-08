import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
  badgeColor = 'bg-indigo-100 text-indigo-800'
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-indigo-600" />}
      </div>

      <div className="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span>{value}</span>
      </div>

      {badge && (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${badgeColor}`}>
          {badge}
        </span>
      )}

      {subtext && (
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};
