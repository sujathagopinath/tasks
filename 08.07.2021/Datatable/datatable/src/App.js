import React from 'react'
import logo from './logo.svg';
import './App.css';

import Home from './home';
import { EmployeeProvider } from './context'
function App() {
  return (
    <div className="App">
      <EmployeeProvider>

        <Home />
      </EmployeeProvider>

    </div>
  );
}

export default App;

