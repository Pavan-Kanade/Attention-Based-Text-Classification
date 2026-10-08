import os
import shutil

def copy_clean_project():
    src_base = os.path.dirname(os.path.abspath(__file__))
    dst_base = os.path.join(src_base, "CIE_SUBMISSION", "04_Project")

    # Clean previous destination if exists
    if os.path.exists(dst_base):
        shutil.rmtree(dst_base)
    os.makedirs(dst_base, exist_ok=True)

    ignore_patterns = shutil.ignore_patterns(
        "node_modules",
        "venv",
        ".venv",
        "__pycache__",
        ".git",
        ".env",
        "dist",
        "build",
        "*.pyc",
        "CIE_SUBMISSION",
        "check_packages.py",
        "create_cie_submission.py",
        "build_pptx.py",
        "build_docx.py",
        "build_pdfs.py",
        "copy_project.py"
    )

    items_to_copy = ["frontend", "backend", "dataset", "notebooks", "results", "docs", "README.md"]

    for item in items_to_copy:
        src_path = os.path.join(src_base, item)
        dst_path = os.path.join(dst_base, item)

        if os.path.isdir(src_path):
            shutil.copytree(src_path, dst_path, ignore=ignore_patterns)
        elif os.path.isfile(src_path):
            shutil.copy2(src_path, dst_path)

    # Create .env.example inside backend and frontend if helpful
    env_example = "VITE_API_URL=http://localhost:8000\n"
    with open(os.path.join(dst_base, "frontend", ".env.example"), "w") as f:
        f.write(env_example)

    print(f"Copied clean working project to {dst_base}")

if __name__ == "__main__":
    copy_clean_project()
