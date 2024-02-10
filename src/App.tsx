import React, { useEffect } from 'react';
import './App.css';
import { SignUp, SignIn, CreateFeedback, FeedbackDetail, Home, Roadmap } from './pages';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './redux/store';
import { fetchAuthMe } from './redux/slices/auth/authSlice';
import { fetchFeedbacks, selectFeedbacks } from './redux/slices/feedbacks/feedbacksSlice';
import { useSelector } from 'react-redux';
import { selectFilters } from './redux/slices/filters/filtersSlice';

const  App:React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortBy, category } = useSelector(selectFilters);
  const feedbacksData = useSelector(selectFeedbacks);


  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  useEffect(() => {
    dispatch(fetchFeedbacks({ sortBy, category }))
  }, [sortBy, category]);

  return (
    <div className="App">
      <Routes>
        <Route element={<Home feedbacksData={feedbacksData}/>} path='/' />
        <Route element={<FeedbackDetail />} path='/detail/:id' />
        <Route element={<CreateFeedback />} path='/create' />
        <Route element={<CreateFeedback isEdit/>} path='/edit/:id' />
        <Route element={<Roadmap />} path='/roadmap' />
        <Route element={<SignIn />} path='/login' />
        <Route element={<SignUp />} path='/register' />


      </Routes>

    </div>
  );
}

export default App;
