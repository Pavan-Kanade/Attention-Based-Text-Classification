import React from 'react';
import { ModelStatusPill } from './ModelStatusPill';
import { Menu, X, BrainCircuit } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-950 text-white border-b border-slate-800 z-50 flex items-center justify-between px-4 lg:px-6 shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-800 lg:hidden text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm lg:text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                ATTENTION-BASED TEXT CLASSIFICATION
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                B.Tech PBL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Understanding Which Words Matter for Sequence Classification
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ModelStatusPill />
      </div>
    </header>
  );
};
