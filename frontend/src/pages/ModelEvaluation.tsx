import React, { useEffect, useState } from 'react';
import { getEvaluationMetrics } from '../services/api';
import type { EvaluationMetrics } from '../types';
import { ConfusionMatrix } from '../components/ConfusionMatrix';
import { BarChart3, ShieldCheck, Target, Award, Percent, BookOpen } from 'lucide-react';

export const ModelEvaluation: React.FC = () => {
  const [metrics, setMetrics] = useState<EvaluationMetrics | null>(null);

  useEffect(() => {
    getEvaluationMetrics().then(res => setMetrics(res));
  }, []);

  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <span>Model Evaluation & Performance Metrics</span>
        </h1>
        <p className="text-xs text-slate-500">
          Rigorous test evaluation results measured on 2,500 IMDb test set review samples.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            <span>Accuracy</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{metrics.accuracy}%</div>
          <p className="text-xs text-slate-500">Correct Predictions / Total Predictions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            <span>Precision</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600">{metrics.precision}%</div>
          <p className="text-xs text-slate-500">TP / (TP + FP) [Low False Positives]</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            <span>Recall</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-purple-600">{metrics.recall}%</div>
          <p className="text-xs text-slate-500">TP / (TP + FN) [High Sensitivity]</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            <span>F1-Score</span>
            <Percent className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">{metrics.f1_score}%</div>
          <p className="text-xs text-slate-500">Harmonic Mean of Precision & Recall</p>
        </div>
      </div>

      {/* Main Matrix & Classification Report Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfusionMatrix matrix={metrics.confusion_matrix} />

        {/* Classification Report Table */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-800">Per-Class Classification Report</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="p-2.5">Class Label</th>
                  <th className="p-2.5">Precision</th>
                  <th className="p-2.5">Recall</th>
                  <th className="p-2.5">F1-Score</th>
                  <th className="p-2.5">Support</th>
                </tr>
              </thead>
              <tbody>
                {metrics.classification_report.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/80">
                    <td className="p-2.5 font-bold text-slate-800">{row.class}</td>
                    <td className="p-2.5 font-mono text-indigo-700 font-semibold">{row.precision.toFixed(4)}</td>
                    <td className="p-2.5 font-mono text-purple-700 font-semibold">{row.recall.toFixed(4)}</td>
                    <td className="p-2.5 font-mono text-amber-700 font-bold">{row.f1_score.toFixed(4)}</td>
                    <td className="p-2.5 font-mono text-slate-600">{row.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Metric Definitions & Student Guide:
            </span>
            <p>
              <strong>Accuracy:</strong> Percentage of total correct sentiment classifications across the test split.<br />
              <strong>Precision:</strong> Measures exactness: out of all reviews predicted positive, how many were actually positive.<br />
              <strong>Recall:</strong> Measures completeness: out of all actual positive reviews, how many did the model identify.<br />
              <strong>F1-Score:</strong> Balances precision and recall to evaluate overall model performance on imbalanced datasets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
