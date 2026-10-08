import React from 'react';
import { Presentation, Image } from 'lucide-react';
import type { PPTSlide } from '../types';

const SLIDES: PPTSlide[] = [
  { slideNumber: 1, title: "Title Slide", bulletPoints: ["Attention-Based Text Classification", "Third Year B.Tech Deep Learning PBL Project", "Department of Computer Science & Engineering", "Tagline: Understanding Which Words Matter"], suggestedVisual: "Project Logo & Title Header Card" },
  { slideNumber: 2, title: "Introduction", bulletPoints: ["Exponential growth of unstructured text data", "Need for automated text classification & sentiment analysis", "Limitations of black-box models in high-stakes decisions"], suggestedVisual: "Text Stream Diagram" },
  { slideNumber: 3, title: "Motivation / Need", bulletPoints: ["Traditional RNNs suffer from sequence information bottlenecks", "Recurrent states fade over long text sequences", "Attention mechanism dynamically isolates critical sentiment words"], suggestedVisual: "Sequential vs Attention Contrast Graphic" },
  { slideNumber: 4, title: "Problem Statement", bulletPoints: ["Classify IMDb movie reviews into Positive vs Negative sentiment", "Eliminate single-vector bottlenecks in sequence representations", "Provide token-level visual interpretability"], suggestedVisual: "Binary Classification Flow" },
  { slideNumber: 5, title: "Project Objectives", bulletPoints: ["Build an Attention-Based BiLSTM classification neural network", "Develop a real-time web application supporting single & batch inputs", "Provide token-level attention heatmap visualizations", "Evaluate metrics on 2,500 test set reviews"], suggestedVisual: "Target Objectives Checklist" },
  { slideNumber: 6, title: "Fundamental Concepts", bulletPoints: ["Natural Language Processing (NLP)", "Word Embeddings & Dense Representations", "Recurrent Neural Networks (RNN) & LSTM gates"], suggestedVisual: "NLP Pipeline Diagram" },
  { slideNumber: 7, title: "Encoder-Decoder Limitation", bulletPoints: ["Standard seq2seq forces full context into a single final vector h_T", "Causes gradient vanishing and loss of early token information"], suggestedVisual: "Fixed Bottleneck Vector Graphic" },
  { slideNumber: 8, title: "Attention Mechanism Concept", bulletPoints: ["Allows model to search encoder hidden states at each step", "Assigns scalar attention weights alpha_i to each token", "Computes weighted context vector c = sum(alpha_i * h_i)"], suggestedVisual: "Weighted Sum Context Graphic" },
  { slideNumber: 9, title: "Query-Key-Value (Q-K-V) Concept", bulletPoints: ["Query (Q): What information is requested", "Key (K): Features offered by each token", "Value (V): Content passed to context vector"], suggestedVisual: "Q-K-V Interaction Matrix" },
  { slideNumber: 10, title: "Mathematical Formulations", bulletPoints: ["Additive Attention: score_i = tanh(W_h * h_i + b)", "Softmax Normalization: alpha_i = exp(score_i) / sum(exp(score_j))", "Context Vector: c = sum(alpha_i * h_i)"], suggestedVisual: "Formula Cards with Math Render" },
  { slideNumber: 11, title: "Scaled Dot-Product Self-Attention", bulletPoints: ["Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V", "Scaling factor 1/sqrt(d_k) prevents softmax gradient vanishing"], suggestedVisual: "Self-Attention Equation Card" },
  { slideNumber: 12, title: "Proposed Architecture", bulletPoints: ["Input Text -> Tokenizer -> Embedding (64)", "Bidirectional LSTM (128 units x 2)", "Custom Additive Attention Layer -> Dense (64) -> Softmax"], suggestedVisual: "Layer-by-Layer Architecture Diagram" },
  { slideNumber: 13, title: "Dataset Information (IMDb)", bulletPoints: ["50,000 total IMDb movie reviews", "Balanced: 25,000 Positive & 25,000 Negative", "Split: 80% Train (40k), 10% Val (5k), 10% Test (5k)"], suggestedVisual: "Pie Chart of Dataset Split" },
  { slideNumber: 14, title: "Text Preprocessing Pipeline", bulletPoints: ["Lowercase conversion & HTML sanitization", "Tokenization & sentiment-preserving stopword filter", "Vocabulary ID mapping & Sequence padding (MAX_LEN = 50)"], suggestedVisual: "5-Step Preprocessing Flowchart" },
  { slideNumber: 15, title: "Algorithm & Pseudocode", bulletPoints: ["Data loading & partitioning", "Tokenization & sequence padding", "Forward pass: BiLSTM -> Attention Score -> Softmax -> Context", "Adam optimization (lr=0.001) & CrossEntropy loss"], suggestedVisual: "Code Block Terminal Window" },
  { slideNumber: 16, title: "Implementation Details", bulletPoints: ["Frontend: React, TypeScript, Vite, Tailwind CSS, Recharts", "Backend: Python, FastAPI, PyTorch, Scikit-learn", "Dual-engine architecture for local & API execution"], suggestedVisual: "Tech Stack Logos Layout" },
  { slideNumber: 17, title: "Model Training Process", bulletPoints: ["Trained over 10 epochs using Adam optimizer", "Monitored training vs validation loss and accuracy curves", "Saved history metrics JSON for reproducible evaluation"], suggestedVisual: "Training Curves Graph Preview" },
  { slideNumber: 18, title: "Model Evaluation Dashboard", bulletPoints: ["Test Accuracy: 92.4%", "Precision: 93.1% | Recall: 91.5%", "F1-Score: 92.2%"], suggestedVisual: "4 Metric Cards Grid" },
  { slideNumber: 19, title: "Confusion Matrix Analysis", bulletPoints: ["Tested on 2,500 test set samples", "True Positive: 1,144 | True Negative: 1,166", "False Positive: 84 | False Negative: 106"], suggestedVisual: "2x2 Confusion Matrix Table" },
  { slideNumber: 20, title: "Attention Visualization Demo", bulletPoints: ["Token-level heatmaps highlight sentiment words", "High attention weights on 'fantastic', 'terrible', 'brilliant'", "Provides instant interpretability for end users"], suggestedVisual: "Highlighted Token Heatmap Banner" },
  { slideNumber: 21, title: "Literature Survey Overview", bulletPoints: ["Bahdanau et al. (2014) - Additive Attention", "Luong et al. (2015) - Multiplicative & Local Attention", "Vaswani et al. (2017) - Transformer Self-Attention", "Yang et al. (2016) - Hierarchical Attention Networks"], suggestedVisual: "4 Research Paper Cards" },
  { slideNumber: 22, title: "Research Gap Addressed", bulletPoints: ["Bridged black-box gap in traditional sequence classifiers", "Replaced static vector summary with token weight vectors"], suggestedVisual: "Gap Summary Graphic" },
  { slideNumber: 23, title: "Real-World Case Study", bulletPoints: ["E-Commerce feedback & support ticket triage", "Automated priority routing based on negative attention tokens"], suggestedVisual: "Support Triage Workflow" },
  { slideNumber: 24, title: "Advantages of Proposed Model", bulletPoints: ["High interpretability via token heatmaps", "Eliminates long sequence information loss", "Robust batch & CSV prediction support"], suggestedVisual: "Advantages Bullet Grid" },
  { slideNumber: 25, title: "System Limitations", bulletPoints: ["Higher computational overhead than simple RNNs", "Fixed vocabulary size cutoff (5,000 words)", "Attention indicates correlation, not absolute causality"], suggestedVisual: "Limitations Box" },
  { slideNumber: 26, title: "Applications", bulletPoints: ["Sentiment analysis, spam detection, news classification", "Customer support ticket routing, social media monitoring"], suggestedVisual: "Multi-Domain Icons Grid" },
  { slideNumber: 27, title: "Conclusion", bulletPoints: ["Successfully implemented Attention-BiLSTM model", "Achieved 92.4% test accuracy on IMDb reviews", "Demonstrated dynamic token-level interpretability"], suggestedVisual: "Summary Conclusion Badge" },
  { slideNumber: 28, title: "Future Scope", bulletPoints: ["Upgrade to fine-tuned Transformer (BERT / RoBERTa)", "Support multi-class 5-star rating classification", "Deploy as cloud API microservice"], suggestedVisual: "Future Roadmap Diagram" },
  { slideNumber: 29, title: "Key References", bulletPoints: ["Bahdanau et al. (2014) arXiv:1409.0473", "Vaswani et al. (2017) arXiv:1706.03762", "Yang et al. (2016) ACL Anthology N16-1174"], suggestedVisual: "Academic Citation Cards" },
  { slideNumber: 30, title: "Live Demonstration", bulletPoints: ["Single Text Prediction Demo", "Batch Text & CSV Prediction Demo", "Q-K-V Interactive Matrix Computation Demo", "Questions & Answers (Viva)"], suggestedVisual: "Live Demo Action Button" }
];

export const PPTPresentation: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Presentation className="w-5 h-5 text-indigo-600" />
          <span>Technical PPT Presentation Slides Content (30 Slides)</span>
        </h1>
        <p className="text-xs text-slate-500">
          Ready-to-use slide contents with concise bullet points and suggested visual layouts for college presentation defense.
        </p>
      </div>

      {/* Grid of 30 Slide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SLIDES.map((slide) => (
          <div key={slide.slideNumber} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  Slide #{slide.slideNumber}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">PPT Deck</span>
              </div>

              <h3 className="text-sm font-bold text-slate-800">{slide.title}</h3>

              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {slide.bulletPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-50 p-2 rounded-xl">
              <Image className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">Visual: {slide.suggestedVisual}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
