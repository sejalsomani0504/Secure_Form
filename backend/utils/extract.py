import re
from pdfminer.high_level import extract_text

def extract_text_from_pdf(file):
    text = extract_text(file)
    text_matches = re.findall(r"[a-zA-Z]+\s{1}+[a-zA-Z]", text)
    return text_matches
