import React, { useState } from 'react';
import API from '../services/api';

/**
 * Component for uploading datasets for visualization.
 */

function DatasetUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await API.post('/datasets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Upload successful');
      console.log('Upload successful:', response.data);
    } catch (error) {
      setError('Upload failed');
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <h2>Upload Dataset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose file:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <button type="submit">Upload</button>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default DatasetUpload;
