# Attention-Based Text Classification — CIE PBL Submission

> **Third Year B.Tech Deep Learning Project-Based Learning (PBL)**
> *Tagline: "Understanding Which Words Matter for Text Classification"*

---

## 📌 Project Overview
This project delivers a complete, professional, and fully demonstrable Deep Learning system for **Attention-Based Text Classification** (Binary Sentiment Polarity: Positive vs Negative) trained on the **IMDb Movie Reviews Dataset**.

### Student Information:
- **Student 1:** Abhijit Kamasane (Roll No: 34131)
- **Student 2:** Vedant Kambale (Roll No: 34132)
- **Student 3:** Pavan Kanade (Roll No: 34133)
- **Student 4:** Student 4 (Roll No: 34134)
- **Department:** Computer Science & Engineering
- **Publication Status:** Not Published (Pending Manual Verification)

---

## 🏗 Key Features & Architecture
1. **Model Architecture:** Embedding (64) → Bidirectional LSTM (128 units x 2) → Additive Attention Layer → Dense (64) → Softmax (2).
2. **Attention Equations:**
   - Score: $score_i = \tanh(W_h \cdot h_i + b)$
   - Softmax Weights: $\alpha_i = \text{softmax}(score_i)$
   - Context Vector: $c = \sum \alpha_i \cdot h_i$
3. **Dual-Engine Execution:** Python FastAPI REST Service (`http://localhost:8000`) + Active In-Browser Local Inference Fallback Engine.
4. **Interactive Applications:**
   - Single Text Prediction with confidence % and token attention heatmap.
   - Multi-Input & CSV Batch Prediction (`id,text`) with CSV export download.
   - Interactive Query-Key-Value (Q-K-V) matrix self-attention demo.
   - Epoch-wise loss/accuracy graphs, 2x2 confusion matrix, and classification report.
   - 30 Viva preparation Q&As, 30 PPT slides, and 22-chapter project report.

---

## 🚀 Running Instructions

### Frontend (React + Vite + TypeScript + Tailwind)
```cmd
cd 04_Project/frontend
npm install
npm run dev
```
*Open http://localhost:5173 in your browser.*

### Backend (Python FastAPI + PyTorch)
```cmd
cd 04_Project/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
*API running on http://localhost:8000 with Swagger docs at http://localhost:8000/docs.*
