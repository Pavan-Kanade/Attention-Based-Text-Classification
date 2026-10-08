import React from 'react';
import type { PageId } from '../types';
import { InfoCard } from '../components/InfoCard';
import { PipelineDiagram } from '../components/PipelineDiagram';
import { 
  BrainCircuit, PlayCircle, Layers, Eye, Cpu, Database, 
  BarChart3, ArrowRight, Clock, Target, Sparkles, BookOpen 
} from 'lucide-react';

interface DashboardProps {
  setCurrentPage: (page: PageId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 md:p-8 text-white shadow-xl border border-indigo-900/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold font-mono">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span>Deep Learning PBL – Attention Mechanism for NLP</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
            Attention-Based Text Classification
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            This project demonstrates how attention mechanisms can help a deep learning model focus on important parts of text for classification.
          </p>
        </div>
      </div>

      {/* Informational Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard 
          label="MODEL" 
          value="Attention-Based BiLSTM" 
          subtext="Bidirectional LSTM with Additive Attention Layer"
          icon={BrainCircuit}
        />
        <InfoCard 
          label="TASK" 
          value="Text Classification" 
          subtext="Binary Sentiment Polarity Categorization"
          icon={Target}
        />
        <InfoCard 
          label="DATASET" 
          value="IMDb Reviews" 
          subtext="50,000 Movie Reviews Dataset"
          icon={Database}
        />
        <InfoCard 
          label="CLASSES" 
          value="Positive / Negative" 
          subtext="2-Class Sentiment Categories"
          badge="Binary Sentiment"
          badgeColor="bg-emerald-100 text-emerald-800"
        />
        <InfoCard 
          label="STATUS" 
          value="Implementation in Progress" 
          subtext="Phase 1: Frontend Foundation & Navigation Structure"
          badge="Task 1 Complete"
          badgeColor="bg-amber-100 text-amber-800 font-mono"
          icon={Clock}
        />
        <InfoCard 
          label="ARCHITECTURE" 
          value="BiLSTM + Attention" 
          subtext="Text → Preprocessing → Embedding → BiLSTM → Attention → Dense → Classification"
          icon={Sparkles}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono">
            QUICK ACTIONS & NAVIGATION
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click any action to explore section page</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => setCurrentPage('single-prediction')}
            className="p-4 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Single Prediction</div>
                <div className="text-[11px] text-slate-500 font-medium">Test individual sentence</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentPage('batch-prediction')}
            className="p-4 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Batch Prediction</div>
                <div className="text-[11px] text-slate-500 font-medium">Multi-text & CSV processing</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentPage('attention-visualization')}
            className="p-4 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Attention Visualization</div>
                <div className="text-[11px] text-slate-500 font-medium">Token importance heatmaps</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentPage('how-attention-works')}
            className="p-4 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">How Attention Works</div>
                <div className="text-[11px] text-slate-500 font-medium">Q-K-V Self-Attention demo</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentPage('dataset')}
            className="p-4 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Dataset</div>
                <div className="text-[11px] text-slate-500 font-medium">IMDb movie reviews corpus</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentPage('evaluation')}
            className="p-4 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Evaluation</div>
                <div className="text-[11px] text-slate-500 font-medium">Accuracy & Confusion Matrix</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            <h3>What is this project?</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Attention is a mechanism used in deep learning that allows a model to give different importance to different parts of an input sequence. In text classification, attention can help identify words that are more relevant to the final classification.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <Target className="w-4 h-4" />
            <h3>Project Goal</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The goal of this project is to develop and demonstrate an attention-based text classification system and visualize how attention contributes to the classification process.
          </p>
        </div>
      </div>

      {/* Project Pipeline */}
      <PipelineDiagram />
    </div>
  );
};
