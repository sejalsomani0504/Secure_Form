import re
from pdfminer.high_level import extract_text
from PyPDF2 import PdfReader
import pytesseract
from PIL import Image

def extract_text_from_pdf(file):
    text = extract_text(file)
    text_matches = re.findall(r"[a-zA-Z]+\s{1}+[a-zA-Z]", text)
    return text_matches

def extract_form_data_from_pdf(file):
    # Extract text
    text = extract_text(file)

    # Extract images
    reader = PdfReader(file)
    images = []
    for page in reader.pages:
        images += page['/Resources']['/XObject'].values()
    
    form_data = {}
    for img in images:
        if img['/Subtype'] == '/Image':
            size = (img['/Width'], img['/Height'])
            data = img._data
            mode = "RGB" if img['/ColorSpace'] == '/DeviceRGB' else "P"
            image = Image.frombytes(mode, size, data)
            text_from_image = pytesseract.image_to_string(image)
            # Process text from image as needed
            form_data['image_data'] = text_from_image

    # Process the extracted text to get required fields
    form_data['text_data'] = text
    return form_data
