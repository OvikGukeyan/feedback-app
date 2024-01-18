import React from 'react';
import './App.css';
import { FeedbackDetail, Home } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<FeedbackDetail/>} path='/detail'/>
      </Routes>

    </div>
  );
}

export default App;
