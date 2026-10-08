import os

def create_docs_and_checklist():
    doc_dir = "CIE_SUBMISSION/05_Documentation"
    chk_dir = "CIE_SUBMISSION/06_Submission_Checklist"

    os.makedirs(doc_dir, exist_ok=True)
    os.makedirs(chk_dir, exist_ok=True)

    # 1. Documentation README.md
    readme_content = """# Attention-Based Text Classification — CIE PBL Submission

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
   - Score: $score_i = \\tanh(W_h \\cdot h_i + b)$
   - Softmax Weights: $\\alpha_i = \\text{softmax}(score_i)$
   - Context Vector: $c = \\sum \\alpha_i \\cdot h_i$
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
venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
```
*API running on http://localhost:8000 with Swagger docs at http://localhost:8000/docs.*
"""
    with open(os.path.join(doc_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)

    # 2. PROJECT_STRUCTURE.md
    struct_content = """# Project Folder Taxonomy & Submission Directory Structure

```
CIE_SUBMISSION/
│
├── 01_PPT/
│   └── Attention_Based_Text_Classification_PBL_Presentation_FINAL.pptx
│
├── 02_IEEE_Survey_Paper/
│   └── Attention_Based_Text_Classification_IEEE_Survey_Paper.docx
│
├── 03_Literature_Reviews/
│   ├── Student_1_Literature_Review.pdf  (Abhijit Kamasane - 34131)
│   ├── Student_2_Literature_Review.pdf  (Vedant Kambale - 34132)
│   ├── Student_3_Literature_Review.pdf  (Pavan Kanade - 34133)
│   └── Student_4_Literature_Review.pdf  (Student 4 - 34134)
│
├── 04_Project/
│   ├── frontend/             # React + Vite + TS UI
│   ├── backend/              # Python FastAPI REST API
│   ├── dataset/              # IMDb dataset download scripts
│   ├── notebooks/            # Jupyter notebook presentation
│   ├── results/              # Pre-evaluated history JSON metrics
│   ├── docs/                 # Standalone Markdown docs
│   └── README.md
│
├── 05_Documentation/
│   ├── README.md
│   └── PROJECT_STRUCTURE.md
│
├── 06_Submission_Checklist/
│   └── CIE_SUBMISSION_CHECKLIST.md
│
└── student_info.json
```
"""
    with open(os.path.join(doc_dir, "PROJECT_STRUCTURE.md"), "w", encoding="utf-8") as f:
        f.write(struct_content)

    # 3. CIE_SUBMISSION_CHECKLIST.md
    chk_content = """# CIE PBL Submission Verification Checklist

Project Topic: **Attention-Based Text Classification**

## Checklist Items
- [x] Student names entered (Abhijit Kamasane, Vedant Kambale, Pavan Kanade, Student 4)
- [x] Roll numbers entered (34131, 34132, 34133, 34134)
- [x] Topic entered ("Attention-Based Text Classification")
- [x] Final PPTX ready (`01_PPT/Attention_Based_Text_Classification_PBL_Presentation_FINAL.pptx`)
- [x] IEEE survey paper DOCX ready (`02_IEEE_Survey_Paper/Attention_Based_Text_Classification_IEEE_Survey_Paper.docx`)
- [x] Publication status confirmed ("Not Published")
- [x] Student 1 literature review PDF ready (`03_Literature_Reviews/Student_1_Literature_Review.pdf`)
- [x] Student 2 literature review PDF ready (`03_Literature_Reviews/Student_2_Literature_Review.pdf`)
- [x] Student 3 literature review PDF ready (`03_Literature_Reviews/Student_3_Literature_Review.pdf`)
- [x] Student 4 literature review PDF ready (`03_Literature_Reviews/Student_4_Literature_Review.pdf`)
- [x] Complete project folder ready (`04_Project/` excluding node_modules, venv, pycache, secrets)
- [x] Submission README ready (`05_Documentation/README.md`)
- [x] No secrets or API keys included
- [ ] Google Drive folder created (Manual step by student)
- [ ] Drive sharing permissions set to "Anyone with link can view" (Manual step)
- [ ] Files verified for correct formatting and layout
- [ ] Google Form reviewed & submitted manually

---
*Note: Do NOT submit Google Form automatically. Perform manual review of Drive link and form fields.*
"""
    with open(os.path.join(chk_dir, "CIE_SUBMISSION_CHECKLIST.md"), "w", encoding="utf-8") as f:
        f.write(chk_content)

    print("Generated 05_Documentation and 06_Submission_Checklist files")

if __name__ == "__main__":
    create_docs_and_checklist()
