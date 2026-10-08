import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdvantagesLimitations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          <span>Advantages & Limitations Analysis</span>
        </h1>
        <p className="text-xs text-slate-500">
          A balanced technical evaluation of the Attention-BiLSTM architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advantages */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Key System Advantages</span>
          </h2>

          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
              <strong className="text-emerald-950 font-bold">1. High Model Interpretability:</strong> Generates token-level attention weight visual heatmaps demystifying neural network decisions.
            </li>
            <li className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
              <strong className="text-emerald-950 font-bold">2. Eliminates Sequence Bottlenecks:</strong> Dynamically connects classification head directly to all sequence timesteps.
            </li>
            <li className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
              <strong className="text-emerald-950 font-bold">3. Handles Variable-Length Text:</strong> Flexible sequence padding and masking ensures robust processing of short & long reviews.
            </li>
            <li className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
              <strong className="text-emerald-950 font-bold">4. Robust Batch & CSV Support:</strong> Processes multi-input datasets with CSV export capabilities out of the box.
            </li>
          </ul>
        </div>

        {/* Limitations */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>System Limitations & Constraints</span>
          </h2>

          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
              <strong className="text-rose-950 font-bold">1. Higher Computational Complexity:</strong> Calculating dot products or tanh additive scores adds matrix multiplication overhead.
            </li>
            <li className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
              <strong className="text-rose-950 font-bold">2. Attention is Not Always Causal:</strong> High attention weights indicate correlation rather than absolute causal proof of sentiment.
            </li>
            <li className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
              <strong className="text-rose-950 font-bold">3. Fixed Vocabulary Cutoff:</strong> Words outside the top 5,000 vocabulary words map to Out-Of-Vocabulary (&lt;UNK&gt;) tokens.
            </li>
            <li className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
              <strong className="text-rose-950 font-bold">4. Domain Sensitivity:</strong> Model trained on IMDb movie reviews requires retuning for specialized domains like medical texts.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
