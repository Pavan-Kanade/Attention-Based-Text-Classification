import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf(file_path, student_name, roll_no, paper_title, authors, year, venue, url, details):
    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        textColor=colors.HexColor('#0F172A'),
        alignment=1,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'HeaderSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=colors.HexColor('#4F46E5'),
        alignment=1,
        spaceAfter=10
    )

    h2_style = ParagraphStyle(
        'H2Style',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=10,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=6
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph("DEEP LEARNING CIE SUBMISSION", title_style))
    story.append(Paragraph("PBL TOPIC: ATTENTION-BASED TEXT CLASSIFICATION", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#4F46E5'), spaceAfter=10))

    # Header Meta Box Table
    header_data = [
        [Paragraph("<b>Student Name:</b>", body_style), Paragraph(student_name, body_style)],
        [Paragraph("<b>Roll No:</b>", body_style), Paragraph(roll_no, body_style)],
        [Paragraph("<b>Project Topic:</b>", body_style), Paragraph("Attention-Based Text Classification", body_style)],
        [Paragraph("<b>Paper Reviewed:</b>", body_style), Paragraph(f"<i>{paper_title}</i>", body_style)],
        [Paragraph("<b>Authors & Year:</b>", body_style), Paragraph(f"{authors} ({year})", body_style)],
        [Paragraph("<b>Publication Venue:</b>", body_style), Paragraph(f"{venue} | {url}", body_style)]
    ]

    header_table = Table(header_data, colWidths=[130, 400])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))

    story.append(header_table)
    story.append(Spacer(1, 10))

    # Detailed Sections
    sections = [
        ("1. Problem Addressed", details["problem"]),
        ("2. Motivation & Need", details["motivation"]),
        ("3. Methodology & Model Architecture", details["methodology"]),
        ("4. Dataset & Experimental Setup", details["dataset"]),
        ("5. Attention Mechanism Formulation", details["attention"]),
        ("6. Key Results Reported in Paper", details["results"]),
        ("7. System Advantages & Strengths", details["advantages"]),
        ("8. Limitations & Constraints", details["limitations"]),
        ("9. Identified Research Gap", details["gap"]),
        ("10. Relevance to Our PBL Project", details["relevance"]),
        ("11. Student's Critical Observations", details["observations"]),
        ("12. References", details["references"])
    ]

    for title, text in sections:
        story.append(Paragraph(title, h2_style))
        story.append(Paragraph(text, body_style))

    doc.build(story)
    print(f"Generated {file_path}")

def build_all_pdfs():
    out_dir = "CIE_SUBMISSION/03_Literature_Reviews"
    os.makedirs(out_dir, exist_ok=True)

    reviews = [
        # Student 1: Abhijit Kamasane (34131) -> Bahdanau et al. 2014
        {
            "file": os.path.join(out_dir, "Student_1_Literature_Review.pdf"),
            "student": "Abhijit Kamasane",
            "roll": "34131",
            "title": "Neural Machine Translation by Jointly Learning to Align and Translate",
            "authors": "Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio",
            "year": "2014",
            "venue": "arXiv preprint",
            "url": "arXiv:1409.0473",
            "details": {
                "problem": "Addresses the severe information bottleneck of conventional sequence-to-sequence architectures, where a long input sentence is forced into a fixed-length vector.",
                "motivation": "Standard encoder-decoder models struggle to translate long sentences because early tokens fade from memory during encoding.",
                "methodology": "Introduced additive attention, allowing the decoder to search over all encoder hidden states h_i to form a dynamic context vector c_i at each decoding step.",
                "dataset": "WMT 2014 English-to-French translation task comprising millions of sentence pairs.",
                "attention": "Score equation: score_i = tanh(W_a * s_{t-1} + U_a * h_i). Softmax weights α_i determine the relative alignment between decoder state s_{t-1} and encoder hidden state h_i.",
                "results": "Achieved superior BLEU scores on long sentences (30+ words) compared to standard fixed-vector seq2seq models.",
                "advantages": "Eliminates single-vector sequence bottlenecks and allows dynamic token alignment across arbitrary sequence lengths.",
                "limitations": "Increases quadratic computational complexity due to calculating attention scores across all encoder hidden states at every step.",
                "gap": "Traditional models lacked dynamic alignment mechanisms for sequence representations.",
                "relevance": "Provides the foundational additive attention formulation (score = tanh(W_h * h_i + b)) used in our Attention-BiLSTM model.",
                "observations": "Bahdanau attention proved that soft-alignment is superior to hard-alignment, laying the groundwork for modern NLP attention networks.",
                "references": "[1] D. Bahdanau et al., 'Neural machine translation by jointly learning to align and translate,' arXiv:1409.0473, 2014."
            }
        },
        # Student 2: Vedant Kambale (34132) -> Luong et al. 2015
        {
            "file": os.path.join(out_dir, "Student_2_Literature_Review.pdf"),
            "student": "Vedant Kambale",
            "roll": "34132",
            "title": "Effective Approaches to Attention-based Neural Machine Translation",
            "authors": "Minh-Thang Luong, Hieu Pham, Christopher D. Manning",
            "year": "2015",
            "venue": "EMNLP 2015",
            "url": "arXiv:1508.04025",
            "details": {
                "problem": "Compares global vs local attention mechanisms and multiplicative vs additive score functions to improve computational efficiency.",
                "motivation": "Global attention requires inspecting all encoder hidden states for every target token, which is expensive for very long sequences.",
                "methodology": "Proposed Global Attention (attending to all source tokens) and Local Attention (attending to a small window centered at predicted alignment position p_t).",
                "dataset": "WMT 2014 and WMT 2015 English-to-German and English-to-French translation datasets.",
                "attention": "Multiplicative Dot-Product Score: score(h_t, h_s) = h_t^T * W_a * h_s. Demonstrates fast GPU matrix multiplication.",
                "results": "Achieved a 5.0 BLEU point improvement over non-attention translation baselines on WMT English-German translation.",
                "advantages": "Simplified score computation using dot products and reduced compute overhead via local window context alignment.",
                "limitations": "Local attention requires hyperparameter tuning for window size D and alignment position predictor.",
                "gap": "Lack of comparative study between global and local attention mechanisms in neural sequence models.",
                "relevance": "Helps compare dot-product multiplicative scoring vs additive tanh scoring for sequence classification.",
                "observations": "Luong attention highlighted that dot-product attention executes faster on modern GPU tensor cores than additive tanh attention.",
                "references": "[1] M.-T. Luong et al., 'Effective approaches to attention-based neural machine translation,' EMNLP 2015."
            }
        },
        # Student 3: Pavan Kanade (34133) -> Vaswani et al. 2017
        {
            "file": os.path.join(out_dir, "Student_3_Literature_Review.pdf"),
            "student": "Pavan Kanade",
            "roll": "34133",
            "title": "Attention Is All You Need",
            "authors": "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, et al.",
            "year": "2017",
            "venue": "NeurIPS 2017",
            "url": "arXiv:1706.03762",
            "details": {
                "problem": "Sequential recurrence in RNNs/LSTMs prevents parallel training across GPU clusters and limits long-range context capture.",
                "motivation": "Recurrent timesteps force O(N) sequential operations. Replacing recurrence with self-attention enables O(1) parallel operations.",
                "methodology": "Introduced the Transformer architecture built entirely on Multi-Head Scaled Dot-Product Self-Attention and Positional Encoding.",
                "dataset": "WMT 2014 English-to-German (4.5M pairs) and English-to-French (36M pairs).",
                "attention": "Scaled Dot-Product Formula: Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V. Multi-Head Attention projects Q, K, V into h sub-spaces.",
                "results": "Achieved state-of-the-art 28.4 BLEU score on WMT En-De, training 3.5x faster than previous best models.",
                "advantages": "Enables full parallel matrix execution, eliminates recurrent bottlenecks, and captures arbitrary distance dependencies.",
                "limitations": "Quadratic memory complexity O(N^2) with respect to input sequence length N.",
                "gap": "Recurrent neural architectures restricted parallelization during deep neural network training.",
                "relevance": "Provides the mathematical basis for our interactive Q-K-V self-attention matrix demonstration module.",
                "observations": "Transformer self-attention revolutionized deep learning, forming the foundation for BERT, GPT, and modern Large Language Models.",
                "references": "[1] A. Vaswani et al., 'Attention is all you need,' in NeurIPS, 2017."
            }
        },
        # Student 4: Student 4 / Group Member 4 (34134) -> Yang et al. 2016
        {
            "file": os.path.join(out_dir, "Student_4_Literature_Review.pdf"),
            "student": "Student 4 (Group Member 4)",
            "roll": "34134",
            "title": "Hierarchical Attention Networks for Document Classification",
            "authors": "Zichao Yang, Diyi Yang, Chris Dyer, Xiaodong He, Alex Smola, Eduard Hovy",
            "year": "2016",
            "venue": "NAACL-HLT 2016",
            "url": "ACL Anthology N16-1174",
            "details": {
                "problem": "Document classification requires capturing hierarchical structures: words form sentences, and sentences form documents.",
                "motivation": "Not all words and not all sentences are equally informative for document sentiment classification.",
                "methodology": "Proposed Hierarchical Attention Networks (HAN): Word-level Attention extracts sentence vectors, and Sentence-level Attention extracts document vectors.",
                "dataset": "Yelp Reviews, IMDb Movie Reviews, Amazon Customer Reviews, and Yahoo Answers datasets.",
                "attention": "Two-level additive attention mechanism with learnable word context vector u_w and sentence context vector u_s.",
                "results": "Outperformed standard LSTMs, GRUs, and CNNs across all six document classification benchmark datasets.",
                "advantages": "Hierarchical structure mirrors natural language hierarchy and yields highly interpretable word and sentence heatmaps.",
                "limitations": "Requires sentence boundary segmentation preprocessing and increases parameter count.",
                "gap": "Flat sequence models failed to model the hierarchical word-sentence structure of documents.",
                "relevance": "Directly inspires our token-level attention heatmap visualization for IMDb movie reviews.",
                "observations": "Demonstrated that attention visualization provides actionable insights into document sentiment classification.",
                "references": "[1] Z. Yang et al., 'Hierarchical attention networks for document classification,' in NAACL-HLT, 2016."
            }
        }
    ]

    for rev in reviews:
        generate_pdf(
            rev["file"],
            rev["student"],
            rev["roll"],
            rev["title"],
            rev["authors"],
            rev["year"],
            rev["venue"],
            rev["url"],
            rev["details"]
        )

if __name__ == "__main__":
    build_all_pdfs()
