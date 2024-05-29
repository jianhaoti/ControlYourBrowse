import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dragDataPlugin from 'chartjs-plugin-dragdata';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, dragDataPlugin);

const data = [
  { name: 'SUN', value: 4 },
  { name: 'MON', value: 3 },
  { name: 'TUES', value: 2 },
  { name: 'WEDS', value: 2 },
  { name: 'THURS', value: 1 },
  { name: 'FRI', value: 2.3 },
  { name: 'SAT', value: 3.4 },
];

const ChartComponent = () => {
  const theme = useTheme();
  const [view, setView] = React.useState('dailyRevenue');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: view === 'dailyRevenue' ? 'Daily Revenue' : 'Weekly Revenue',
        data: data.map((item) => item.value),
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      dragData: true,
      dragX: false,
      dragDataRound: 0,
      onDragStart: function (e, element) {
        // where e = event
      },
      onDrag: function (e, datasetIndex, index, value) {
        // where e = event
      },
      onDragEnd: function (e, datasetIndex, index, value) {
        // where e = event
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: '16px',
        padding: '16px',
        marginLeft: '1rem',
        marginRight: '1rem',
      }}
    >
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        sx={{
          marginBottom: '16px',
          gap: '0.5rem',
          '& .MuiToggleButtonGroup-grouped': {
            borderRadius: '16px',
            margin: '0 4px',
            border: '1px solid',
            borderColor: theme.palette.divider,
            '&:first-of-type': {
              marginLeft: 0,
            },
            '&:last-of-type': {
              marginRight: 0,
            },
          },
        }}
      >
        <ToggleButton
          value="dailyRevenue"
          sx={{ textTransform: 'lowercase', fontStyle: 'italic', borderRadius: '16px' }}
        >
          daily
        </ToggleButton>
        <ToggleButton
          value="dailyProfit"
          sx={{ textTransform: 'lowercase', fontStyle: 'italic', borderRadius: '16px' }}
        >
          weekly
        </ToggleButton>
      </ToggleButtonGroup>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default ChartComponent;

