import React from 'react';
import type { AttentionToken } from '../types';

interface AttentionHeatmapProps {
  tokens: AttentionToken[];
  showLegend?: boolean;
  compact?: boolean;
}

export const AttentionHeatmap: React.FC<AttentionHeatmapProps> = ({ tokens, showLegend = true, compact = false }) => {
  if (!tokens || tokens.length === 0) {
    return <div className="text-slate-400 text-xs italic">No attention weights available for display.</div>;
  }

  // Find max weight to scale colors dynamically
  const maxWeight = Math.max(...tokens.map(t => t.weight), 0.001);

  const getHeatmapColor = (weight: number) => {
    const ratio = weight / maxWeight;
    if (ratio >= 0.65) {
      return 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 border border-indigo-400 font-bold scale-[1.04]';
    } else if (ratio >= 0.35) {
      return 'bg-indigo-100 text-indigo-900 border border-indigo-300 font-semibold';
    } else if (ratio >= 0.18) {
      return 'bg-indigo-50/90 text-indigo-800 border border-indigo-200';
    }
    return 'bg-slate-100/90 text-slate-700 border border-slate-200';
  };

  return (
    <div className="space-y-3">
      {/* Legend */}
      {showLegend && (
        <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
          <span className="font-semibold text-slate-700">Token Attention Heatmap:</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block"></span>
              <span>Low</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-200 inline-block"></span>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block"></span>
              <span className="font-bold text-indigo-700">High Attention</span>
            </div>
          </div>
        </div>
      )}

      {/* Tokens heatmap wrap */}
      <div className={`flex flex-wrap items-center gap-1.5 bg-slate-50/70 rounded-xl border border-slate-200/80 leading-relaxed ${compact ? 'p-2.5' : 'p-3.5'}`}>
        {tokens.map((item, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 rounded-lg transition-all duration-150 cursor-default ${compact ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'} ${getHeatmapColor(item.weight)}`}
            title={`Token: "${item.token}" | Attention Weight: ${(item.weight * 100).toFixed(2)}%`}
          >
            <span>{item.token}</span>
            <span className={`text-[10px] opacity-75 font-mono px-1 rounded ${item.weight / maxWeight >= 0.65 ? 'bg-indigo-700/60 text-white' : 'bg-slate-200/80 text-slate-600'}`}>
              {(item.weight * 100).toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
