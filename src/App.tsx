import React from 'react';
import './App.css';
import { Home } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path='/' />

      </Routes>

    </div>
  );
}

export default App;
