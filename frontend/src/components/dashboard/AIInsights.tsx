import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import API from '../../services/api';
import ReactMarkdown from 'react-markdown';

/**
 * Component for showing AI-generated insights from datasets.
 */
export default function AIInsights() {
  const [insights, setInsights] = useState(''); // Stores insights and recommendations
  const [error, setError] = useState(null); // Stores error messages
  const [datasetId, setDatasetId] = useState(''); // Selected dataset ID
  const [datasets, setDatasets] = useState([]); // List of datasets

  // Fetch available datasets when the component mounts
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
        const response = await API.get('/datasets', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });
        setDatasets(response.data); // Store datasets in state
      } catch (error) {
        console.error('Failed to fetch datasets:', error);
      }
    };
    fetchDatasets();
  }, []);

  // Handle dataset selection
  const handleDatasetSelect = (e) => {
    setDatasetId(e.target.value);
  };

  // Generate insights for the selected dataset
  const handleGenerateInsights = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token
      const response = await API.post(`/datasets/${datasetId}/insights`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        },
      });

      const insightsData = response.data.insights.insights;

      // Check if insights exist and are a string
      if (typeof insightsData === 'string') {
        setInsights(insightsData); // Render Markdown content
      } else {
        setError('Unexpected response format');
        console.error('Unexpected response format:', insightsData);
      }

      toast.success('Insights generated successfully');
    } catch (error) {
      setError('Failed to generate insights');
      console.error('Failed to generate insights:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">AI Insights</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Dataset:</label>
        <select
          value={datasetId}
          onChange={handleDatasetSelect}
          className="input-field"
          required
        >
          <option value="" disabled>Select a dataset</option>
          {datasets.map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerateInsights} className="btn-primary w-full">Generate Insights</button>
      {insights && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Insights:</h3>
          <div className="bg-gray-100 dark:bg-gray-800 dark:text-white p-4 rounded whitespace-pre-wrap">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      <Toaster />
    </div>
  );
}
