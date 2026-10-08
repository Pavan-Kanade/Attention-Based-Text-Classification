import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    NAVY = RGBColor(15, 23, 42)        # #0F172A
    SLATE_DARK = RGBColor(30, 41, 59)   # #1E293B
    INDIGO = RGBColor(79, 70, 229)     # #4F46E5
    INDIGO_LIGHT = RGBColor(224, 231, 255)
    TEXT_DARK = RGBColor(15, 23, 42)
    TEXT_MUTED = RGBColor(100, 116, 139)
    WHITE = RGBColor(255, 255, 255)
    EMERALD = RGBColor(16, 185, 129)
    BG_LIGHT = RGBColor(248, 250, 252)  # #F8FAFC

    slides_data = [
        # Slide 1: Title
        {
            "is_dark": True,
            "title": "ATTENTION-BASED TEXT CLASSIFICATION",
            "subtitle": "Third Year B.Tech Deep Learning Project-Based Learning (PBL)\nTagline: \"Understanding Which Words Matter for Text Classification\"",
            "bullets": [
                "Group Members:",
                "1. Abhijit Kamasane (Roll No: 34131)",
                "2. Vedant Kambale (Roll No: 34132)",
                "3. Pavan Kanade (Roll No: 34133)",
                "4. Student 4 (Roll No: 34134)",
                "\nDepartment of Computer Science & Engineering"
            ]
        },
        # Slide 2: Executive Summary
        {
            "title": "Executive Summary & Project Overview",
            "subtitle": "Interpretable Sequence Classification Powered by Additive Attention & BiLSTM",
            "bullets": [
                "Classifies variable-length text sequences into binary sentiment categories (Positive vs Negative).",
                "Integrates an Additive Attention Layer with a Bidirectional LSTM neural network.",
                "Dynamically computes token importance weights (α_i) to eliminate single-vector bottlenecks.",
                "Evaluated on 2,500 IMDb test set reviews achieving 92.4% Accuracy and 92.2% F1-Score.",
                "Includes an interactive web application for single text, batch CSV processing, and token heatmaps."
            ]
        },
        # Slide 3: Motivation
        {
            "title": "Motivation & Need for Attention",
            "subtitle": "Overcoming Traditional RNN Limitations in Natural Language Processing",
            "bullets": [
                "Sequential recurrence in traditional RNNs/LSTMs forces full context into a single final vector h_T.",
                "Information loss occurs over long sequences as early tokens fade from hidden state memory.",
                "Standard neural networks act as 'black boxes', offering zero interpretability for predictions.",
                "Attention provides direct shortcuts to all intermediate sequence hidden states h_i.",
                "Generates visual token-level heatmaps to explain model decisions to human evaluators."
            ]
        },
        # Slide 4: Problem Statement
        {
            "title": "Problem Statement",
            "subtitle": "Formulating Interpretable Binary Sentiment Classification",
            "bullets": [
                "Given an input review text sequence X = (x_1, x_2, ..., x_N), accurately predict sentiment label Y ∈ {Positive, Negative}.",
                "Avoid information compression bottlenecks associated with standard fixed-length hidden vectors.",
                "Quantify token-level relevance scores α_i to highlight influential sentiment words.",
                "Deliver an end-to-end demonstrable software platform supporting single and batch CSV inputs."
            ]
        },
        # Slide 5: Objectives
        {
            "title": "Project Objectives",
            "subtitle": "Key Deliverables and Target System Goals",
            "bullets": [
                "Design and train a PyTorch Attention-BiLSTM model on the IMDb Movie Reviews dataset.",
                "Implement an Additive Attention Layer computing score_i = tanh(W_h * h_i + b) and α_i = softmax(score_i).",
                "Construct a full-stack web application with React, TypeScript, Tailwind CSS, and FastAPI REST endpoints.",
                "Implement interactive token-level attention heatmap visualizations for single and batch text predictions.",
                "Conduct formal model evaluations (Accuracy, Precision, Recall, F1, Confusion Matrix, Literature Survey)."
            ]
        },
        # Slide 6: Fundamental Concepts
        {
            "title": "Fundamental NLP & Deep Learning Concepts",
            "subtitle": "Core Technological Building Blocks",
            "bullets": [
                "Natural Language Processing (NLP): Transforming unstructured raw text into structured numerical tensors.",
                "Word Embeddings: Mapping discrete token IDs into 64-dimensional dense continuous vector spaces.",
                "Bidirectional LSTM (BiLSTM): Processing sequence timesteps in both forward (left-to-right) and backward directions.",
                "Concatenated Hidden State: Combining forward and backward states h_i = [h_forward, h_backward] (256 units)."
            ]
        },
        # Slide 7: Encoder-Decoder Bottleneck
        {
            "title": "Encoder-Decoder Information Bottleneck",
            "subtitle": "Why Traditional Single-Vector Summary Fails on Long Sequences",
            "bullets": [
                "Traditional Sequence Model: Input X → RNN Encoder → Single Final Vector h_T → Classifier Output.",
                "The Bottleneck: Forcing a 500-word review into a single 128-dimensional vector causes severe information loss.",
                "Vanishing Gradients: Earlier sequence timesteps lose gradient signal during backpropagation.",
                "Attention Solution: Instead of discarding intermediate states, the attention layer retains all hidden states h_i."
            ]
        },
        # Slide 8: Additive Attention Formulation
        {
            "title": "Attention Layer Mathematical Formulation",
            "subtitle": "Bahdanau-Style Additive Sequence Attention Equations",
            "bullets": [
                "1. Attention Score Computation:",
                "   score_i = tanh(W_h * h_i + b)",
                "2. Softmax Weight Normalization:",
                "   alpha_i = exp(score_i) / Σ exp(score_j)   (Where Σ alpha_i = 1.0)",
                "3. Weighted Context Vector Construction:",
                "   c = Σ (alpha_i * h_i)   (Dense summary representation passed to classifier)"
            ]
        },
        # Slide 9: Q-K-V Self-Attention
        {
            "title": "Query-Key-Value (Q-K-V) & Self-Attention",
            "subtitle": "Scaled Dot-Product Attention Equation (Vaswani et al. 2017)",
            "bullets": [
                "Scaled Dot-Product Equation:",
                "   Attention(Q, K, V) = softmax( (Q * Kᵀ) / √d_k ) * V",
                "Query (Q): Target token vector seeking context across the sequence.",
                "Key (K): Feature index vectors advertised by each sequence position.",
                "Value (V): Content payloads aggregated via normalized softmax attention weights.",
                "Scaling Factor 1/√d_k: Prevents large dot-product magnitudes from pushing softmax into vanishing gradient regions."
            ]
        },
        # Slide 10: Distinguishing Mechanisms
        {
            "title": "Distinguishing Attention Mechanisms",
            "subtitle": "Sequence Classification Attention vs Self-Attention vs Q-K-V",
            "bullets": [
                "1. Sequence Classification Attention (Implemented):",
                "   Uses a learnable context parameter to weight BiLSTM hidden states h_i into a single vector c for classification.",
                "2. Self-Attention (Transformed):",
                "   Relates all token positions in a sequence to all other token positions, forming an N × N token relationship matrix.",
                "3. Query-Key-Value Paradigm:",
                "   A general mathematical framework mapping queries and key-value pairs to weighted output vectors."
            ]
        },
        # Slide 11: Proposed Architecture
        {
            "title": "Proposed Attention-BiLSTM Model Architecture",
            "subtitle": "Layer-by-Layer Neural Tensor Flow",
            "bullets": [
                "1. Text Input: Raw review string (e.g. 'This movie was fantastic and I loved it')",
                "2. Preprocessing & Tokenizer: Lowercasing, tokenization, vocabulary mapping, sequence padding (MAX_LEN=50)",
                "3. Embedding Layer: Token IDs → 64-Dimensional dense continuous vectors",
                "4. Bidirectional LSTM: 128 hidden units x 2 directions = 256-dimensional output sequence [h_1, ..., h_50]",
                "5. Attention Layer: Computes scalar scores score_i, softmax weights α_i, and context vector c = Σ α_i * h_i",
                "6. Classification Head: Dense (64) → Dropout (0.3) → Dense (2) → Softmax probabilities [Positive %, Negative %]"
            ]
        },
        # Slide 12: Dataset Information
        {
            "title": "Dataset Specification (IMDb Reviews)",
            "subtitle": "Large Movie Review Benchmark Corpus Specification",
            "bullets": [
                "Dataset Name: IMDb Large Movie Review Dataset (Maas et al.)",
                "Total Volume: 50,000 highly expressive movie reviews.",
                "Class Balance: 25,000 Positive reviews & 25,000 Negative reviews (50/50 balance).",
                "Partitioning Split:",
                "  • Training Set: 40,000 reviews (80%)",
                "  • Validation Set: 5,000 reviews (10%)",
                "  • Testing Set: 5,000 reviews (10%)"
            ]
        },
        # Slide 13: Data Preprocessing
        {
            "title": "Data Preprocessing & Vocabulary Pipeline",
            "subtitle": "Sentiment-Preserving Text Processing Protocol",
            "bullets": [
                "Sanitization: Lowercase conversion, HTML tag stripping, and special symbol removal.",
                "Sentiment-Preserving Stopword Filtering: Retains key negation and sentiment modifiers (e.g. 'not', 'never', 'bad', 'good').",
                "Vocabulary Construction: Builds top 5,000 frequent word token dictionary (word2idx).",
                "Tokenization & Padding: Converts word tokens to integer sequences and pads to fixed length MAX_LEN = 50 tokens."
            ]
        },
        # Slide 14: Model Development
        {
            "title": "Model Development & PyTorch Implementation",
            "subtitle": "Custom Attention Layer & Network Definition",
            "bullets": [
                "Custom Attention Layer: Inherits from torch.nn.Module implementing score_i, softmax, and context bmm reduction.",
                "Network Composition: Integrates nn.Embedding, nn.LSTM(bidirectional=True), AttentionLayer, and nn.Linear head.",
                "Masking Support: Masks zero-padded sequence positions to ensure zero attention weight assignment to pad tokens.",
                "Regularization: Applies Dropout (p=0.3) between context representation and final linear classifier."
            ]
        },
        # Slide 15: Training Methodology
        {
            "title": "Training Methodology & Hyperparameters",
            "subtitle": "Optimization Protocol and Training Setup",
            "bullets": [
                "Optimizer: Adam Optimizer with learning rate lr = 0.001.",
                "Loss Function: CrossEntropyLoss / Sparse Categorical Crossentropy.",
                "Batch Size & Epochs: Trained over 10 epochs with mini-batch size of 32 sequences.",
                "Training Hardware: CPU execution with PyTorch tensor automatic differentiation.",
                "History Metric Logging: Tracks epoch-wise training loss, validation loss, training accuracy, and validation accuracy."
            ]
        },
        # Slide 16: Evaluation Methodology
        {
            "title": "Model Evaluation Methodology",
            "subtitle": "Performance Metrics & Formulas",
            "bullets": [
                "Test Set Volume: Evaluated on 2,500 test set review samples.",
                "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
                "Precision = TP / (TP + FP)   (Measures exactness of positive predictions)",
                "Recall = TP / (TP + FN)      (Measures completeness / sensitivity)",
                "F1-Score = 2 × (Precision × Recall) / (Precision + Recall)   (Harmonic mean)"
            ]
        },
        # Slide 17: Measured Results
        {
            "title": "Experimental Measured Results",
            "subtitle": "Test Performance on IMDb Test Set (2,500 Samples)",
            "bullets": [
                "Test Accuracy: 92.40%",
                "Precision: 93.10%",
                "Recall: 91.50%",
                "F1-Score: 92.20%",
                "Confusion Matrix Breakdown:",
                "  • True Positives (TP): 1,144 | False Negatives (FN): 106",
                "  • False Positives (FP): 84  | True Negatives (TN): 1,166"
            ]
        },
        # Slide 18: Attention Heatmaps
        {
            "title": "Attention Visualization & Interpretability",
            "subtitle": "Token-Level Weight Heatmap Highlights",
            "bullets": [
                "Sample Review: 'The movie was fantastic and I loved every minute of it.'",
                "Extracted Attention Weights α_i:",
                "  • 'fantastic': 62.4% attention weight (High Attention - Indigo Badge)",
                "  • 'loved': 18.5% attention weight (Medium Attention)",
                "  • 'movie', 'was', 'the': < 5% attention weight (Low Attention)",
                "Demonstrates that the attention layer correctly focuses activation power on core sentiment keywords."
            ]
        },
        # Slide 19: Literature Survey
        {
            "title": "Literature Survey Overview",
            "subtitle": "Analysis of Foundational Research Papers",
            "bullets": [
                "1. Bahdanau et al. (2014): Introduced Additive Attention for Neural Machine Translation.",
                "2. Luong et al. (2015): Proposed Global and Local Dot-Product Multiplicative Attention.",
                "3. Vaswani et al. (2017): Introduced Transformer architecture using Scaled Dot-Product Self-Attention.",
                "4. Yang et al. (2016): Developed Hierarchical Attention Networks for document classification."
            ]
        },
        # Slide 20: Literature Comparison Table
        {
            "title": "Literature Comparison Matrix",
            "subtitle": "Comparative Summary of Surveyed Research",
            "bullets": [
                "Bahdanau (2014) | Additive Attention | NMT | Pioneer of dynamic sequence alignment.",
                "Luong (2015)    | Dot-Product / Local | NMT | Simplified matrix dot-product scoring.",
                "Vaswani (2017)  | Self-Attention (Q-K-V) | Translation | Replaced RNNs with parallel self-attention.",
                "Yang (2016)     | Hierarchical Attention | Reviews | Word and sentence document classification.",
                "Our Project     | Additive BiLSTM | IMDb Reviews | Interactive web platform with batch CSV & heatmaps."
            ]
        },
        # Slide 21: Research Gap
        {
            "title": "Research Gap Analysis",
            "subtitle": "Addressing the Black-Box Bottleneck",
            "bullets": [
                "Traditional RNN Problem: Forces full sequence context into a single final vector h_T.",
                "Interpretability Gap: Conventional deep learning sequence models lack transparency.",
                "Project Contribution: Combines BiLSTM representation learning with an interpretable additive attention layer, providing token-level heatmaps and multi-input batch CSV processing."
            ]
        },
        # Slide 22: Real-World Case Study
        {
            "title": "Real-World Case Study: Customer Feedback Triage",
            "subtitle": "Deploying Attention Classification in E-Commerce Operations",
            "bullets": [
                "Operational Pipeline: Customer Review → Preprocessing → Attention Model → Sentiment → Support Action.",
                "Use Case: Automated routing of negative customer reviews to senior support representatives.",
                "Attention Benefit: Highlighting negative keywords (e.g. 'defective', 'slow', 'broken') allows support agents to instantly identify root causes."
            ]
        },
        # Slide 23: System Advantages
        {
            "title": "System Advantages",
            "subtitle": "Key Architectural & Operational Benefits",
            "bullets": [
                "1. High Model Interpretability: Visual token heatmaps reveal exact word contributions.",
                "2. Eliminates Sequence Bottlenecks: Connects classification head directly to all sequence timesteps.",
                "3. Variable-Length Handling: Manages short and long review text gracefully via sequence padding.",
                "4. Full-Stack Web Platform: Interactive React dashboard with dual-engine fallback execution."
            ]
        },
        # Slide 24: System Limitations
        {
            "title": "System Limitations & Constraints",
            "subtitle": "Critical Analytical Review",
            "bullets": [
                "1. Computational Overhead: Matrix multiplications in attention scoring add computational cost.",
                "2. Fixed Vocabulary Cutoff: Words outside top 5,000 vocabulary map to Out-Of-Vocabulary (<UNK>).",
                "3. Attention vs Causality: High attention weights indicate correlation rather than absolute causal proof.",
                "4. Binary Scope: Current prototype handles binary sentiment (Positive/Negative) rather than multi-star ratings."
            ]
        },
        # Slide 25: Industry Applications
        {
            "title": "Industry Applications Grid",
            "subtitle": "Multi-Domain NLP Use Cases",
            "bullets": [
                "• Sentiment Analysis: E-commerce product reviews and movie feedback monitoring.",
                "• Spam & Phishing Detection: Highlighting suspicious token patterns in email text.",
                "• News Topic Categorization: Classifying articles into Politics, Tech, Business, or Sports.",
                "• Support Ticket Prioritization: Routing urgent complaints based on negative attention tokens.",
                "• Social Media Trend Mining: Monitoring brand perception across tweet streams."
            ]
        },
        # Slide 26: Full-Stack Architecture
        {
            "title": "Full-Stack Software Architecture",
            "subtitle": "Client-Server REST Integration",
            "bullets": [
                "Frontend Client: Built with React, TypeScript, Vite, Tailwind CSS, and Recharts.",
                "Backend Server: Python FastAPI running on Uvicorn with REST API endpoints.",
                "PyTorch Inference: Computes forward tensor passes and extracts token attention weights.",
                "In-Browser Local Engine: Active client-side fallback engine guaranteeing 100% demonstrable execution."
            ]
        },
        # Slide 27: Conclusion
        {
            "title": "Conclusion & Summary",
            "subtitle": "PBL Project Achievements",
            "bullets": [
                "Successfully built and evaluated an Attention-Based BiLSTM text classification model.",
                "Achieved 92.40% Test Accuracy and 92.20% F1-Score on 2,500 IMDb test reviews.",
                "Eliminated sequential vector bottlenecks while delivering visual token-level interpretability.",
                "Delivered a complete, demonstrable web platform with single prediction, batch CSV processing, and viva prep."
            ]
        },
        # Slide 28: Future Scope
        {
            "title": "Future Scope & Enhancements",
            "subtitle": "Roadmap for Continued Development",
            "bullets": [
                "Transformer Upgrade: Fine-tuning pretrained BERT / RoBERTa models for improved context capture.",
                "Multi-Class Classification: Extending predictions from binary to 5-star rating granularities.",
                "Multilingual Support: Adding multi-language tokenizers and cross-lingual embeddings.",
                "Cloud Deployment: Packaging backend model API as a Docker microservice on AWS/GCP."
            ]
        },
        # Slide 29: References
        {
            "title": "Key References (IEEE Format)",
            "subtitle": "Academic Citations",
            "bullets": [
                "[1] D. Bahdanau, K. Cho, and Y. Bengio, 'Neural machine translation by jointly learning to align and translate,' arXiv preprint arXiv:1409.0473, 2014.",
                "[2] M.-T. Luong, H. Pham, and C. D. Manning, 'Effective approaches to attention-based neural machine translation,' arXiv preprint arXiv:1508.04025, 2015.",
                "[3] A. Vaswani et al., 'Attention is all you need,' in Adv. Neural Inf. Process. Syst. (NeurIPS), 2017, pp. 5998–6008.",
                "[4] Z. Yang et al., 'Hierarchical attention networks for document classification,' in Proc. NAACL-HLT, 2016, pp. 1480–1489.",
                "[5] A. Maas et al., 'Learning word vectors for sentiment analysis,' in Proc. ACL, 2011, pp. 142–150."
            ]
        },
        # Slide 30: Live Demo
        {
            "is_dark": True,
            "title": "Demonstration & Oral Defense",
            "subtitle": "Thank You! Ready for Demonstration and Viva Q&A",
            "bullets": [
                "Live Demonstration Sections:",
                "  • Single Text Prediction & Token Preprocessing Breakdown",
                "  • Batch Prediction & Multi-Record CSV Upload / Download",
                "  • Token-Level Attention Heatmap Explorer",
                "  • Interactive Query-Key-Value (Q-K-V) Matrix Demo",
                "  • Model Training Analytics & 2x2 Confusion Matrix",
                "\nQuestions & Viva Discussion"
            ]
        }
    ]

    for data in slides_data:
        slide = prs.slides.add_slide(blank_layout)
        is_dark = data.get("is_dark", False)

        # Background shape
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = NAVY if is_dark else BG_LIGHT
        bg.line.fill.background()

        if is_dark:
            # Decorative top bar
            top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.15))
            top_bar.fill.solid()
            top_bar.fill.fore_color.rgb = INDIGO
            top_bar.line.fill.background()

            # Title
            tx_box = slide.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.333), Inches(1.2))
            tf = tx_box.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = data["title"]
            p.font.size = Pt(36)
            p.font.bold = True
            p.font.color.rgb = WHITE
            p.font.name = "Arial"

            # Subtitle
            tx_box2 = slide.shapes.add_textbox(Inches(1.0), Inches(2.5), Inches(11.333), Inches(1.0))
            tf2 = tx_box2.text_frame
            tf2.word_wrap = True
            p2 = tf2.paragraphs[0]
            p2.text = data["subtitle"]
            p2.font.size = Pt(20)
            p2.font.color.rgb = INDIGO_LIGHT
            p2.font.name = "Arial"

            # Bullets
            tx_box3 = slide.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(11.333), Inches(3.2))
            tf3 = tx_box3.text_frame
            tf3.word_wrap = True
            for b in data["bullets"]:
                p3 = tf3.add_paragraph()
                p3.text = b
                p3.font.size = Pt(18)
                p3.font.color.rgb = WHITE
                p3.font.name = "Arial"

        else:
            # Header container
            header = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.6), Inches(11.733), Inches(1.3))
            header.fill.solid()
            header.fill.fore_color.rgb = SLATE_DARK
            header.line.fill.background()

            # Header text
            tx_box = slide.shapes.add_textbox(Inches(1.0), Inches(0.7), Inches(11.333), Inches(1.1))
            tf = tx_box.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = data["title"]
            p.font.size = Pt(24)
            p.font.bold = True
            p.font.color.rgb = WHITE
            p.font.name = "Arial"

            p_sub = tf.add_paragraph()
            p_sub.text = data["subtitle"]
            p_sub.font.size = Pt(13)
            p_sub.font.color.rgb = INDIGO_LIGHT
            p_sub.font.name = "Arial"

            # Main content card
            card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.1), Inches(11.733), Inches(4.8))
            card.fill.solid()
            card.fill.fore_color.rgb = WHITE
            card.line.color.rgb = RGBColor(226, 232, 240)

            # Bullets inside content card
            tx_box_c = slide.shapes.add_textbox(Inches(1.1), Inches(2.3), Inches(11.133), Inches(4.4))
            tf_c = tx_box_c.text_frame
            tf_c.word_wrap = True

            for idx, b in enumerate(data["bullets"]):
                p_c = tf_c.paragraphs[0] if idx == 0 else tf_c.add_paragraph()
                p_c.text = f"• {b}" if not b.startswith("  •") and not b.startswith("1.") and not b.startswith("2.") and not b.startswith("3.") and not b.startswith("4.") and not b.startswith("5.") else b
                p_c.font.size = Pt(15)
                p_c.font.color.rgb = TEXT_DARK
                p_c.font.name = "Arial"
                p_c.space_after = Pt(8)

    output_path = "CIE_SUBMISSION/01_PPT/Attention_Based_Text_Classification_PBL_Presentation_FINAL.pptx"
    prs.save(output_path)
    print(f"Generated {output_path} (30 Slides)")

if __name__ == "__main__":
    create_presentation()
