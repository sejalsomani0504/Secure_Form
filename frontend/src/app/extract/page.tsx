"use client"

import { useState } from 'react';
import axios from 'axios';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const ExtractPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [response, setResponse] = useState<any>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    if (event.dataTransfer.files) {
      setFiles(Array.from(event.dataTransfer.files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    try {
      const res = await axios.post('/api/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-[#122547] min-h-screen h-full'>
      <h1 className='text-7xl font-bold text-center py-4'>Extract <span className='text-yellow-500'>Data</span> from PDFs</h1>
      <div className='flex justify-center items-center'>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col justify-center items-center gap-2 p-5 w-[75%] h-[150px] border-2 border-dashed border-gray-300 rounded-md text-center transition-colors duration-300 ${dragging ? 'bg-[#f0f8ff]' : 'bg-white'}`}
        >
          <p className='text-black'>Drag and drop your PDFs here, or click to select files</p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            <span className='text-black/60'>Click or Drag Files Here</span>
          </label>
        </div>
      </div>
      <div className='flex justify-center items-center mt-4'>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          onClick={handleSubmit}
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          Submit
        </HoverBorderGradient>
      </div>
      {response && (
        <div className='flex justify-center mt-4'>
          <pre className='bg-white p-4 rounded-md text-black'>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExtractPage;
