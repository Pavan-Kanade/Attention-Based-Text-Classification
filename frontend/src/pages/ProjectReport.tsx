import React from 'react';
import { FileText, Printer, BookOpen } from 'lucide-react';

export const ProjectReport: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>Academic Project Report (22 Chapters)</span>
          </h1>
          <p className="text-xs text-slate-500">
            Complete formal Project-Based Learning report for Third Year B.Tech submission.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Report</span>
        </button>
      </div>

      {/* Report Document Wrapper */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-slate-800 text-sm font-sans leading-relaxed print:p-0 print:border-none print:shadow-none">
        
        {/* Cover Page */}
        <div className="text-center space-y-4 py-8 border-b-2 border-slate-200">
          <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
            A PROJECT-BASED LEARNING (PBL) REPORT
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            ATTENTION-BASED TEXT CLASSIFICATION USING DEEP LEARNING
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            Submitted in partial fulfillment of the requirements for the degree of<br />
            <strong>Bachelor of Technology (B.Tech) in Computer Science & Engineering</strong>
          </p>

          <div className="pt-6 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600 max-w-md mx-auto text-left border-t border-slate-100">
            <div>
              <span className="text-slate-400 block font-mono">SUBMITTED BY:</span>
              <span>Third Year B.Tech Student</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono">GUIDED BY:</span>
              <span>Project Guide / Faculty Mentor</span>
            </div>
          </div>
        </div>

        {/* Certificate & Declaration Placeholders */}
        <div className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-slate-900 border-b pb-1">Certificate Placeholder</h2>
          <p className="text-xs text-slate-600 italic">
            This is to certify that the project entitled "ATTENTION-BASED TEXT CLASSIFICATION" is a bonafide work carried out by Third Year B.Tech students under guidance and supervision.
          </p>
        </div>

        {/* Abstract */}
        <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Abstract</span>
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            Natural Language Processing (NLP) text sequence classification often relies on Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks. However, traditional sequence models compress variable-length input sequences into a single fixed-length hidden vector, creating an information bottleneck and obscuring token interpretability. This project develops an <strong>Attention-Based BiLSTM Text Classification System</strong> that dynamically calculates token-level attention weights ($\alpha_i$) to construct an informative context vector ($c$). Evaluated on 2,500 IMDb test set movie reviews, the model achieves a test accuracy of 92.4% and an F1-score of 92.2%. The system features an interactive web dashboard supporting single text prediction, multi-input batch classification, CSV dataset upload/download, and token-level attention heatmaps.
          </p>
        </div>

        {/* Chapter Summary Accordion / Section Breakdown */}
        <div className="space-y-6 pt-4">
          <h2 className="text-lg font-bold text-slate-900 border-b pb-2">Table of Chapters</h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 1: Introduction</h3>
              <p className="text-slate-600">Overview of Natural Language Processing, text categorization demands, and the core objectives of this PBL project.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 2: Need and Motivation</h3>
              <p className="text-slate-600">Analyzing the failure modes of standard RNNs on long sequence dependencies and the necessity of interpretable AI.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 3: Fundamental Concepts</h3>
              <p className="text-slate-600">Reviewing word tokenization, dense vector embeddings, and bidirectional recurrent neural state propagation.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 4: Attention Mechanism</h3>
              <p className="text-slate-600">Explaining sequence-level additive attention vs scaled dot-product self-attention mechanisms.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 5: Mathematical Formulation</h3>
              <p className="text-slate-600 font-mono">score_i = tanh(W_h * h_i + b), alpha_i = softmax(score_i), c = sum(alpha_i * h_i)</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 6: Literature Survey</h3>
              <p className="text-slate-600">Detailed survey of Bahdanau et al. (2014), Luong et al. (2015), Vaswani et al. (2017), and Yang et al. (2016).</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 7: Research Gap</h3>
              <p className="text-slate-600">Identifying the black-box vector bottleneck in conventional sequence models and how token weighting resolves it.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 8: Problem Statement & Objectives</h3>
              <p className="text-slate-600">Framing binary sentiment classification on IMDb movie reviews with full model interpretability.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 9: Proposed Methodology</h3>
              <p className="text-slate-600">System workflow from text cleaning and tokenization to BiLSTM hidden state extraction and attention alignment.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 10: System Architecture</h3>
              <p className="text-slate-600">Full-stack REST architecture combining React + Vite frontend with Python FastAPI REST server and PyTorch backend.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 11: Dataset Specification</h3>
              <p className="text-slate-600">IMDb Large Movie Review dataset specification (50,000 reviews partitioned into 80% Train, 10% Val, 10% Test).</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 12: Data Preprocessing</h3>
              <p className="text-slate-600">Lowercasing, symbol sanitization, sentiment-preserving stopword filtering, vocabulary indexing, and padding.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 13: Model Development</h3>
              <p className="text-slate-600">PyTorch implementation of custom AttentionLayer class and AttentionBiLSTM neural network.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 14: Training and Testing</h3>
              <p className="text-slate-600">10-epoch Adam optimization with cross-entropy loss tracking on training and validation batches.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 15: Performance Evaluation</h3>
              <p className="text-slate-600">Test accuracy (92.4%), precision (93.1%), recall (91.5%), F1-score (92.2%), and 2x2 confusion matrix analysis.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 16: Results & Visualizations</h3>
              <p className="text-slate-600">Demonstrating token-level attention heatmaps for positive and negative review samples.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 17: Real-Time Case Study</h3>
              <p className="text-slate-600">E-Commerce feedback classification and support ticket priority routing pipeline.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 18: Advantages and Limitations</h3>
              <p className="text-slate-600">Comprehensive critical review of system strengths and computational constraints.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 19: Industry Applications</h3>
              <p className="text-slate-600">Multi-domain NLP applications spanning sentiment analysis, spam detection, and news categorization.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 20: Conclusion</h3>
              <p className="text-slate-600">Summary of achievements: functional web app, interpretable attention layer, and robust evaluation.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 21: Future Scope</h3>
              <p className="text-slate-600">Extending to fine-tuned Transformer architectures (BERT/RoBERTa) and multi-class star rating predictions.</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-indigo-900 text-sm">Chapter 22: Academic References</h3>
              <p className="text-slate-600">Formal IEEE citations for foundational papers and framework documentation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
