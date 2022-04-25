import React from "react";
import "./App.css";
import Customaxios from "./axios";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customaxios fetchData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
