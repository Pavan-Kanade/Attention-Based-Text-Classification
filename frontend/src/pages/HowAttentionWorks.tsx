import React, { useState } from 'react';
import { Cpu, Calculator } from 'lucide-react';

export const HowAttentionWorks: React.FC = () => {
  const [inputSentence, setInputSentence] = useState("The movie was fantastic");
  const [dK, setDK] = useState(4);

  const tokens = inputSentence.trim() ? inputSentence.trim().split(/\s+/) : ["The", "movie", "was", "fantastic"];
  const N = tokens.length;

  // Generate reproducible illustrative Q, K, V matrices
  const generateMatrix = (seedOffset: number) => {
    return tokens.map((_, rIdx) => 
      Array.from({ length: dK }, (_, cIdx) => 
        Number(Math.sin(rIdx * 1.5 + cIdx * 0.8 + seedOffset).toFixed(2))
      )
    );
  };

  const Q = generateMatrix(1.0);
  const K = generateMatrix(2.5);
  const V = generateMatrix(4.0);

  // Compute QK^T matrix (N x N)
  const QKT: number[][] = [];
  for (let i = 0; i < N; i++) {
    const row: number[] = [];
    for (let j = 0; j < N; j++) {
      let dot = 0;
      for (let k = 0; k < dK; k++) {
        dot += Q[i][k] * K[j][k];
      }
      row.push(Number(dot.toFixed(2)));
    }
    QKT.push(row);
  }

  // Scaled QK^T / sqrt(d_k)
  const sqrtDK = Math.sqrt(dK);
  const ScaledScores = QKT.map(row => row.map(val => Number((val / sqrtDK).toFixed(2))));

  // Softmax per row
  const SoftmaxWeights: number[][] = ScaledScores.map(row => {
    const exps = row.map(v => Math.exp(v));
    const sumExp = exps.reduce((a, b) => a + b, 0);
    return exps.map(v => Number((v / sumExp).toFixed(3)));
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <span>How Attention Works: Query-Key-Value (Q-K-V) Demonstration</span>
        </h1>
        <p className="text-xs text-slate-500">
          An educational interactive breakdown of Scaled Dot-Product Self-Attention and Query-Key-Value matrix calculations.
        </p>
      </div>

      {/* Main Formula Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">Scaled Dot-Product Attention Equation</span>
          <span className="text-xs text-slate-400 font-mono">Vaswani et al. (2017)</span>
        </div>
        <div className="text-center py-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="text-xl md:text-2xl font-mono font-black text-indigo-300">
            Attention(Q, K, V) = softmax(QKᵀ / √d_k) V
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-2">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="font-bold text-indigo-400">Query (Q):</span> What the current token is looking for in the sequence.
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="font-bold text-purple-400">Key (K):</span> What features each sequence token advertises.
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <span className="font-bold text-emerald-400">Value (V):</span> The actual informational content passed forward.
          </div>
        </div>
      </div>

      {/* Interactive Matrix Demo Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-600" />
          <span>Interactive Q-K-V Matrix Step Computation</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Sample Sentence:
            </label>
            <input
              type="text"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Key Dimension (d_k):
            </label>
            <select
              value={dK}
              onChange={(e) => setDK(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
            >
              <option value={4}>d_k = 4</option>
              <option value={8}>d_k = 8</option>
            </select>
          </div>
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-5 pt-2">
          {/* Step 1: Input Tokens & Embeddings */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700 font-mono">
              Step 1: Input Sequence ({N} tokens, d_k={dK})
            </div>
            <div className="flex flex-wrap gap-2">
              {tokens.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-indigo-700 font-mono">
                  t_{idx}: "{t}"
                </span>
              ))}
            </div>
          </div>

          {/* Step 2: Q, K, V Projection Matrices */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 font-mono">
              Step 2: Linear Projection Matrices (Q, K, V ∈ R^({N} × {dK}))
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Q Matrix */}
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 text-xs space-y-1 overflow-x-auto">
                <div className="font-bold text-indigo-900 font-mono">Query Matrix (Q):</div>
                <table className="w-full text-center font-mono text-[11px]">
                  <tbody>
                    {Q.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-indigo-100">
                        <td className="font-bold text-indigo-700 px-1">{tokens[rIdx]}</td>
                        {row.map((val, cIdx) => <td key={cIdx} className="px-1">{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* K Matrix */}
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-xs space-y-1 overflow-x-auto">
                <div className="font-bold text-purple-900 font-mono">Key Matrix (K):</div>
                <table className="w-full text-center font-mono text-[11px]">
                  <tbody>
                    {K.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-purple-100">
                        <td className="font-bold text-purple-700 px-1">{tokens[rIdx]}</td>
                        {row.map((val, cIdx) => <td key={cIdx} className="px-1">{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* V Matrix */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-1 overflow-x-auto">
                <div className="font-bold text-emerald-900 font-mono">Value Matrix (V):</div>
                <table className="w-full text-center font-mono text-[11px]">
                  <tbody>
                    {V.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-emerald-100">
                        <td className="font-bold text-emerald-700 px-1">{tokens[rIdx]}</td>
                        {row.map((val, cIdx) => <td key={cIdx} className="px-1">{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 3: Softmax Attention Matrix */}
          <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-indigo-300 font-mono flex items-center justify-between">
              <span>Step 3: Normalized Softmax Self-Attention Matrix (softmax(QKᵀ / √d_k) ∈ R^({N} × {N}))</span>
              <span className="text-[10px] text-slate-400 font-normal">Rows sum to 1.0</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="p-1">Token</th>
                    {tokens.map((t, idx) => <th key={idx} className="p-1">{t}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SoftmaxWeights.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="p-2 font-bold text-indigo-400">{tokens[rIdx]}</td>
                      {row.map((val, cIdx) => (
                        <td 
                          key={cIdx} 
                          className={`p-2 font-bold ${val >= 0.35 ? 'text-amber-400 bg-amber-500/20' : 'text-slate-300'}`}
                        >
                          {(val * 100).toFixed(1)}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
