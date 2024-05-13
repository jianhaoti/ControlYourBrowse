import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Softblock from "./softblock.js";
import Schedule from "./schedule.js";
import Debug from "./debug.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/softblock" element={<Softblock />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/debug" element={<Debug />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
