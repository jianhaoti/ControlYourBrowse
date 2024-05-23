import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';

const data = [
  { name: 'SUN', value: 4 },
  { name: 'MON', value: 3 },
  { name: 'TUES', value: 2 },
  { name: 'WEDS', value: 2 },
  { name: 'THURS', value: 1 },
  { name: 'FRI', value: 2.3 },
  { name: 'SAT', value: 3.4 },
];

const BarChartBox = () => {
  const theme = useTheme();
  const [view, setView] = React.useState('dailyRevenue');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: '16px',
        padding: '16px',
        marginLeft: '1rem',
        marginRight: '1rem',
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
            margin: '0 4px', // Add horizontal margin to create space between buttons
            border: '1px solid', // Ensure there is a border to separate the buttons
            borderColor: theme.palette.divider, // Use theme divider color for the border
            '&:first-of-type': {
              marginLeft: 0, // Remove the left margin for the first button
            },
            '&:last-of-type': {
              marginRight: 0, // Remove the right margin for the last button
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
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" fontSize="0.75rem" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          {/* <Tooltip /> */}
          <Bar dataKey="value" fill={theme.palette.primary.dust} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartBox;
