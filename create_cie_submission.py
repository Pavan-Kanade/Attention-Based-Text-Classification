import os
import shutil
import json
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

from docx import Document
from docx.shared import Inches as DocxInches, Pt as DocxPt, RGBColor as DocxRGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def setup_directories():
    base = "CIE_SUBMISSION"
    dirs = [
        base,
        os.path.join(base, "01_PPT"),
        os.path.join(base, "02_IEEE_Survey_Paper"),
        os.path.join(base, "03_Literature_Reviews"),
        os.path.join(base, "04_Project"),
        os.path.join(base, "05_Documentation"),
        os.path.join(base, "06_Submission_Checklist")
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)
    print("Directories initialized under CIE_SUBMISSION/")

def generate_student_info():
    info = {
        "project_topic": "Attention-Based Text Classification",
        "tagline": "Deep Learning PBL – Understanding Which Words Matter for Text Classification",
        "publication_status": "Not Published (Pending Manual Verification)",
        "student_1": {
            "name": "Abhijit Kamasane",
            "roll_no": "34131",
            "assigned_paper": "Bahdanau et al. (2014) - Neural Machine Translation by Jointly Learning to Align and Translate"
        },
        "student_2": {
            "name": "Vedant Kambale",
            "roll_no": "34132",
            "assigned_paper": "Luong et al. (2015) - Effective Approaches to Attention-based Neural Machine Translation"
        },
        "student_3": {
            "name": "Pavan Kanade",
            "roll_no": "34133",
            "assigned_paper": "Vaswani et al. (2017) - Attention Is All You Need"
        },
        "student_4": {
            "name": "Student 4 (Group Member 4)",
            "roll_no": "34134",
            "assigned_paper": "Yang et al. (2016) - Hierarchical Attention Networks for Document Classification"
        }
    }
    with open("CIE_SUBMISSION/student_info.json", "w") as f:
        json.dump(info, f, indent=2)
    print("Generated CIE_SUBMISSION/student_info.json")

if __name__ == "__main__":
    setup_directories()
    generate_student_info()
