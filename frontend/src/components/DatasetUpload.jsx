import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Component for uploading datasets for visualization.
 */

function DatasetUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/datasets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Upload successful!');
      console.log('Upload successful:', response.data);
    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <h2>Upload Dataset</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </form>
    </div>
  );
}

export default DatasetUpload;
