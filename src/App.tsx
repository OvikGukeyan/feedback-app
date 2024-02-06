import React from 'react';
import './App.css';
import { Auth, CreateFeedback, FeedbackDetail, Home, Roadmap } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<FeedbackDetail/>} path='/detail/:id'/>
        <Route element={<CreateFeedback/>} path='/create'/>
        <Route element={<CreateFeedback/>} path='/edit'/>
        <Route element={<Roadmap/>} path='/roadmap'/>
        <Route element={<Auth/>} path='/login'/>

      </Routes>

    </div>
  );
}

export default App;
