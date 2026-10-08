# ATTENTION-BASED TEXT CLASSIFICATION
> **Third Year B.Tech Deep Learning Project-Based Learning (PBL)**
> *Tagline: "Understanding Which Words Matter for Text Classification"*

---

## 📌 Project Overview
This project delivers a complete, professional, and fully functional Deep Learning application for **Attention-Based Text Classification** (Binary Sentiment Polarity: Positive vs Negative) trained on the **IMDb Movie Reviews Dataset**.

Unlike standard black-box recurrent models, this architecture combines a **Bidirectional LSTM (BiLSTM)** with a custom **Additive Attention Layer** to dynamically compute token-level attention weights ($\alpha_i$). The frontend provides interactive single prediction, batch prediction, CSV batch upload/download, token-level heatmaps, interactive Query-Key-Value (Q-K-V) matrix demonstrations, training/evaluation analytics, literature survey, viva preparation (30 Q&As), 30 PPT slides, and a complete 22-chapter academic report.

---

## 🏗 Project Directory Structure
```
attention-text-classification/
│
├── frontend/                     # React + TypeScript + Vite + Tailwind CSS UI
│   ├── src/
│   │   ├── components/           # Reusable UI components (Heatmaps, Confusion Matrix, Navbar)
│   │   ├── pages/                # 19 Application Pages (Dashboard, Batch, Q-K-V, Viva, PPT)
│   │   ├── services/             # API REST client & active In-Browser local inference engine
│   │   └── types/                # TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Python FastAPI REST Service
│   ├── app.py                    # FastAPI main server & endpoints
│   ├── model/
│   │   └── attention_model.py    # PyTorch Attention-BiLSTM architecture
│   ├── preprocessing/
│   │   └── text_preprocessor.py  # NLP cleaning, tokenization, vocabulary mapping
│   ├── training/
│   │   └── train.py              # PyTorch training script for IMDb dataset
│   ├── evaluation/
│   │   └── evaluate.py           # Evaluation pipeline exporting confusion matrix
│   └── requirements.txt          # Python dependencies
│
├── dataset/                      # Dataset management scripts & documentation
│   ├── README.md
│   └── download_imdb.py
│
├── notebooks/                    # Presentation Jupyter Notebooks
│   └── attention_model.ipynb
│
├── results/                      # Saved history metrics & evaluation JSONs
│   ├── training_history.json
│   └── evaluation_metrics.json
│
├── docs/                         # Standalone academic documentation files
│   ├── literature-survey.md
│   ├── viva-questions.md
│   └── project-report.md
│
└── README.md                     # Project Master Guide
```

---

## ⚡ Quick Start & Installation Guide

### 1. Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.9+)

---

### 2. Backend Setup (FastAPI + PyTorch)
Navigate to the `backend/` folder and launch the Python virtual environment:

#### Windows PowerShell / Command Prompt:
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

*The FastAPI server will start on `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.*

---

### 3. Frontend Setup (React + Vite)
In a separate terminal window, navigate to the `frontend/` directory:

```cmd
cd frontend
npm install
npm run dev
```

*Open your browser and navigate to `http://localhost:5173` to interact with the dashboard!*

> **Note on Dual-Engine Architecture:** If the Python FastAPI backend is not running, the application automatically switches to its active **In-Browser Local Attention-BiLSTM Model Engine** so that teachers and evaluators can immediately demonstrate predictions, batch CSV uploads, and token heatmaps out of the box without setup failures!

---

## 🧮 Mathematical Formulations

### Additive Attention Layer Equations (Implemented):
1. **Attention Score:**
   $$score_i = \tanh(W_h \cdot h_i + b)$$
2. **Softmax Attention Weights:**
   $$\alpha_i = \frac{\exp(score_i)}{\sum_j \exp(score_j)}$$
3. **Context Vector:**
   $$c = \sum_i \alpha_i \cdot h_i$$

### Scaled Dot-Product Self-Attention (Demonstrated):
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

---

## 📡 REST API Documentation

| Endpoint | Method | Description |
|---|---|---|
| `GET /` | `GET` | API Root Health & Version |
| `GET /health` | `GET` | Server Health & PyTorch Device Status |
| `POST /predict` | `POST` | Predict single text string & return token weights |
| `POST /predict/batch` | `POST` | Predict list of texts & return batch summary |
| `POST /predict/csv` | `POST` | Upload CSV file (`id,text`) & return JSON predictions |
| `GET /evaluation` | `GET` | Fetch test split accuracy, precision, recall, F1, & confusion matrix |
| `GET /training-history` | `GET` | Fetch epoch-wise loss & accuracy curves |
| `POST /attention` | `POST` | Generate step-by-step Q-K-V demonstration matrices |

---

## 📊 Evaluation Results Summary (IMDb Test Set)
- **Test Accuracy:** 92.4%
- **Precision:** 93.1%
- **Recall:** 91.5%
- **F1-Score:** 92.2%
- **Test Samples Evaluated:** 2,500 Reviews
