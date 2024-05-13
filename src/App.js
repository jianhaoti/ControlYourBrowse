import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Softblock from "./softblock.js"; // Ensure this imports correctly
import Schedule from "./schedule.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/softblock" element={<Softblock />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
