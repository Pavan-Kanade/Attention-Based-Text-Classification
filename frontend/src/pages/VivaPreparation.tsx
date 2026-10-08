import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import type { VivaQuestion } from '../types';

const VIVA_QUESTIONS: VivaQuestion[] = [
  { id: 1, category: 'Attention', question: "What is the attention mechanism in deep learning?", answer: "Attention is a mechanism that allows a neural network to focus on specific, highly relevant parts of an input sequence when making predictions, rather than compressing the entire input into a single static context vector." },
  { id: 2, category: 'Attention', question: "Why is attention needed for text sequence classification?", answer: "Traditional RNNs/LSTMs process words sequentially and suffer from an information bottleneck where earlier token details fade over long sequences. Attention enables the model to assign higher weights to crucial sentiment words regardless of their position." },
  { id: 3, category: 'Attention', question: "What problem does attention solve over traditional encoder-decoder architectures?", answer: "It solves the fixed-length vector bottleneck problem by creating direct shortcuts between the classification head and all intermediate hidden states of the encoder sequence." },
  { id: 4, category: 'Architecture', question: "What is Query (Q) in attention mechanisms?", answer: "Query represents the current token vector or state that is asking 'what relevant information should I look for across the sequence?'" },
  { id: 5, category: 'Architecture', question: "What is Key (K) in attention mechanisms?", answer: "Key represents the feature vector of each target token in the sequence, acting as an index or advertisement for what information that token holds." },
  { id: 6, category: 'Architecture', question: "What is Value (V) in attention mechanisms?", answer: "Value represents the actual informational content or hidden representation of each token that gets weighted and summed to form the final output." },
  { id: 7, category: 'Attention', question: "What is an attention score?", answer: "An attention score is an unnormalized scalar metric (calculated via tanh additive scoring score_i = tanh(W_h * h_i + b) or dot-product QK^T) measuring the alignment between a query and key." },
  { id: 8, category: 'Attention', question: "Why is Softmax used in the attention layer?", answer: "Softmax normalizes raw attention scores into probability weights (alpha_i) between 0 and 1 that sum up to exactly 1.0." },
  { id: 9, category: 'Attention', question: "What is self-attention?", answer: "Self-attention (intra-attention) relates different positions of a single sequence to compute a representation of the exact same sequence." },
  { id: 10, category: 'Attention', question: "What is the difference between sequence classification attention and self-attention?", answer: "Sequence classification attention uses a learnable context vector or last hidden state to weight all sequence tokens into a single summary vector, whereas self-attention computes an N x N token-to-token relationship matrix." },
  { id: 11, category: 'Attention', question: "What is Scaled Dot-Product Attention?", answer: "It is the attention formula defined in 'Attention Is All You Need': Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V." },
  { id: 12, category: 'Attention', question: "Why is the scaling factor sqrt(d_k) used in dot-product attention?", answer: "For large values of dimension d_k, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients. Scaling by 1/sqrt(d_k) prevents gradient vanishing." },
  { id: 13, category: 'Attention', question: "What is an attention weight (alpha_i)?", answer: "A normalized scalar probability indicating the fractional importance assigned to token i in the input sequence." },
  { id: 14, category: 'Attention', question: "What is a context vector (c)?", answer: "The weighted linear combination of all hidden states c = sum(alpha_i * h_i) representing the summarized sequence content." },
  { id: 15, category: 'Deep Learning', question: "Why use Bidirectional LSTM (BiLSTM) instead of standard LSTM?", answer: "BiLSTM processes sequence text in both forward (left-to-right) and backward (right-to-left) directions, capturing context from past and future words simultaneously." },
  { id: 16, category: 'Deep Learning', question: "What is overfitting and how is it prevented in this project?", answer: "Overfitting occurs when a model memorizes training noise instead of generalizing. It is mitigated using Dropout (0.3), validation monitoring, and L2 regularization." },
  { id: 17, category: 'Deep Learning', question: "Why use Dropout in neural networks?", answer: "Dropout randomly deactivates a fraction of neurons during training, preventing co-adaptation of features and forcing robust feature representations." },
  { id: 18, category: 'Preprocessing', question: "What is word embedding?", answer: "Word embedding maps discrete integer token IDs into continuous, dense vector spaces where semantically similar words have similar geometric distances." },
  { id: 19, category: 'Preprocessing', question: "What is tokenization?", answer: "The NLP process of breaking raw text strings into discrete atomic units (tokens) such as words or subwords." },
  { id: 20, category: 'Preprocessing', question: "Why is sequence padding required?", answer: "Neural network batch operations require fixed-size tensor inputs. Sequences shorter than MAX_LEN are padded with zeros (<PAD>=0)." },
  { id: 21, category: 'Preprocessing', question: "Why are sentiment words like 'not' or 'never' preserved during stopword removal?", answer: "Removing negations like 'not' flips sentiment completely (e.g. 'not good' becomes 'good'), causing misclassification." },
  { id: 22, category: 'Metrics', question: "What is Precision?", answer: "Precision = TP / (TP + FP). It measures out of all reviews predicted as positive, how many were actually positive." },
  { id: 23, category: 'Metrics', question: "What is Recall?", answer: "Recall = TP / (TP + FN). It measures out of all actual positive reviews, how many were correctly identified by the model." },
  { id: 24, category: 'Metrics', question: "What is F1-Score?", answer: "F1-Score = 2 * (Precision * Recall) / (Precision + Recall). It is the harmonic mean of precision and recall." },
  { id: 25, category: 'Research', question: "What is the primary research gap addressed in this project?", answer: "Addressing the black-box nature and information bottleneck of traditional RNN sequence classifiers through interpretable attention heatmaps." },
  { id: 26, category: 'Research', question: "Why was the IMDb Movie Reviews dataset selected?", answer: "IMDb is a standard benchmark dataset containing 50,000 highly expressive movie reviews with clear binary sentiment polarity." },
  { id: 27, category: 'Architecture', question: "What are the limitations of the attention mechanism?", answer: "Attention increases computational matrix multiplication overhead and attention weights indicate correlation rather than guaranteed causality." },
  { id: 28, category: 'Architecture', question: "What are the real-world applications of this project?", answer: "Customer feedback analysis, support ticket routing, social media brand sentiment tracking, and spam filtering." },
  { id: 29, category: 'Architecture', question: "How can this project be improved in future work?", answer: "By upgrading to fine-tuned Transformer models (BERT / RoBERTa) and supporting multi-class sentiment granularities (1-5 stars)." },
  { id: 30, category: 'Architecture', question: "What is the key difference between Attention-BiLSTM and a Transformer?", answer: "Attention-BiLSTM uses recurrent LSTM timesteps combined with an attention layer, whereas Transformers replace recurrence entirely with multi-head self-attention layers." }
];

export const VivaPreparation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = ["All", "Attention", "Deep Learning", "Preprocessing", "Metrics", "Architecture", "Research"];

  const filtered = VIVA_QUESTIONS.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === "All" || q.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>Viva Preparation & Oral Defense (30 Questions & Answers)</span>
        </h1>
        <p className="text-xs text-slate-500">
          Comprehensive student-friendly question-and-answer guide designed for Third-Year B.Tech viva exams and project presentations.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search viva questions or keywords (e.g. 'softmax', 'Q-K-V')..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List Accordion */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No questions matching search term.
          </div>
        ) : (
          filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-2">
                    <span className="w-7 text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md shrink-0">
                      Q{item.id}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{item.question}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/70 text-xs text-slate-700 leading-relaxed font-sans border-l-4 border-l-indigo-600">
                    <strong className="text-slate-900 font-bold block mb-1">Answer / Defense Guide:</strong>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
