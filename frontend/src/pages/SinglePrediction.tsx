import React, { useState } from 'react';
import { predictSingleText } from '../services/api';
import type { PredictionResult } from '../types';
import { AttentionHeatmap } from '../components/AttentionHeatmap';
import { PreprocessingViewer } from '../components/PreprocessingViewer';
import { PlayCircle, Trash2, Sparkles, CheckCircle2, AlertCircle, BarChart2 } from 'lucide-react';

const SAMPLES = [
  "This movie was fantastic and I loved every minute of it.",
  "The service was terrible, slow food and extremely rude staff.",
  "Brilliant direction, breathtaking cinematography, and emotional acting!",
  "The plot was boring, full of plot holes and waste of money.",
  "I really enjoyed this product, exceeded all my expectations.",
  "It was okay, nothing special but decent overall."
];

export const SinglePrediction: React.FC = () => {
  const [inputText, setInputText] = useState("This movie was fantastic and I loved every minute of it.");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    const res = await predictSingleText(inputText);
    setResult(res);
    setLoading(false);
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
  };

  const handleLoadSample = (sample: string) => {
    setInputText(sample);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-indigo-600" />
          <span>Single Text Prediction</span>
        </h1>
        <p className="text-xs text-slate-500">
          Enter text or select a sample review to run through the Attention-Based BiLSTM classification model.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Input Text / Review:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder="Enter text here (e.g., 'The movie was absolutely amazing...')"
            className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 font-sans"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePredict}
              disabled={loading || !inputText.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Model...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Predict Sentiment</span>
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4 text-slate-500" />
              <span>Clear</span>
            </button>
          </div>

          {/* Sample Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Samples:
            </span>
            {SAMPLES.slice(0, 3).map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadSample(sample)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-xs font-medium border border-slate-200 transition-colors whitespace-nowrap"
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Prediction Badge & Confidence Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Predicted Class</div>
              <div className="flex items-center gap-3">
                {result.prediction === 'positive' ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-lg border border-emerald-300 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>POSITIVE</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 text-rose-800 font-black text-lg border border-rose-300 shadow-sm">
                    <AlertCircle className="w-6 h-6 text-rose-600" />
                    <span>NEGATIVE</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Model Confidence</div>
              <div className="text-3xl font-black text-indigo-600">
                {(result.confidence * 100).toFixed(2)}%
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Class Probability Distribution</span>
                <BarChart2 className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-emerald-700">Positive Class</span>
                    <span>{(result.probabilities.positive * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${result.probabilities.positive * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-rose-700">Negative Class</span>
                    <span>{(result.probabilities.negative * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${result.probabilities.negative * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attention Heatmap Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-800">Token-Level Attention Weight Distribution</h3>
            <p className="text-xs text-slate-500">
              Words with higher attention weights ($\alpha_i$) contributed most to the model's sequence representation context vector ($c$).
            </p>
            <AttentionHeatmap tokens={result.attention} />
          </div>

          {/* Preprocessing Inspector */}
          <PreprocessingViewer preprocessing={result.preprocessing} />
        </div>
      )}
    </div>
  );
};
