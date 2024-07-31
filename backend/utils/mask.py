from PyPDF2 import PdfReader, PdfWriter

def mask_pdf(file):
    reader = PdfReader(file)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    output_file = '/tmp/masked_output.pdf'
    with open(output_file, 'wb') as f:
        writer.write(f)
    return output_file
