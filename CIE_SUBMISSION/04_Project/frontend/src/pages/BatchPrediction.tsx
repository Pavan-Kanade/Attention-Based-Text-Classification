import React, { useState } from 'react';
import { predictBatchTexts } from '../services/api';
import type { BatchPredictionResult } from '../types';
import { parseCSVFile, downloadPredictionsCSV } from '../services/csvHelper';
import { AttentionHeatmap } from '../components/AttentionHeatmap';
import { 
  Layers, Plus, Trash2, PlayCircle, Upload, Download, 
  Sparkles, CheckCircle2, AlertCircle, Clock, FileSpreadsheet 
} from 'lucide-react';

const DEFAULT_BATCH_INPUTS = [
  "The movie was absolutely amazing.",
  "The product quality was terrible.",
  "I really enjoyed this experience.",
  "The service was slow and disappointing.",
  "It was okay, nothing special."
];

export const BatchPrediction: React.FC = () => {
  const [inputList, setInputList] = useState<string[]>(DEFAULT_BATCH_INPUTS);
  const [batchResult, setBatchResult] = useState<BatchPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'csv'>('text');

  const handleAddInput = () => {
    setInputList([...inputList, ""]);
  };

  const handleRemoveInput = (index: number) => {
    const updated = inputList.filter((_, idx) => idx !== index);
    setInputList(updated);
  };

  const handleInputChange = (index: number, val: string) => {
    const updated = [...inputList];
    updated[index] = val;
    setInputList(updated);
  };

  const handleLoadSamples = () => {
    setInputList([
      "The movie was absolutely amazing.",
      "The product quality was terrible.",
      "I really enjoyed this experience.",
      "The service was slow and disappointing.",
      "It was okay, nothing special."
    ]);
    setCsvFileName(null);
  };

  const handleClearAll = () => {
    setInputList([""]);
    setBatchResult(null);
    setCsvFileName(null);
  };

  const handlePredictAll = async () => {
    const validTexts = inputList.filter(t => t && t.trim().length > 0);
    if (validTexts.length === 0) return;

    setLoading(true);
    const res = await predictBatchTexts(validTexts);
    setBatchResult(res);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const parsedRecords = await parseCSVFile(file);
      setCsvFileName(file.name);
      
      const textArray = parsedRecords.map(r => r.text);
      setInputList(textArray);

      const res = await predictBatchTexts(textArray);
      setBatchResult(res);
      setLoading(false);
    } catch (err) {
      alert("Error parsing CSV file. Please ensure columns include 'id' and 'text'.");
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (batchResult && batchResult.results.length > 0) {
      downloadPredictionsCSV(batchResult.results, csvFileName ? `predictions_${csvFileName}` : 'batch_predictions.csv');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Batch Text Classification & CSV Support</span>
          </h1>
          <p className="text-xs text-slate-500">
            Process multiple reviews simultaneously or upload a CSV dataset file.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'text' ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-600'}`}
          >
            Multi-Text Input
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'csv' ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-600'}`}
          >
            CSV File Upload
          </button>
        </div>
      </div>

      {/* Input Form Card */}
      {activeTab === 'text' ? (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Multiple Input Text Entries ({inputList.length}):
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLoadSamples}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load 5 Samples</span>
              </button>
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-500 hover:text-slate-700 font-semibold flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {inputList.map((textVal, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-7 text-xs font-bold text-slate-400 font-mono text-right">#{idx + 1}</span>
                <input
                  type="text"
                  value={textVal}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  placeholder={`Input ${idx + 1}: e.g. 'The movie was fantastic...'`}
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-800 font-sans"
                />
                <button
                  onClick={() => handleRemoveInput(idx)}
                  disabled={inputList.length <= 1}
                  className="p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-lg hover:bg-rose-50"
                  title="Remove Input"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button
              onClick={handleAddInput}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-600" />
              <span>Add Another Text Input</span>
            </button>

            <button
              onClick={handlePredictAll}
              disabled={loading || inputList.filter(t => t.trim()).length === 0}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Batch...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Predict All Inputs ({inputList.filter(t => t.trim()).length})</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* CSV Upload Card */
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Upload Dataset CSV File</h3>
              <p className="text-xs text-slate-500">
                Upload a CSV file containing an <code className="bg-slate-100 px-1 rounded text-slate-700">id</code> and <code className="bg-slate-100 px-1 rounded text-slate-700">text</code> column.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 cursor-pointer transition-all">
              <Upload className="w-4 h-4" />
              <span>Choose CSV File</span>
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>

            {csvFileName && (
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                Loaded File: {csvFileName} ({inputList.length} rows detected)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary Metrics Bar */}
      {batchResult && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold text-slate-400 font-mono">Total Inputs</div>
              <div className="text-xl font-black text-slate-800">{batchResult.summary.total_inputs}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold text-slate-400 font-mono">Processed</div>
              <div className="text-xl font-black text-emerald-600">{batchResult.summary.successfully_processed}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold text-slate-400 font-mono">Positive</div>
              <div className="text-xl font-black text-emerald-600">{batchResult.summary.positive_count}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold text-slate-400 font-mono">Negative</div>
              <div className="text-xl font-black text-rose-600">{batchResult.summary.negative_count}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold text-slate-400 font-mono">Avg Confidence</div>
              <div className="text-xl font-black text-indigo-600">{(batchResult.summary.average_confidence * 100).toFixed(1)}%</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] font-bold text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> Time
              </div>
              <div className="text-xl font-black text-slate-800">{batchResult.summary.processing_time_ms} ms</div>
            </div>
          </div>

          {/* Export Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">Batch Prediction Results ({batchResult.results.length})</h3>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Results as CSV</span>
            </button>
          </div>

          {/* Individual Prediction Cards */}
          <div className="space-y-3">
            {batchResult.results.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 max-w-2xl">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-xs font-bold mt-0.5">
                      #{idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-800">"{item.text}"</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.prediction === 'positive' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> POSITIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> NEGATIVE
                      </span>
                    )}
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {(item.confidence * 100).toFixed(1)}% Conf
                    </span>
                  </div>
                </div>

                {/* Token Attention Heatmap Chips */}
                <AttentionHeatmap tokens={item.attention} showLegend={false} compact={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
