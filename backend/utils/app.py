import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.extract import extract_text_from_pdf, extract_form_data_from_pdf
from utils.mask import mask_pdf

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

@app.route('/', methods=['GET'])
def home():
    return "Flask server running"

@app.route('/extract', methods=['POST'])
def extract():
    files = request.files.getlist('files')
    results = [extract_text_from_pdf(file) for file in files]
    return jsonify(results)

@app.route('/extract_form_data', methods=['POST'])
def extract_form_data():
    files = request.files.getlist('files')
    results = [extract_form_data_from_pdf(file) for file in files]
    return jsonify(results)

@app.route('/mask', methods=['POST'])
def mask():
    files = request.files.getlist('files')
    results = [mask_pdf(file) for file in files]
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5000)
