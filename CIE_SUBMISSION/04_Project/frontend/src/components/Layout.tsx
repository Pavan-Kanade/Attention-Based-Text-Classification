import React, { useState } from 'react';
import type { PageId } from '../types';
import { Topbar } from './Topbar';
import { Sidebar, NAV_ITEMS } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNavItem = NAV_ITEMS.find(n => n.id === currentPage);
  const currentPageTitle = activeNavItem ? activeNavItem.label : 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased">
      <Topbar 
        currentPageTitle={currentPageTitle} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      <main className="lg:pl-64 pt-16 min-h-screen transition-all duration-200">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
