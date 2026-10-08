import Papa from 'papaparse';
import type { CSVRowResult, PredictionResult } from '../types';

export function parseCSVFile(file: File): Promise<{ id: string; text: string }[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data = results.data as Record<string, string>[];
          const records: { id: string; text: string }[] = [];

          data.forEach((row, idx) => {
            // Find text and id columns dynamically
            const keys = Object.keys(row);
            const textKey = keys.find(k => k.toLowerCase().includes('text') || k.toLowerCase().includes('review')) || keys[1] || keys[0];
            const idKey = keys.find(k => k.toLowerCase().includes('id')) || keys[0];

            const textVal = row[textKey] ? String(row[textKey]).trim() : '';
            const idVal = row[idKey] ? String(row[idKey]).trim() : String(idx + 1);

            if (textVal) {
              records.push({ id: idVal, text: textVal });
            }
          });

          resolve(records);
        } catch (err) {
          reject(new Error('Failed to parse CSV headers or format.'));
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

export function downloadPredictionsCSV(results: PredictionResult[], filename: string = 'attention_text_classification_results.csv') {
  const csvData: CSVRowResult[] = results.map((r, idx) => ({
    id: String(idx + 1),
    text: `"${r.text.replace(/"/g, '""')}"`,
    prediction: r.prediction === 'neutral' ? 'positive' : r.prediction,
    confidence: Number(r.confidence.toFixed(4)),
    positive_probability: Number(r.probabilities.positive.toFixed(4)),
    negative_probability: Number(r.probabilities.negative.toFixed(4))
  }));

  const csvString = Papa.unparse(csvData);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
