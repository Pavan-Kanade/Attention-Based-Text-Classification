import React from 'react';

export const PipelineDiagram: React.FC = () => {
  const steps = [
    { label: "TEXT INPUT", desc: "Raw Text / Review", color: "bg-slate-50 border-slate-200 text-slate-700" },
    { label: "TEXT PREPROCESSING", desc: "Clean & Lowercase", color: "bg-slate-50 border-slate-200 text-slate-700" },
    { label: "TOKENIZATION", desc: "Sequence Token IDs", color: "bg-slate-50 border-slate-200 text-slate-700" },
    { label: "EMBEDDING", desc: "64-Dim Vectors", color: "bg-indigo-50 border-indigo-200 text-indigo-900" },
    { label: "BiLSTM", desc: "128 Hidden Units x 2", color: "bg-indigo-50 border-indigo-200 text-indigo-900" },
    { label: "ATTENTION", desc: "Score & Softmax (α_i)", color: "bg-purple-100 border-purple-300 text-purple-950 font-bold shadow-sm" },
    { label: "CONTEXT VECTOR", desc: "c = Σ (α_i * h_i)", color: "bg-indigo-50 border-indigo-200 text-indigo-900" },
    { label: "DENSE LAYER", desc: "Dense (64) + Dropout", color: "bg-slate-50 border-slate-200 text-slate-700" },
    { label: "CLASSIFICATION", desc: "Positive / Negative", color: "bg-emerald-50 border-emerald-200 text-emerald-900 font-bold" }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono">
          PROJECT PIPELINE ARCHITECTURE
        </h3>
        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
          BiLSTM + Additive Attention
        </span>
      </div>

      {/* Desktop Horizontal Flow */}
      <div className="hidden lg:grid grid-cols-9 gap-1.5 text-center text-[11px]">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className={`p-2.5 rounded-xl border flex flex-col justify-center ${step.color}`}>
              <div className="font-extrabold truncate">{step.label}</div>
              <div className="text-[9px] opacity-75 font-mono truncate">{step.desc}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile / Tablet Grid Flow */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
        {steps.map((step, idx) => (
          <div key={idx} className={`p-3 rounded-xl border flex flex-col justify-center ${step.color}`}>
            <div className="font-bold">{idx + 1}. {step.label}</div>
            <div className="text-[10px] opacity-80 font-mono mt-0.5">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
