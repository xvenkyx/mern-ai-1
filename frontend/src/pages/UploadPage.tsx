import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
    const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    try {
      setStatus('Uploading...');
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData);
      const { chunks } = uploadRes.data;

      setStatus('Generating embeddings...');
      await axios.post('http://localhost:5000/api/embed', { chunks });

      setStatus('All done! Redirecting...');
      setTimeout(() => navigate('/chat'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('Error uploading or embedding file');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Upload a PDF to Begin</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload and Process
      </button>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default UploadPage;