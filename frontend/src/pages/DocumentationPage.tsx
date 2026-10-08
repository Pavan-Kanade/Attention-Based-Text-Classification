import React from 'react';
import { BookMarked, Server, FolderTree } from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-indigo-600" />
          <span>Technical Developer Documentation & API Reference</span>
        </h1>
        <p className="text-xs text-slate-500">
          Complete setup instructions, API REST endpoints reference, and project folder taxonomy.
        </p>
      </div>

      {/* API Reference Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600" />
          <span>FastAPI REST API Reference</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-2.5">Endpoint</th>
                <th className="p-2.5">HTTP Method</th>
                <th className="p-2.5">Input Format</th>
                <th className="p-2.5">Output Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-2.5 font-bold text-indigo-700">/predict</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">POST</span></td>
                <td className="p-2.5 text-slate-600">{`{"text": "string"}`}</td>
                <td className="p-2.5 text-slate-700">Returns prediction, confidence %, probabilities, and token attention array.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2.5 font-bold text-indigo-700">/predict/batch</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">POST</span></td>
                <td className="p-2.5 text-slate-600">{`{"texts": ["str1", "str2"]}`}</td>
                <td className="p-2.5 text-slate-700">Returns array of prediction objects + global summary metrics.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2.5 font-bold text-indigo-700">/predict/csv</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">POST</span></td>
                <td className="p-2.5 text-slate-600">CSV File (Multipart)</td>
                <td className="p-2.5 text-slate-700">Parses CSV rows (`id,text`), processes all rows, and outputs prediction JSON.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2.5 font-bold text-indigo-700">/attention</td>
                <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">POST</span></td>
                <td className="p-2.5 text-slate-600">{`{"text": "str", "d_k": 4}`}</td>
                <td className="p-2.5 text-slate-700">Generates Query (Q), Key (K), Value (V), and QK^T matrix steps.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-2.5 font-bold text-indigo-700">/evaluation</td>
                <td className="p-2.5"><span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-[10px] font-bold">GET</span></td>
                <td className="p-2.5 text-slate-400">None</td>
                <td className="p-2.5 text-slate-700">Returns test set accuracy, precision, recall, F1, and confusion matrix.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Directory Taxonomy */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-indigo-400 font-bold font-sans text-sm">
          <FolderTree className="w-4 h-4" /> Project Directory Layout & File Organization
        </div>
        <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
{`c:/attention/
├── frontend/                     # React + TypeScript + Vite + Tailwind CSS UI
│   ├── src/
│   │   ├── components/           # AttentionHeatmap, PreprocessingViewer, ConfusionMatrix, Navbar, Sidebar
│   │   ├── pages/                # 19 Application Pages
│   │   ├── services/             # API client, local inference engine, CSV helper
│   │   └── types/                # TypeScript interfaces
│   └── vite.config.ts
├── backend/                      # Python FastAPI REST Server
│   ├── app.py                    # FastAPI server endpoints
│   ├── model/attention_model.py  # PyTorch Attention-BiLSTM architecture
│   ├── preprocessing/text_preprocessor.py # Text preprocessing pipeline
│   ├── training/train.py         # Training pipeline script
│   └── evaluation/evaluate.py    # Evaluation script
├── dataset/                      # Dataset downloader script
├── notebooks/                    # Jupyter notebook for presentation
└── results/                      # Pre-evaluated history metrics JSONs`}
        </pre>
      </div>
    </div>
  );
};
