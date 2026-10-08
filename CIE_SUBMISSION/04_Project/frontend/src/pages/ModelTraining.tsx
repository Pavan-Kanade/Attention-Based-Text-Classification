import React, { useEffect, useState } from 'react';
import { getTrainingHistory } from '../services/api';
import type { TrainingHistory } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart as ChartIcon, Sliders } from 'lucide-react';

export const ModelTraining: React.FC = () => {
  const [history, setHistory] = useState<TrainingHistory | null>(null);

  useEffect(() => {
    getTrainingHistory().then(res => setHistory(res));
  }, []);

  if (!history) return null;

  // Format chart data for Recharts
  const chartData = history.epochs.map((ep, idx) => ({
    epoch: `Epoch ${ep}`,
    train_loss: history.train_loss[idx],
    val_loss: history.val_loss[idx],
    train_acc: history.train_acc[idx],
    val_acc: history.val_acc[idx]
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ChartIcon className="w-5 h-5 text-indigo-600" />
          <span>Model Training & Epoch Analytics</span>
        </h1>
        <p className="text-xs text-slate-500">
          Epoch-by-epoch loss and accuracy metrics measured during the Attention-BiLSTM model training process.
        </p>
      </div>

      {/* Hyperparameters Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Model Training Hyperparameters</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Optimizer</span>
            <div className="font-bold text-indigo-900">Adam</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Loss Function</span>
            <div className="font-bold text-slate-800 truncate" title="Sparse Categorical Crossentropy">CrossEntropy</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Epochs</span>
            <div className="font-bold text-slate-800">10</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Batch Size</span>
            <div className="font-bold text-slate-800">32</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Learning Rate</span>
            <div className="font-bold text-slate-800">0.001</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Max Seq Length</span>
            <div className="font-bold text-slate-800">50 tokens</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">Embedding Dim</span>
            <div className="font-bold text-indigo-900">64</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-mono font-bold">LSTM Units</span>
            <div className="font-bold text-indigo-900">128 (BiLSTM)</div>
          </div>
        </div>
      </div>

      {/* Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loss Graph */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Training Loss vs Validation Loss</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-mono">
              CrossEntropy
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="epoch" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 0.8]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="train_loss" name="Training Loss" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="val_loss" name="Validation Loss" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Graph */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Training Accuracy vs Validation Accuracy (%)</h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full font-mono">
              Max Val: 92.4%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="epoch" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="train_acc" name="Training Acc (%)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="val_acc" name="Validation Acc (%)" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
