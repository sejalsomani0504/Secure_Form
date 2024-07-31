import { useState } from 'react';
import axios from 'axios';

const ExtractPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [response, setResponse] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
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
    <div>
      <h1>Extract Text from PDFs</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default ExtractPage;
