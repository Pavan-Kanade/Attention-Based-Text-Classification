import React, { useState } from 'react';
import { runLocalInference } from '../services/localInference';
import { AttentionHeatmap } from '../components/AttentionHeatmap';
import { Eye, ArrowDown, BarChart3, Layers } from 'lucide-react';

export const AttentionVisualization: React.FC = () => {
  const [sampleText, setSampleText] = useState("The movie was extremely good and entertaining.");
  const result = runLocalInference(sampleText);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-600" />
          <span>Attention Mechanism Visualization</span>
        </h1>
        <p className="text-xs text-slate-500">
          Visualizing how the Attention Layer dynamically scores each token to form an informative context vector.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>Sequence Classification Attention Flow</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 w-full md:w-40 font-semibold text-slate-700">
            <div>Input Sequence</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">"movie was extremely good"</div>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-500 md:-rotate-90 shrink-0" />

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 w-full md:w-40 font-semibold text-slate-700">
            <div>Token Reps</div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">BiLSTM Outputs [h_1, h_2, ...]</div>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-500 md:-rotate-90 shrink-0" />

          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 w-full md:w-44 font-bold text-indigo-900">
            <div>Attention Scores</div>
            <div className="text-[10px] text-indigo-600 mt-1 font-mono">score_i = tanh(W_h * h_i + b)</div>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-500 md:-rotate-90 shrink-0" />

          <div className="p-4 bg-purple-100 rounded-xl border border-purple-300 w-full md:w-44 font-black text-purple-950 shadow-sm">
            <div>Softmax Weights</div>
            <div className="text-[10px] text-purple-700 mt-1 font-mono">α_i = exp(s_i) / Σ exp(s_j)</div>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-500 md:-rotate-90 shrink-0" />

          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 w-full md:w-40 font-semibold text-indigo-900">
            <div>Context Vector</div>
            <div className="text-[10px] text-indigo-600 mt-1 font-mono">c = Σ (α_i * h_i)</div>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-500 md:-rotate-90 shrink-0" />

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 w-full md:w-40 font-bold text-emerald-900">
            <div>Classification</div>
            <div className="text-[10px] text-emerald-600 mt-1 font-mono">Softmax Probabilities</div>
          </div>
        </div>
      </div>

      {/* Interactive Explorer */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800">Interactive Token Weight Explorer</h3>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Test Sentence Input:
          </label>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
          />
        </div>

        {/* Token Heatmap */}
        <AttentionHeatmap tokens={result.attention} />

        {/* Horizontal Bar Chart of Weights */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Token Attention Score Breakdown Chart:</span>
          </h4>

          <div className="space-y-2">
            {result.attention.map((item, idx) => {
              const maxW = Math.max(...result.attention.map(a => a.weight), 0.001);
              const pct = ((item.weight / maxW) * 100).toFixed(1);
              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <span className="w-24 font-semibold text-slate-700 truncate font-mono">{item.token}</span>
                  <div className="flex-1 bg-slate-100 h-5 rounded-lg overflow-hidden flex items-center px-1">
                    <div
                      className={`h-3.5 rounded-md transition-all duration-300 ${
                        Number(pct) >= 65 ? 'bg-indigo-600' : Number(pct) >= 35 ? 'bg-indigo-300' : 'bg-slate-300'
                      }`}
                      style={{ width: `${Math.max(Number(pct), 4)}%` }}
                    />
                  </div>
                  <span className="w-14 text-right font-mono font-bold text-indigo-900">
                    {(item.weight * 100).toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
