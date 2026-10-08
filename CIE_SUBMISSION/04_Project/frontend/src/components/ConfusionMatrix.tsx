import React from 'react';

interface ConfusionMatrixProps {
  matrix?: {
    true_positive: number;
    false_negative: number;
    false_positive: number;
    true_negative: number;
  };
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ matrix }) => {
  const cm = matrix || {
    true_positive: 1144,
    false_negative: 106,
    false_positive: 84,
    true_negative: 1166
  };

  const total = cm.true_positive + cm.false_negative + cm.false_positive + cm.true_negative;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>Confusion Matrix</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
            {total} Test Samples
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
        <div></div>
        <div className="bg-slate-100 p-2 rounded-t-lg text-slate-700">Pred Positive</div>
        <div className="bg-slate-100 p-2 rounded-t-lg text-slate-700">Pred Negative</div>

        <div className="bg-slate-100 p-3 rounded-l-lg flex items-center justify-center text-slate-700">
          Actual Positive
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
          <div className="text-xs text-emerald-700 font-bold">True Positive (TP)</div>
          <div className="text-2xl font-black text-emerald-800 my-1">{cm.true_positive}</div>
          <div className="text-[11px] text-emerald-600 font-mono">{((cm.true_positive / total) * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg">
          <div className="text-xs text-rose-700 font-bold">False Negative (FN)</div>
          <div className="text-2xl font-black text-rose-800 my-1">{cm.false_negative}</div>
          <div className="text-[11px] text-rose-600 font-mono">{((cm.false_negative / total) * 100).toFixed(1)}%</div>
        </div>

        <div className="bg-slate-100 p-3 rounded-l-lg flex items-center justify-center text-slate-700">
          Actual Negative
        </div>
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg">
          <div className="text-xs text-rose-700 font-bold">False Positive (FP)</div>
          <div className="text-2xl font-black text-rose-800 my-1">{cm.false_positive}</div>
          <div className="text-[11px] text-rose-600 font-mono">{((cm.false_positive / total) * 100).toFixed(1)}%</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
          <div className="text-xs text-emerald-700 font-bold">True Negative (TN)</div>
          <div className="text-2xl font-black text-emerald-800 my-1">{cm.true_negative}</div>
          <div className="text-[11px] text-emerald-600 font-mono">{((cm.true_negative / total) * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
        <div className="font-semibold text-indigo-950">Metrics Summary Equations:</div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
          <div>Accuracy = (TP + TN) / Total</div>
          <div>Precision = TP / (TP + FP)</div>
          <div>Recall = TP / (TP + FN)</div>
          <div>F1-Score = 2 × (P × R) / (P + R)</div>
        </div>
      </div>
    </div>
  );
};
