import sys

packages = ["pptx", "docx", "reportlab"]
for pkg in packages:
    try:
        __import__(pkg)
        print(f"{pkg}: Installed")
    except ImportError:
        print(f"{pkg}: NOT installed")
