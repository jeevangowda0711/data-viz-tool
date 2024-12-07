import React, { useState, useEffect } from 'react';
import API from '../services/api';

/**
 * Component for showing AI-generated insights from datasets.
 */

function AIInsights() {
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
      const response = await API.post('/ai/insights', {
        dataset_id: datasetId,
      });
      setInsights(response.data);
    } catch (error) {
      setError(error);
      console.error('Failed to generate insights:', error);
    }
  };

  return (
    <div>
      <h2>AI Insights</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Dataset:</label>
          <select value={datasetId} onChange={(e) => setDatasetId(e.target.value)} required>
            <option value="" disabled>Select a dataset</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Generate Insights</button>
      </form>
      {insights && (
        <div>
          <h3>Insights:</h3>
          <pre>{JSON.stringify(insights, null, 2)}</pre>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default AIInsights;
