import React, { useEffect } from 'react';
import './App.css';
import { SignUp, SignIn, CreateFeedback, FeedbackDetail, Home, Roadmap } from './pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './redux/store';
import { fetchAuthMe } from './redux/slices/auth/utils';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slices/auth/authSlice';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  

  const isAuth = Boolean(useSelector(selectIsAuth).data);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);



  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<FeedbackDetail />} path='/detail/:id' />
        <Route element={<Roadmap />} path='/roadmap' />
        {
          isAuth ?
            (<>
              <Route element={<CreateFeedback />} path='/create' />
              <Route element={<CreateFeedback />} path='/edit/:id' />
            </>) :

            (<>
              <Route element={<SignIn />} path='/login' />
              <Route element={<SignUp />} path='/register' />

              <Route element={<Navigate to="/login" />} path='/create' />
            </>)
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </div>
  );
}

export default App;
