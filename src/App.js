import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Softblock from './softblock.js'; // Ensure this imports correctly

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/softblock" element={<Softblock />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
