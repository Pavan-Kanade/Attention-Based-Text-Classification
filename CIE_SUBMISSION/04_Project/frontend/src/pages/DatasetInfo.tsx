import React from 'react';
import { Database, PieChart, HardDrive } from 'lucide-react';

export const DatasetInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-600" />
          <span>Dataset Specification & Train/Val/Test Split</span>
        </h1>
        <p className="text-xs text-slate-500">
          Overview of the IMDb Large Movie Review Dataset utilized for training and evaluating the Attention-BiLSTM classifier.
        </p>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Dataset Name</div>
          <div className="text-base font-extrabold text-slate-800">IMDb Movie Reviews</div>
          <p className="text-xs text-slate-500">Benchmark NLP Binary Sentiment Corpus</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Total Samples</div>
          <div className="text-3xl font-black text-indigo-600">50,000</div>
          <p className="text-xs text-slate-500">25,000 Positive & 25,000 Negative</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Target Classes</div>
          <div className="text-base font-extrabold text-slate-800">2 Classes</div>
          <div className="flex gap-2 pt-0.5">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">Positive (1)</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-bold">Negative (0)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Avg Sequence Length</div>
          <div className="text-3xl font-black text-slate-800">234 words</div>
          <p className="text-xs text-slate-500">Max sequence cutoff padded to 50 tokens</p>
        </div>
      </div>

      {/* Train / Val / Test Split Visual */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" />
          <span>Recommended Dataset Partitioning (80% / 10% / 10%)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 font-mono">Training Set</span>
              <span className="text-xs font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded">80%</span>
            </div>
            <div className="text-2xl font-black text-indigo-900">40,000 Samples</div>
            <p className="text-xs text-indigo-700">Used for parameter optimization & loss backpropagation.</p>
          </div>

          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 font-mono">Validation Set</span>
              <span className="text-xs font-extrabold bg-purple-600 text-white px-2 py-0.5 rounded">10%</span>
            </div>
            <div className="text-2xl font-black text-purple-900">5,000 Samples</div>
            <p className="text-xs text-purple-700">Used for hyperparameter tuning & early stopping monitoring.</p>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 font-mono">Test Set</span>
              <span className="text-xs font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded">10%</span>
            </div>
            <div className="text-2xl font-black text-emerald-900">5,000 Samples</div>
            <p className="text-xs text-emerald-700">Used strictly for unbiased final evaluation metrics.</p>
          </div>
        </div>
      </div>

      {/* Directory & Setup Guide */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-indigo-400 font-bold font-sans text-sm">
          <span className="flex items-center gap-2">
            <HardDrive className="w-4 h-4" /> Dataset Setup & Directory Structure
          </span>
        </div>
        <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
{`dataset/
├── README.md              # Dataset download & preprocessing instructions
├── download_imdb.py       # Automated TorchText/Keras dataset script
├── train.csv              # 40,000 reviews (id, text, label)
├── val.csv                # 5,000 reviews (id, text, label)
└── test.csv               # 5,000 reviews (id, text, label)`}
        </pre>
      </div>
    </div>
  );
};
