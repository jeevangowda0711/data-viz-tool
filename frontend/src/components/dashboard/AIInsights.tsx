import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import API from '../../services/api';
import ReactMarkdown from 'react-markdown';

/**
 * Component for showing AI-generated insights from datasets.
 */
export default function AIInsights() {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);
  const [datasetId, setDatasetId] = useState('');
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    // Fetch available datasets
    const fetchDatasets = async () => {
      try {
        const response = await API.get('/datasets');
        setDatasets(response.data);
      } catch (error) {
        console.error('Failed to fetch datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/ai-insights/insights', {
        dataset_id: datasetId,
      });
      setInsights(response.data);
      toast.success('Insights generated successfully');
    } catch (error) {
      setError(error);
      toast.error('Failed to generate insights');
      console.error('Failed to generate insights:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">AI Insights</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Dataset:</label>
          <select
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
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
        <button type="submit" className="btn-primary w-full">Generate Insights</button>
      </form>
      {insights && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Insights:</h3>
          <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            <ReactMarkdown>{insights.insights}</ReactMarkdown>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
      <Toaster />
    </div>
  );
}