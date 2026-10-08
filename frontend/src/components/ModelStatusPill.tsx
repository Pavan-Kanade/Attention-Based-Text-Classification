import React, { useEffect, useState } from 'react';
import { checkBackendStatus } from '../services/api';
import type { ApiStatus } from '../services/api';
import { Cpu, CheckCircle, RefreshCw } from 'lucide-react';

export const ModelStatusPill: React.FC = () => {
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [checking, setChecking] = useState(false);

  const refreshStatus = async () => {
    setChecking(true);
    const res = await checkBackendStatus();
    setStatus(res);
    setChecking(false);
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  if (!status) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-slate-900/90 text-slate-100 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700/60 shadow-sm backdrop-blur-md">
      {status.isBackendConnected ? (
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
      ) : (
        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
      )}
      <span className="font-semibold text-slate-200">Engine:</span>
      <span className={status.isBackendConnected ? "text-emerald-400 font-bold" : "text-indigo-300 font-bold"}>
        {status.activeEngine}
      </span>
      <button 
        onClick={refreshStatus}
        disabled={checking}
        title="Check Backend Server Status"
        className="ml-1 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-3 h-3 ${checking ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};
