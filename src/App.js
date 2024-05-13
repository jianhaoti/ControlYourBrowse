import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Softblock from './softblock.js'; // Ensure this imports correctly
import Schedule from './schedule.js';
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline /> 
    <Router>
      <Routes>
        <Route path="/softblock" element={<Softblock />} />
        {/* Add more routes as needed */}
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
