import React from 'react';
import { Network, Server, Cpu, Globe, ArrowDown } from 'lucide-react';

export const ProjectArchitecture: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-600" />
          <span>System & Neural Architecture Design</span>
        </h1>
        <p className="text-xs text-slate-500">
          Comprehensive diagrams illustrating the Deep Learning Model Pipeline and Full-Stack REST API Architecture.
        </p>
      </div>

      {/* Deep Learning Architecture Diagram */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <span>1. Deep Learning Model Layer Architecture</span>
        </h2>

        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto space-y-3">
          <div className="text-center font-sans font-bold text-indigo-400">Sequential Tensor Transformation Pipeline</div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-72 text-slate-200 font-bold">
              Raw Text String Input
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-72 text-emerald-400 font-bold">
              Preprocessing & Tokenizer (Max Length = 50)
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-2.5 bg-indigo-900/60 rounded-lg border border-indigo-700 w-72 text-indigo-200 font-bold">
              Embedding Layer (Vocab=5000, Dim=64)
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-2.5 bg-indigo-900/60 rounded-lg border border-indigo-700 w-72 text-indigo-200 font-bold">
              Bidirectional LSTM (Hidden Units = 128 x 2)
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-3 bg-purple-900/80 rounded-xl border border-purple-500 w-80 text-amber-300 font-black text-sm shadow-md">
              Additive Attention Layer (α_i = softmax(tanh(W_h * h_i + b)))
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-2.5 bg-indigo-900/60 rounded-lg border border-indigo-700 w-72 text-indigo-200 font-bold">
              Context Vector ($c = \sum \alpha_i h_i$)
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-72 text-slate-200 font-bold">
              Dense Layer (64) + Dropout (0.3)
            </div>
            <ArrowDown className="w-4 h-4 text-indigo-400" />

            <div className="p-2.5 bg-emerald-900/80 rounded-lg border border-emerald-700 w-72 text-emerald-300 font-black">
              Softmax Output: [Positive %, Negative %]
            </div>
          </div>
        </div>
      </div>

      {/* Technical Full Stack REST Architecture */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600" />
          <span>2. Technical Client-Server Full-Stack Architecture</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-950 text-sm">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>React Frontend Client</span>
            </div>
            <p className="text-indigo-800 leading-relaxed">
              Built with Vite, TypeScript, Tailwind CSS, and Recharts. Manages UI dashboards, single/batch prediction forms, CSV parser, and local fallback inference engine.
            </p>
          </div>

          <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-950 text-sm">
              <Server className="w-4 h-4 text-purple-600" />
              <span>FastAPI REST Backend</span>
            </div>
            <p className="text-purple-800 leading-relaxed">
              Python web server operating on Uvicorn. Exposes REST endpoints (`/predict`, `/predict/batch`, `/predict/csv`, `/attention`, `/evaluation`, `/training-history`).
            </p>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>PyTorch Inference Engine</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Loads pre-trained Attention-BiLSTM model parameters to compute tensor forward passes and extract exact token attention weights ($\alpha_i$).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
