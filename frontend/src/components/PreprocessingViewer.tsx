import React, { useState } from 'react';
import type { PreprocessingDetail } from '../types';
import { ChevronDown, ChevronUp, Layers, Terminal } from 'lucide-react';

interface PreprocessingViewerProps {
  preprocessing?: PreprocessingDetail;
}

export const PreprocessingViewer: React.FC<PreprocessingViewerProps> = ({ preprocessing }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!preprocessing) return null;

  return (
    <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-sm font-semibold transition-colors"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>View Text Preprocessing Pipeline Steps</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-mono font-medium">
            {preprocessing.sequence_length} tokens
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-3.5 border-t border-slate-200 bg-slate-900 text-slate-100 font-mono text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step 1: Original Raw Input</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-200">
              "{preprocessing.original_text}"
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step 2: Lowercase & Symbol Sanitization</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400">
              "{preprocessing.cleaned_text}"
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step 3: Tokenization (Word List)</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-amber-300 overflow-x-auto">
              [{preprocessing.tokens.map(t => `"${t}"`).join(', ')}]
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step 4: Vocabulary Token IDs (Word to Index)</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-indigo-300 font-mono">
              [{preprocessing.sequence.join(', ')}]
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step 5: Sequence Padding (Fixed Max Length = 50)</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 text-[11px] overflow-x-auto">
              [{preprocessing.padded_sequence.slice(0, 15).join(', ')}, ... <span className="text-slate-600">({preprocessing.padded_sequence.length - 15} padded zeros)</span>]
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
