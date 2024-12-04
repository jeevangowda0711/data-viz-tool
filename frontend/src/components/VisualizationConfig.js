import React, { useState } from 'react';
import API from '../services/api';

/**
 * Component for configuring visualization settings.
 */

function VisualizationConfig() {
  const [datasetId, setDatasetId] = useState('');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [chartType, setChartType] = useState('bar');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/visualizations/create', {
        dataset_id: datasetId,
        x_column: xColumn,
        y_column: yColumn,
        chart_type: chartType,
      });
      console.log('Visualization created:', response.data);
    } catch (error) {
      console.error('Visualization creation failed:', error);
    }
  };

  return (
    <div>
      <h2>Configure Visualization</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dataset ID:</label>
          <input type="text" value={datasetId} onChange={(e) => setDatasetId(e.target.value)} required />
        </div>
        <div>
          <label>X Column:</label>
          <input type="text" value={xColumn} onChange={(e) => setXColumn(e.target.value)} required />
        </div>
        <div>
          <label>Y Column:</label>
          <input type="text" value={yColumn} onChange={(e) => setYColumn(e.target.value)} required />
        </div>
        <div>
          <label>Chart Type:</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>
        <button type="submit">Create Visualization</button>
      </form>
    </div>
  );
}

export default VisualizationConfig;
