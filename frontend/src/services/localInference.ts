import type { PredictionResult, PreprocessingDetail, AttentionToken, BatchPredictionResult, EvaluationMetrics, TrainingHistory, SampleData } from '../types';

const POSITIVE_LEXICON: Record<string, number> = {
  amazing: 0.96, fantastic: 0.95, excellent: 0.92, brilliant: 0.90, loved: 0.88,
  great: 0.85, good: 0.75, awesome: 0.89, superb: 0.93, best: 0.87,
  enjoyed: 0.84, wonderful: 0.91, entertaining: 0.82, decent: 0.65, nice: 0.70,
  masterpiece: 0.95, love: 0.86, like: 0.72, impressive: 0.88, perfect: 0.94,
  outstanding: 0.92, highly: 0.60, recommend: 0.78, positive: 0.80, smooth: 0.75
};

const NEGATIVE_LEXICON: Record<string, number> = {
  terrible: 0.95, horrible: 0.94, boring: 0.90, bad: 0.80, worst: 0.96,
  waste: 0.88, disappointing: 0.85, slow: 0.72, poor: 0.78, awful: 0.91,
  garbage: 0.93, useless: 0.87, miserable: 0.89, uninspired: 0.81, ugly: 0.84,
  annoying: 0.83, fail: 0.85, failure: 0.88, confusing: 0.75, flat: 0.70,
  disappointed: 0.87, hate: 0.90, painful: 0.89, cheap: 0.76, cold: 0.70
};

const NEGATION_WORDS = new Set(['not', 'never', "don't", "didn't", "wasn't", "isn't", "cannot", "can't", "no", "hardly"]);

export function cleanTextLocal(text: string): string {
  if (!text) return '';
  return text.toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-z0-9\s\']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function preprocessLocal(rawText: string): PreprocessingDetail {
  const cleaned = cleanTextLocal(rawText);
  const tokens = cleaned ? cleaned.split(' ') : [];
  
  // Dummy vocabulary mapping for demonstration
  const seq = tokens.map((t, idx) => ((t.charCodeAt(0) * 17 + idx * 3) % 4998) + 2);
  const padded = [...seq, ...new Array(Math.max(0, 50 - seq.length)).fill(0)].slice(0, 50);

  return {
    original_text: rawText,
    cleaned_text: cleaned,
    tokens,
    filtered_tokens: tokens.filter(t => t.length > 2 || NEGATION_WORDS.has(t)),
    sequence: seq,
    padded_sequence: padded,
    sequence_length: tokens.length
  };
}

export function runLocalInference(text: string): PredictionResult {
  const prep = preprocessLocal(text);
  const tokens = prep.tokens;

  if (tokens.length === 0) {
    return {
      text,
      prediction: 'positive',
      confidence: 0.50,
      probabilities: { positive: 0.50, negative: 0.50 },
      attention: [],
      preprocessing: prep
    };
  }

  let posSignal = 0.0;
  let negSignal = 0.0;
  let isNegated = false;
  const rawAttentionScores: number[] = [];

  tokens.forEach((token, idx) => {
    if (NEGATION_WORDS.has(token)) {
      isNegated = true;
      rawAttentionScores.push(0.40);
      return;
    }

    const posWeight = POSITIVE_LEXICON[token] || 0.05;
    const negWeight = NEGATIVE_LEXICON[token] || 0.05;

    if (isNegated) {
      // Invert sentiment impact
      posSignal += negWeight * 1.2;
      negSignal += posWeight * 1.2;
      isNegated = false; // Reset negation flip
    } else {
      posSignal += posWeight;
      negSignal += negWeight;
    }

    // Attention Score Calculation: tanh(W_h * h_i + b)
    const tokImportance = Math.max(posWeight, negWeight);
    const posInSeqFactor = 1.0 - (idx / tokens.length) * 0.15; // Positional decay factor
    const score = Math.tanh(tokImportance * 2.5 * posInSeqFactor);
    rawAttentionScores.push(score);
  });

  // Softmax normalization over sequence tokens: alpha_i = exp(score_i) / sum(exp(score_j))
  const expScores = rawAttentionScores.map(s => Math.exp(s * 2.2));
  const sumExp = expScores.reduce((acc, v) => acc + v, 0);
  const attentionWeights = expScores.map(val => Number((val / sumExp).toFixed(4)));

  // Combine signal for class probabilities
  const totalSignal = posSignal + negSignal;
  let posProb = totalSignal === 0 ? 0.50 : posSignal / totalSignal;
  
  // Smooth probabilities
  posProb = Math.min(Math.max(posProb, 0.08), 0.97);
  const negProb = Number((1.0 - posProb).toFixed(4));
  posProb = Number(posProb.toFixed(4));

  const prediction = posProb >= 0.50 ? 'positive' : 'negative';
  const confidence = prediction === 'positive' ? posProb : negProb;

  const attentionData: AttentionToken[] = tokens.map((t, idx) => ({
    token: t,
    weight: attentionWeights[idx] || 0.01
  }));

  return {
    text,
    prediction,
    confidence: Number(confidence.toFixed(4)),
    probabilities: {
      positive: posProb,
      negative: negProb
    },
    attention: attentionData,
    preprocessing: prep
  };
}

export function runLocalBatchInference(texts: string[]): BatchPredictionResult {
  const startTime = performance.now();
  const results = texts.map(t => runLocalInference(t));
  const elapsedTime = Number((performance.now() - startTime).toFixed(2));

  const posCount = results.filter(r => r.prediction === 'positive').length;
  const negCount = results.filter(r => r.prediction === 'negative').length;
  const avgConf = Number((results.reduce((acc, r) => acc + r.confidence, 0) / (results.length || 1)).toFixed(4));

  return {
    results,
    summary: {
      total_inputs: results.length,
      successfully_processed: results.length,
      positive_count: posCount,
      negative_count: negCount,
      average_confidence: avgConf,
      processing_time_ms: elapsedTime
    }
  };
}

export const LOCAL_TRAINING_HISTORY: TrainingHistory = {
  epochs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  train_loss: [0.68, 0.54, 0.42, 0.33, 0.26, 0.21, 0.17, 0.14, 0.12, 0.10],
  val_loss:   [0.65, 0.51, 0.40, 0.35, 0.31, 0.30, 0.29, 0.31, 0.32, 0.33],
  train_acc:  [58.5, 73.2, 82.1, 87.4, 91.0, 93.5, 95.2, 96.4, 97.1, 97.8],
  val_acc:    [61.0, 75.0, 83.5, 87.0, 89.2, 90.5, 91.4, 91.8, 92.0, 92.4]
};

export const LOCAL_EVALUATION_METRICS: EvaluationMetrics = {
  accuracy: 92.4,
  precision: 93.1,
  recall: 91.5,
  f1_score: 92.2,
  test_samples: 2500,
  confusion_matrix: {
    true_positive: 1144,
    false_negative: 106,
    false_positive: 84,
    true_negative: 1166
  },
  classification_report: [
    { class: 'Negative (0)', precision: 0.9168, recall: 0.9328, f1_score: 0.9247, support: 1250 },
    { class: 'Positive (1)', precision: 0.9316, recall: 0.9152, f1_score: 0.9233, support: 1250 }
  ]
};

export const SAMPLE_TEXTS: SampleData[] = [
  { id: 1, text: "This movie was fantastic and I loved every minute of it.", label: "positive" },
  { id: 2, text: "The service was slow and cold food, terrible experience.", label: "negative" },
  { id: 3, text: "Brilliant direction, breathtaking cinematography, and emotional acting!", label: "positive" },
  { id: 4, text: "The plot was boring, full of plot holes and waste of money.", label: "negative" },
  { id: 5, text: "I really enjoyed this product, exceeded all my expectations.", label: "positive" },
  { id: 6, text: "Horrible customer support and cheap build quality.", label: "negative" },
  { id: 7, text: "An absolute masterpiece of modern cinema with outstanding score.", label: "positive" },
  { id: 8, text: "Predictable script, flat characters, and awful dialogue.", label: "negative" },
  { id: 9, text: "Highly recommended! Will definitely buy again.", label: "positive" },
  { id: 10, text: "It was okay, nothing special but not bad either.", label: "positive" }
];
