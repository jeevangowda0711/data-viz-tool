import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import API from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  BarController,
  LineController,
  PieController,
  RadarController,
  BubbleController,
  DoughnutController,
  PolarAreaController,
} from 'chart.js';
import { Bar, Line, Pie, Scatter, Radar, Bubble, Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  BarController,
  LineController,
  PieController,
  RadarController,
  BubbleController,
  DoughnutController,
  PolarAreaController,
);

interface Dataset {
  id: number;
  name: string;
  data: string; // JSON string
}

interface Visualization {
  id: number;
  chart_type: string;
  config_data: string;
}

export default function VisualizationBuilder() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [bubbleSizeColumn, setBubbleSizeColumn] = useState(''); // New state for bubble size column
  const [chartType, setChartType] = useState('bar');
  const [visualization, setVisualization] = useState<Visualization | null>(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await API.get('/datasets', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        });
        setDatasets(response.data);
        console.log('Fetched datasets:', response.data); // Add logging
      } catch (error) {
        console.error('Failed to fetch datasets:', error);
      }
    };
    fetchDatasets();
  }, []);

  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedDataset(dataset);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDataset) return;
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const configData = {
        dataset_id: selectedDataset.id,
        x_column: xColumn,
        y_column: yColumn,
      };
      if (chartType === 'bubble') {
        configData['bubble_size_column'] = bubbleSizeColumn; // Add bubble size column to config data
      }
      const response = await API.post('/visualizations/create', {
        chart_type: chartType,
        config_data: JSON.stringify(configData),
        user_id: 1, // Replace with the actual user ID
        dataset_id: selectedDataset.id, // Ensure dataset_id is included
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      setVisualization(response.data);
      toast.success('Visualization created successfully');
      console.log('Visualization created:', response.data);
    } catch (error) {
      toast.error('Visualization creation failed');
      console.error('Visualization creation failed:', error);
    }
  };

  const renderChart = () => {
    if (!visualization || !selectedDataset) return null;
    const config = JSON.parse(visualization.config_data);
    const datasetData = JSON.parse(selectedDataset.data); // Parse the JSON string
    const xData = Object.values(datasetData[config.x_column]); // Convert to array
    const yData = Object.values(datasetData[config.y_column]); // Convert to array
    const bubbleSizeData = config.bubble_size_column ? Object.values(datasetData[config.bubble_size_column]) : []; // Convert to array if exists
    console.log('Selected Dataset:', selectedDataset);
    console.log('Config:', config);
    console.log('X Data:', xData);
    console.log('Y Data:', yData);
    console.log('Bubble Size Data:', bubbleSizeData);
    if (!xData || !yData || (chartType === 'bubble' && !bubbleSizeData)) {
      console.error('Invalid columns specified in the configuration');
      return <div>Invalid columns specified in the configuration</div>;
    }
    const data = {
      labels: xData,
      datasets: [
        {
          label: config.y_column,
          data: chartType === 'bubble' ? xData.map((x, i) => ({ x, y: yData[i], r: bubbleSizeData[i] })) : yData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const, // Ensure the position is one of the allowed string literals
        },
        title: {
          display: true,
          text: `${visualization.chart_type} Chart`,
        },
      },
    };
    switch (visualization.chart_type) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'scatter':
        return <Scatter data={data} options={options} />;
      case 'radar':
        return <Radar data={data} options={options} />;
      case 'bubble':
        return <Bubble data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Select Dataset:</label>
          <select
            value={selectedDataset ? selectedDataset.id : ''}
            onChange={(e) => handleDatasetSelect(datasets.find(d => d.id === parseInt(e.target.value)))}
            className="input-field"
          >
            <option value="">Select a dataset</option>
            {datasets.map(dataset => (
              <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">X Column:</label>
          <input
            type="text"
            value={xColumn}
            onChange={(e) => setXColumn(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y Column:</label>
          <input
            type="text"
            value={yColumn}
            onChange={(e) => setYColumn(e.target.value)}
            className="input-field"
          />
        </div>
        {chartType === 'bubble' && (
          <div>
            <label className="block text-sm font-medium mb-1">Bubble Size Column:</label>
            <input
              type="text"
              value={bubbleSizeColumn}
              onChange={(e) => setBubbleSizeColumn(e.target.value)}
              className="input-field"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="input-field"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="scatter">Scatter</option>
            <option value="radar">Radar</option>
            <option value="bubble">Bubble</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>
          </select>
        </div>
        <button type="submit" className="btn-primary w-full mt-4">Create Visualization</button>
      </form>
      <div className="mt-8">
        {renderChart()}
      </div>
      <Toaster />
    </div>
  );
}