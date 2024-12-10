import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import API from '../../services/api';

export default function DatasetUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await API.post('/datasets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      toast.success('File uploaded successfully');
      console.log('Upload successful:', response.data);
    } catch (error) {
      toast.error('Upload failed');
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <CloudArrowUpIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="mb-2">Drag and drop your dataset here, or</p>
        <label className="btn-primary cursor-pointer inline-block">
          Browse Files
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>
      <button onClick={handleUpload} className="btn-primary w-full mt-4">
        Upload
      </button>
      <Toaster />
    </div>
  );
}