import React from 'react';
import { Menu, X, BrainCircuit } from 'lucide-react';

interface TopbarProps {
  currentPageTitle: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ currentPageTitle, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-950 text-white border-b border-slate-800 z-50 flex items-center justify-between px-4 lg:px-6 shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-800 lg:hidden text-slate-300 hover:text-white transition-colors"
          title="Toggle Navigation Menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent uppercase font-mono">
                Attention-Based Text Classification
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 text-[9px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                PBL
              </span>
            </div>
            <div className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <span className="text-slate-500 text-xs font-normal">Page:</span>
              <span className="text-indigo-400 font-semibold">{currentPageTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
