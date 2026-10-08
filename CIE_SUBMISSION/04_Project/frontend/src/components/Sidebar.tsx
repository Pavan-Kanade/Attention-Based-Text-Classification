import React from 'react';
import type { PageId, NavItem } from '../types';
import { NavigationItem } from './NavigationItem';
import { 
  LayoutDashboard, PlayCircle, Layers, Eye, Cpu, Database, 
  LineChart, BarChart3, GitCompare, BookOpen, Sparkles, Building2, 
  AppWindow, CheckCircle2, Network, Presentation, FileText, HelpCircle, BookMarked
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard, category: 'Main' },
  { id: 'single-prediction', label: '2. Single Prediction', icon: PlayCircle, category: 'Main' },
  { id: 'batch-prediction', label: '3. Batch Prediction', icon: Layers, category: 'Main' },
  { id: 'attention-visualization', label: '4. Attention Visualization', icon: Eye, category: 'Attention' },
  { id: 'how-attention-works', label: '5. How Attention Works', icon: Cpu, category: 'Attention' },
  { id: 'dataset', label: '6. Dataset', icon: Database, category: 'Model' },
  { id: 'training', label: '7. Training', icon: LineChart, category: 'Model' },
  { id: 'evaluation', label: '8. Evaluation', icon: BarChart3, category: 'Model' },
  { id: 'model-comparison', label: '9. Model Comparison', icon: GitCompare, category: 'Model' },
  { id: 'literature-survey', label: '10. Literature Survey', icon: BookOpen, category: 'Research' },
  { id: 'research-gap', label: '11. Research Gap', icon: Sparkles, category: 'Research' },
  { id: 'case-study', label: '12. Case Study', icon: Building2, category: 'Research' },
  { id: 'applications', label: '13. Applications', icon: AppWindow, category: 'Research' },
  { id: 'advantages-limitations', label: '14. Advantages & Limitations', icon: CheckCircle2, category: 'Research' },
  { id: 'project-architecture', label: '15. Project Architecture', icon: Network, category: 'Docs' },
  { id: 'ppt-content', label: '16. PPT Content', icon: Presentation, category: 'Docs' },
  { id: 'project-report', label: '17. Project Report', icon: FileText, category: 'Docs' },
  { id: 'viva-questions', label: '18. Viva Questions', icon: HelpCircle, category: 'Docs' },
  { id: 'documentation', label: '19. Documentation', icon: BookMarked, category: 'Docs' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-950 text-slate-300 border-r border-slate-800
        transform transition-transform duration-200 ease-in-out flex flex-col justify-between
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Items List */}
        <div className="p-3 space-y-1 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-indigo-400 uppercase font-mono">
            Navigation Menu (19 Pages)
          </div>
          {NAV_ITEMS.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsOpen(false);
              }}
            />
          ))}
        </div>

        {/* Sidebar Bottom Branding Card */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/60">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-0.5">
            <div className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-wider">
              Deep Learning PBL
            </div>
            <div className="text-xs font-bold text-slate-200 truncate">
              Attention-Based Text Classification
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
