import React, { useState, useEffect } from 'react';
import API from '../services/api';

/**
 * Component for displaying visualizations as charts.
 */

function ChartDisplay({ visualizationId }) {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchVisualization = async () => {
      try {
        const response = await API.get(`/visualizations/${visualizationId}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Failed to fetch visualization:', error);
      }
    };

    fetchVisualization();
  }, [visualizationId]);

  return (
    <div>
      <h2>Chart Display</h2>
      {imageSrc && <img src={imageSrc} alt="Visualization" />}
    </div>
  );
}

export default ChartDisplay;
