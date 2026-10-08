import React from 'react';
import { GitCompare, CheckCircle2, AlertTriangle, Sparkles, BrainCircuit } from 'lucide-react';

export const ModelComparison: React.FC = () => {
  const comparisons = [
    {
      model: "Basic Unidirectional LSTM",
      architecture: "Embedding (64) → LSTM (128) → Dense (64) → Softmax",
      accuracy: "84.5%",
      precision: "85.1%",
      recall: "83.8%",
      f1: "84.4%",
      complexity: "Low ($O(T)$ sequential pass)",
      interpretability: "Low (Black-box hidden state)",
      advantage: "Simple baseline architecture",
      limitations: "Struggles with long-range dependencies; unidirectional context only"
    },
    {
      model: "Bidirectional LSTM (BiLSTM)",
      architecture: "Embedding (64) → BiLSTM (128) → Last State → Softmax",
      accuracy: "88.2%",
      precision: "88.7%",
      recall: "87.6%",
      f1: "88.1%",
      complexity: "Medium (Forward + Backward pass)",
      interpretability: "Low (Only uses final hidden state vector)",
      advantage: "Captures past and future context simultaneously",
      limitations: "Information bottleneck at final hidden vector $h_T$"
    },
    {
      model: "Attention-Based BiLSTM (Proposed)",
      architecture: "Embedding (64) → BiLSTM (128) → Attention Layer → Context → Softmax",
      accuracy: "92.4%",
      precision: "93.1%",
      recall: "91.5%",
      f1: "92.2%",
      complexity: "Medium-High ($O(T)$ additive score calculation)",
      interpretability: "High (Token-level attention weights $\\alpha_i$ visual heatmap)",
      advantage: "Eliminates bottleneck by dynamically weighting all sequence tokens",
      limitations: "Requires additional parameters ($W_h, v_a$) in attention layer"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-indigo-600" />
          <span>Model Architecture Benchmark & Comparison</span>
        </h1>
        <p className="text-xs text-slate-500">
          Comparing sequence classification performance across Basic LSTM, BiLSTM, and the proposed Attention-BiLSTM model.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-indigo-600" />
          <span>Comparative Metrics Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-3">Model Variant</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Precision</th>
                <th className="p-3">Recall</th>
                <th className="p-3">F1-Score</th>
                <th className="p-3">Complexity</th>
                <th className="p-3">Interpretability</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className={`border-b border-slate-100 ${idx === 2 ? 'bg-indigo-50/70 font-semibold' : 'hover:bg-slate-50/60'}`}>
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                    {idx === 2 && <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />}
                    <span>{row.model}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-700">{row.accuracy}</td>
                  <td className="p-3 font-mono text-indigo-700">{row.precision}</td>
                  <td className="p-3 font-mono text-purple-700">{row.recall}</td>
                  <td className="p-3 font-mono font-bold text-amber-700">{row.f1}</td>
                  <td className="p-3 text-slate-600">{row.complexity}</td>
                  <td className={`p-3 font-bold ${idx === 2 ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {row.interpretability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytical Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisons.map((item, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-2xl border shadow-sm space-y-3 ${idx === 2 ? 'border-indigo-300 ring-2 ring-indigo-500/20' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">{item.model}</h3>
              {idx === 2 && <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">PROPOSED</span>}
            </div>

            <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200">
              {item.architecture}
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="text-emerald-700 font-semibold flex items-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item.advantage}</span>
              </div>
              <div className="text-rose-700 font-semibold flex items-start gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>{item.limitations}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
