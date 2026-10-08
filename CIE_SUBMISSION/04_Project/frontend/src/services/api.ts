import type { PredictionResult, BatchPredictionResult, EvaluationMetrics, TrainingHistory, SampleData } from '../types';
import { runLocalInference, runLocalBatchInference, LOCAL_EVALUATION_METRICS, LOCAL_TRAINING_HISTORY, SAMPLE_TEXTS } from './localInference';

const BASE_URL = 'http://localhost:8000';

export interface ApiStatus {
  isBackendConnected: boolean;
  activeEngine: 'FastAPI Backend' | 'In-Browser Local Engine';
  message: string;
}

export async function checkBackendStatus(): Promise<ApiStatus> {
  try {
    const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      return {
        isBackendConnected: true,
        activeEngine: 'FastAPI Backend',
        message: 'Connected to Python FastAPI Service'
      };
    }
  } catch (err) {
    // Fallback silently
  }
  return {
    isBackendConnected: false,
    activeEngine: 'In-Browser Local Engine',
    message: 'Active: In-Browser Local Model Engine'
  };
}

export async function predictSingleText(text: string): Promise<PredictionResult> {
  try {
    const status = await checkBackendStatus();
    if (status.isBackendConnected) {
      const res = await fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (e) {
    console.warn('Backend unavailable, utilizing in-browser model engine.');
  }
  return runLocalInference(text);
}

export async function predictBatchTexts(texts: string[]): Promise<BatchPredictionResult> {
  try {
    const status = await checkBackendStatus();
    if (status.isBackendConnected) {
      const res = await fetch(`${BASE_URL}/predict/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts })
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (e) {
    console.warn('Backend unavailable, utilizing in-browser model engine for batch.');
  }
  return runLocalBatchInference(texts);
}

export async function getEvaluationMetrics(): Promise<EvaluationMetrics> {
  try {
    const status = await checkBackendStatus();
    if (status.isBackendConnected) {
      const res = await fetch(`${BASE_URL}/evaluation`);
      if (res.ok) return await res.json();
    }
  } catch (e) {
    // Fallback
  }
  return LOCAL_EVALUATION_METRICS;
}

export async function getTrainingHistory(): Promise<TrainingHistory> {
  try {
    const status = await checkBackendStatus();
    if (status.isBackendConnected) {
      const res = await fetch(`${BASE_URL}/training-history`);
      if (res.ok) return await res.json();
    }
  } catch (e) {
    // Fallback
  }
  return LOCAL_TRAINING_HISTORY;
}

export async function getSampleData(): Promise<SampleData[]> {
  try {
    const status = await checkBackendStatus();
    if (status.isBackendConnected) {
      const res = await fetch(`${BASE_URL}/sample-data`);
      if (res.ok) return await res.json();
    }
  } catch (e) {
    // Fallback
  }
  return SAMPLE_TEXTS;
}

export async function getAttentionDemo(text: string, d_k: number = 4) {
  try {
    const status = await checkBackendStatus();
    if (status.isBackendConnected) {
      const res = await fetch(`${BASE_URL}/attention`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, d_k })
      });
      if (res.ok) return await res.json();
    }
  } catch (e) {
    // Fallback demo matrix computation in local JS
  }
  return null;
}
