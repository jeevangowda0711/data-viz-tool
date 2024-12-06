import React, { useState } from 'react';
import API from '../services/api';

/**
 * Component for showing AI-generated insights from datasets.
 */

function AIInsights() {
  const [datasetId, setDatasetId] = useState('');
  const [insights, setInsights] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/ai/insights', { dataset_id: datasetId });
      setInsights(response.data.insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    }
  };

  return (
    <div>
      <h2>AI Insights</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dataset ID:</label>
          <input type="text" value={datasetId} onChange={(e) => setDatasetId(e.target.value)} required />
        </div>
        <button type="submit">Generate Insights</button>
      </form>
      {insights && (
        <div>
          <h3>Insights:</h3>
          <pre>{JSON.stringify(insights, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
