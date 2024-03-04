import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Item, SideBar, PopUp, EmptyBoard } from '../../components';
import { selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { selectFilters, setSortBy } from '../../redux/slices/filters/filtersSlice';
import ItemLoader from '../../components/FeedbackItem/FeedbackItemLoader';
import { selectIsAuth, signOut } from '../../redux/slices/auth/authSlice';
import { fetchFeedbacks } from '../../redux/slices/feedbacks/utils';



const Home: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSelector(selectIsAuth)
  const isAuth = Boolean(data);
  const { feedbacks, isLoading, loadingRejected } = useSelector(selectFeedbacks);
  const { sortBy, filter } = useSelector(selectFilters);
  const statuses = [
    { name: 'Planned', count: feedbacks ? feedbacks.filter((item) => item.status === 'Planned').length : 0, color: '#F49F85' },
    { name: 'In Progress', count: feedbacks ? feedbacks.filter((item) => item.status === 'In Progress').length : 0, color: '#AD1FEA' },
    { name: 'Live', count: feedbacks ? feedbacks.filter((item) => item.status === 'Live').length : 0, color: '#62BCFA' }
  ];

  const sortList = [
    { name: 'Most Upvotes', type: 'upvotes', order: 'desc' },
    { name: 'Least Upvotes', type: 'upvotes', order: 'asc' },
    { name: 'Most Comments', type: 'comments', order: 'desc' },
    { name: 'Least Comments', type: 'comments', order: 'asc' },
  ];

  const loginList = isAuth ?
    [{ name: 'Sign Out' }] :
    [{ name: 'Sign In' }, { name: 'Sign Up' }]

  useEffect(() => {
    dispatch(fetchFeedbacks({ sortBy, filter }))
  }, [sortBy, filter]);

  const handleLogin = (item: string) => {
    if (item === 'Sign Out') {
      dispatch(signOut());
      window.localStorage.removeItem('token')
    }else if(item === 'Sign In') {
      navigate('/login')
    }else if (item === 'Sign Up') {
      navigate('register')
    }
  }

  const handleFeedbackCliick = (id: string) => {
    navigate(`/detail/${id}`);
    window.scroll(0, 0);
  };


  const handleChooseSort = (item: string) => {
    const obj = sortList.find((i) => i.name === item);
    dispatch(setSortBy(obj))
  };
  const suggestions = feedbacks ? feedbacks.filter(item => item.status === 'Suggestion') : null;

  return (
    <div className={styles.home}>
      <SideBar statuses={statuses} />
      <div className={styles.main}>
        <header  >
          <div className={styles.suggestions}>
            <img src="./assets/suggestions/icon-suggestions.svg" alt="" />
            <span> {suggestions ? suggestions.length : 0} Suggestions</span>
          </div>

          <PopUp active={sortBy.name} handleChooseItem={handleChooseSort} list={sortList} className='sort'>
            <p className={styles.sort}>Sort by: <span>{sortBy.name}</span></p>
          </PopUp>

          {isAuth &&
            <Link to={'/create'}><Button className='add_button'>+ Add Feedback</Button></Link>
          }
          <div>
            <PopUp handleChooseItem={handleLogin} list={loginList} className='login'>
              <img className={styles.avatar} src={data ? `http://localhost:4444${data?.avatarUrl}`: 'assets/user-images/default_avatar.png'} alt="" />
            </PopUp>
          </div>

        </header>


        <div className={styles.items}>
          {isLoading ?
            [...Array(2)].map((i, ind) => (
              <ItemLoader key={ind} />
            )) :
            suggestions && suggestions.map((item) => (
              <Item key={item._id} handleFeedbackCliick={handleFeedbackCliick} item={item} />
            ))
          }

          {!isLoading && suggestions && suggestions?.length < 1 && <EmptyBoard />}
        </div>

      </div>
    </div>

  )
}

export default Home;