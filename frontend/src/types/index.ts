import type { LucideIcon } from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'single-prediction'
  | 'batch-prediction'
  | 'attention-visualization'
  | 'how-attention-works'
  | 'dataset'
  | 'training'
  | 'evaluation'
  | 'model-comparison'
  | 'literature-survey'
  | 'research-gap'
  | 'case-study'
  | 'applications'
  | 'advantages-limitations'
  | 'project-architecture'
  | 'ppt-content'
  | 'project-report'
  | 'viva-questions'
  | 'documentation';

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
  category?: string;
}

export interface AttentionToken {
  token: string;
  weight: number;
}

export interface PreprocessingDetail {
  original_text: string;
  cleaned_text: string;
  tokens: string[];
  filtered_tokens: string[];
  sequence: number[];
  padded_sequence: number[];
  sequence_length: number;
}

export interface PredictionResult {
  text: string;
  prediction: 'positive' | 'negative' | 'neutral';
  confidence: number;
  probabilities: {
    positive: number;
    negative: number;
  };
  attention: AttentionToken[];
  preprocessing?: PreprocessingDetail;
}

export interface BatchSummary {
  total_inputs: number;
  successfully_processed: number;
  positive_count: number;
  negative_count: number;
  average_confidence: number;
  processing_time_ms: number;
}

export interface BatchPredictionResult {
  results: PredictionResult[];
  summary: BatchSummary;
}

export interface CSVRowResult {
  id: string;
  text: string;
  prediction: 'positive' | 'negative';
  confidence: number;
  positive_probability: number;
  negative_probability: number;
}

export interface ModelInfo {
  model_name: string;
  architecture: string;
  task: string;
  dataset: string;
  classes: string[];
  train_split: string;
  val_split: string;
  test_split: string;
  hyperparameters: {
    epochs: number;
    batch_size: number;
    learning_rate: number;
    optimizer: string;
    loss_function: string;
    max_seq_len: number;
    vocab_size: number;
    embedding_dim: number;
    bilstm_units: number;
  };
}

export interface EvaluationMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  test_samples: number;
  confusion_matrix: {
    true_positive: number;
    false_negative: number;
    false_positive: number;
    true_negative: number;
  };
  classification_report: {
    class: string;
    precision: number;
    recall: number;
    f1_score: number;
    support: number;
  }[];
}

export interface TrainingHistory {
  epochs: number[];
  train_loss: number[];
  val_loss: number[];
  train_acc: number[];
  val_acc: number[];
}

export interface SampleData {
  id: number;
  text: string;
  label: 'positive' | 'negative';
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  problem: string;
  method: string;
  attentionType: string;
  dataset: string;
  contribution: string;
  limitations: string;
  relationToProject: string;
  link?: string;
}

export interface VivaQuestion {
  id: number;
  category: 'Attention' | 'Deep Learning' | 'Preprocessing' | 'Metrics' | 'Architecture' | 'Research';
  question: string;
  answer: string;
}

export interface PPTSlide {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  suggestedVisual: string;
}
