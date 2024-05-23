import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-plugin-dragdata';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DraggableGoals = () => {
  const [data, setData] = useState([30, 80, 45, 60, 20, 90, 55]);
  const chartRef = useRef();

  const chartData = {
    labels: data.map((_, i) => `Label ${i + 1}`),
    datasets: [{
      label: 'Dataset 1',
      data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    plugins: {
      dragData: {
        round: 1,
        onDragEnd: (e, datasetIndex, index, value) => {
          const newData = [...data];
          newData[index] = value;
          setData(newData);
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
};

export default DraggableGoals;
