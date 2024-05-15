import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Softblock from "./softblock.js";
import Schedule from "./schedule.js";
import Debug from "./debug.js";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import BlockedWebsites from "./blockedWebsites.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/softblock" element={<Softblock />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/blockedWebsites" element={<BlockedWebsites />} />
          <Route path="/debug" element={<Debug />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
