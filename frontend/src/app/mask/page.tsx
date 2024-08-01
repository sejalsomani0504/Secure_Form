"use client"

import { useState } from 'react';
import axios from 'axios';

const Mask = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await axios.post('/api/mask', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setResult(response.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Mask PDFs</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded mt-4">Submit</button>
      <div>
        {result.map((url, idx) => (
          <div key={idx} className="mt-4">
            <a href={url} target="_blank" className="text-blue-500 underline">Download Masked PDF {idx + 1}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mask;
