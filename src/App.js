import React from "react";

import { MemoryRouter, Route, Routes } from "react-router-dom";
import Softblock from "./softblock";
function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/softblock" component={Softblock}></Route>
        {/* Add other routes if needed */}
      </Routes>
      {/* Displaying an h1 outside the router doesn't make much sense unless it's part of every page. Consider adjusting this. */}
      <h1>Focus Yourself</h1>
    </MemoryRouter>
  );
}

export default App;
