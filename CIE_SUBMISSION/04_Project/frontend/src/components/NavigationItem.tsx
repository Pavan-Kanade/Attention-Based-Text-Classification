import React from 'react';
import type { NavItem } from '../types';

interface NavigationItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left
        ${isActive
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
          : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-100'
        }
      `}
    >
      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
      <span className="truncate">{item.label}</span>
    </button>
  );
};
