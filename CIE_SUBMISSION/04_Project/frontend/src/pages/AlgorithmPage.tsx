import React from 'react';
import { Code2, Terminal } from 'lucide-react';

export const AlgorithmPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <span>Algorithm & Execution Pseudocode</span>
        </h1>
        <p className="text-xs text-slate-500">
          Formal step-by-step pseudocode algorithm for data preprocessing, attention scoring, training, and inference.
        </p>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-100 font-mono text-xs shadow-lg space-y-4">
        <div className="flex items-center justify-between text-indigo-400 font-sans font-bold text-sm">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4" /> ALGORITHM: Attention-Based Text Classification Pipeline
          </span>
          <span className="text-xs text-slate-400 font-mono">PyTorch / FastAPI</span>
        </div>

        <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 leading-relaxed overflow-x-auto">
{`START

1.  [DATA PREPARATION]
    a. Load IMDb Movie Reviews dataset (50,000 samples)
    b. Split dataset: 80% Training (40k), 10% Validation (5k), 10% Testing (5k)

2.  [PREPROCESSING & VOCABULARY]
    FOR EACH text in training dataset:
        Clean text: lowercase conversion, HTML tag removal, special symbol filtering
        Tokenize text into word token list
        Filter standard stopwords while preserving sentiment keywords (e.g. "not", "bad", "good")
    Build Vocabulary mapping word -> index (top 5,000 frequent tokens)
    FOR EACH text:
        Convert tokens to integer index sequence
        Pad or truncate sequence to fixed length MAX_LEN = 50 tokens

3.  [MODEL ARCHITECTURE INITIALIZATION]
    a. Embedding Layer: Map token IDs -> 64-dimensional dense vectors
    b. Bidirectional LSTM Layer: Process sequence forward and backward (hidden_dim = 128 x 2)
    c. Additive Attention Layer:
        Compute raw score_i = tanh(W_h * h_i + b)
        Apply Softmax normalization: alpha_i = exp(score_i) / Σ exp(score_j)
        Compute Context Vector c = Σ (alpha_i * h_i)
    d. Dense Classification Head: Dense(64) -> Dropout(0.3) -> Dense(2) -> Softmax Probabilities

4.  [MODEL TRAINING & VALIDATION]
    Initialize Adam Optimizer (lr = 0.001) and CrossEntropy Loss
    FOR epoch = 1 to 10:
        FOR EACH batch (X_batch, y_batch) in Train DataLoader:
            Forward pass through Embedding -> BiLSTM -> Attention -> Dense -> Softmax
            Calculate loss L(y_pred, y_true)
            Backpropagate gradients and update weights
        Evaluate validation accuracy and loss on Validation DataLoader
    Save model weights and training history metrics JSON

5.  [INFERENCE & PREDICTION (New User Input)]
    Receive input text string
    Preprocess and tokenize input
    Pass padded token sequence through trained model
    EXTRACT predicted class label ("positive" / "negative"), confidence %, and token attention weights alpha_i
    DISPLAY prediction badge, probability chart, and token attention heatmap to user

END`}
        </pre>
      </div>
    </div>
  );
};
