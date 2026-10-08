import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';

export const ResearchGap: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>Research Gap Analysis & Problem Motivation</span>
        </h1>
        <p className="text-xs text-slate-500">
          Identifying limitations in traditional sequence models and why attention mechanisms are necessary for text classification.
        </p>
      </div>

      {/* Main Research Gap Statement */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          <span>The Sequential Information Bottleneck Problem</span>
        </h2>

        <p className="text-sm text-slate-700 leading-relaxed">
          Traditional Recurrent Neural Networks (RNNs) and basic Long Short-Term Memory (LSTM) networks process text sequences sequentially, updating a hidden state vector $h_t$ at each timestep. When classifying longer text sequences, traditional models rely solely on the final hidden state $h_T$ to represent the entire text.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Traditional LSTM Limitation</h3>
            <ul className="text-xs text-rose-800 space-y-1.5 list-disc list-inside">
              <li>Information bottleneck: forces entire paragraph context into a single vector $h_T$.</li>
              <li>Treats all token timesteps equally in final classification head.</li>
              <li>Gradient degradation over long sequence dependencies.</li>
              <li>Zero interpretability: impossible to explain which words caused a prediction.</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Attention Mechanism Solution</h3>
            <ul className="text-xs text-emerald-800 space-y-1.5 list-disc list-inside">
              <li>Direct shortcuts to all intermediate hidden states $h_i$.</li>
              <li>Dynamically computes importance weights $\alpha_i$ for key sentiment words.</li>
              <li>Formulates context vector $c = \sum \alpha_i h_i$ weighted by token relevance.</li>
              <li>High interpretability: visual token heatmaps highlight influential words.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Research Objectives Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800">Key Investigation Questions Addressed in This Project</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-1">
            <span className="font-bold text-indigo-900">1. Classification Performance Improvement:</span>
            <p className="text-indigo-800">Does dynamic token weighting improve sentiment accuracy compared to standard BiLSTM baselines?</p>
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-1">
            <span className="font-bold text-indigo-900">2. Token Interpretability & Trust:</span>
            <p className="text-indigo-800">Can attention weights accurately isolate key sentiment keywords (e.g. "fantastic", "terrible") for user verification?</p>
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-1">
            <span className="font-bold text-indigo-900">3. Handling Negations & Modifiers:</span>
            <p className="text-indigo-800">How does the attention layer handle sentiment flips caused by negations ("not good", "never bad")?</p>
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 space-y-1">
            <span className="font-bold text-indigo-900">4. Multi-Input Batch Scalability:</span>
            <p className="text-indigo-800">Can the system process batch CSV text streams efficiently with stable confidence scores?</p>
          </div>
        </div>
      </div>
    </div>
  );
};
