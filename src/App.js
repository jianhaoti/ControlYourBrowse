import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Softblock from './softblock.js'; // Ensure this imports correctly]8
import theme from './theme.js';
import { ThemeProvider } from 'styled-components';
import { Theme } from '@fullcalendar/core/internal';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/softblock" element={<Softblock />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
