import React from 'react';
import { BookOpen, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ResearchPaper } from '../types';

const PAPERS: ResearchPaper[] = [
  {
    id: "bahdanau2014",
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    authors: "Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio",
    year: 2014,
    problem: "Bottleneck of fixed-length encoder vector in traditional seq2seq sequence translation.",
    method: "Introduced Additive Attention allowing decoder to search for relevant encoder hidden states.",
    attentionType: "Additive Attention: score = v_a^T tanh(W_a s_{t-1} + U_a h_i)",
    dataset: "WMT 14 English-to-French Translation",
    contribution: "Pioneered neural attention mechanisms by jointly aligning and translating sequences.",
    limitations: "Higher computational overhead during sequential decoding.",
    relationToProject: "Foundation for our additive sequence classification attention layer score calculation.",
    link: "https://arxiv.org/abs/1409.0473"
  },
  {
    id: "luong2015",
    title: "Effective Approaches to Attention-based Neural Machine Translation",
    authors: "Minh-Thang Luong, Hieu Pham, Christopher D. Manning",
    year: 2015,
    problem: "Global vs local attention efficiency and dot-product vs multiplicative scoring functions.",
    method: "Proposed Global (all tokens) and Local (subset window) attention architectures.",
    attentionType: "Multiplicative / Dot-Product Attention: score = h_t^T W_a h_s",
    dataset: "WMT 14 & 15 Machine Translation Datasets",
    contribution: "Simplified attention calculation via matrix dot-products and local context windows.",
    limitations: "Local attention requires fixed window hyperparameter selection.",
    relationToProject: "Provides comparative theoretical baseline for multiplicative vs additive attention.",
    link: "https://arxiv.org/abs/1508.04025"
  },
  {
    id: "vaswani2017",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, et al.",
    year: 2017,
    problem: "Sequential recurrence in LSTMs prevents parallelization and slows down long sequence training.",
    method: "Introduced Transformer architecture based entirely on Scaled Dot-Product Self-Attention.",
    attentionType: "Scaled Dot-Product Self-Attention: softmax(QK^T / sqrt(d_k))V",
    dataset: "WMT 2014 English-to-German & English-to-French",
    contribution: "Replaced RNNs entirely with multi-head self-attention, enabling parallel training.",
    limitations: "Quadratic memory complexity O(N^2) with respect to sequence length N.",
    relationToProject: "Theoretical basis for our interactive Q-K-V self-attention demonstration page.",
    link: "https://arxiv.org/abs/1706.03762"
  },
  {
    id: "yang2016",
    title: "Hierarchical Attention Networks for Document Classification",
    authors: "Zichao Yang, Diyi Yang, Chris Dyer, Xiaodong He, Alex Smola, Eduard Hovy",
    year: 2016,
    problem: "Document classification requires capturing importance at both word level and sentence level.",
    method: "Hierarchical attention network (Word Attention -> Sentence Attention -> Classifier).",
    attentionType: "Two-level Additive Attention (Word-level & Sentence-level)",
    dataset: "Yelp, IMDb, Amazon Reviews Datasets",
    contribution: "Demonstrated that attention weights highlight informative words and sentences for classification.",
    limitations: "Hierarchical parsing requires document sentence segmentation.",
    relationToProject: "Directly inspires our token-level attention heatmap and interpretability UI for IMDb reviews.",
    link: "https://aclanthology.org/N16-1174/"
  }
];

export const LiteratureSurvey: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Literature Survey & Foundational Research</span>
        </h1>
        <p className="text-xs text-slate-500">
          Critical survey of four authentic landmark attention papers in Natural Language Processing.
        </p>
      </div>

      {/* Individual Papers Grid */}
      <div className="space-y-4">
        {PAPERS.map((paper, idx) => (
          <div key={paper.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  Paper #{idx + 1} ({paper.year})
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">{paper.title}</h3>
                <p className="text-xs text-slate-500 font-medium">Authors: {paper.authors}</p>
              </div>

              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors shrink-0"
                >
                  <span>Read Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-700">Problem Addressed:</div>
                <p className="text-slate-600">{paper.problem}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-700">Method & Attention Mechanism:</div>
                <p className="text-slate-600 font-mono">{paper.attentionType}</p>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-1">
              <div className="font-bold text-indigo-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Relevance to Our B.Tech PBL Project:</span>
              </div>
              <p className="text-indigo-800">{paper.relationToProject}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Literature Comparison Matrix */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-800">Literature Survey Summary Table</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-2.5">Paper</th>
                <th className="p-2.5">Year</th>
                <th className="p-2.5">Attention Type</th>
                <th className="p-2.5">Dataset</th>
                <th className="p-2.5">Main Contribution</th>
                <th className="p-2.5">Relation to Project</th>
              </tr>
            </thead>
            <tbody>
              {PAPERS.map((p, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/70">
                  <td className="p-2.5 font-bold text-slate-800">{p.authors.split(',')[0]} et al.</td>
                  <td className="p-2.5 font-mono text-slate-600">{p.year}</td>
                  <td className="p-2.5 font-mono text-indigo-700 font-semibold">{p.attentionType.split(':')[0]}</td>
                  <td className="p-2.5 text-slate-600">{p.dataset}</td>
                  <td className="p-2.5 text-slate-700">{p.contribution}</td>
                  <td className="p-2.5 text-indigo-800 font-medium">{p.relationToProject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* What Our Project Adds */}
        <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs space-y-2">
          <h3 className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>What Our Project Adds (Practical Implementation Value)</span>
          </h3>
          <ul className="list-disc list-inside text-emerald-900 space-y-1 pl-1">
            <li><strong>Fully Functional Interactive Web Dashboard:</strong> Real-time single and batch sentiment predictions without static mocks.</li>
            <li><strong>Multi-Input & CSV Upload Support:</strong> Processes complete dataset files row-by-row with CSV export capabilities.</li>
            <li><strong>Token-Level Attention Heatmaps:</strong> Visualizes word importance weights ($\alpha_i$) directly to demystify black-box deep learning models.</li>
            <li><strong>Dual-Engine Execution:</strong> Combines a Python FastAPI service with a client-side in-browser local inference fallback.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
