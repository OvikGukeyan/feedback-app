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
  const isAuth = Boolean(useSelector(selectIsAuth).data);
  const { feedbacks, isLoading, loadingRejected } = useSelector(selectFeedbacks);
  const { sortBy, filter } = useSelector(selectFilters);
  const statuses = [
    { name: 'Planned', count: feedbacks ? feedbacks.filter((item) => item.status === 'Planned').length: 0, color: '#F49F85' },
    { name: 'In Progress', count: feedbacks ? feedbacks.filter((item) => item.status === 'In Progress').length: 0, color: '#AD1FEA' },
    { name: 'Live', count: feedbacks ? feedbacks.filter((item) => item.status === 'Live').length: 0, color: '#62BCFA' }
  ];

  const sortList = [
    { name: 'Most Upvotes', type: 'upvotes', order: 'desc' },
    { name: 'Least Upvotes', type: 'upvotes', order: 'asc' },
    { name: 'Most Comments', type: 'comments', order: 'desc' },
    { name: 'Least Comments', type: 'comments', order: 'asc' },
  ];



  useEffect(() => {
    dispatch(fetchFeedbacks({ sortBy, filter }))
  }, [sortBy, filter]);



  const handleFeedbackCliick = (id: string) => {
    navigate(`/detail/${id}`);
    window.scroll(0, 0);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    window.localStorage.removeItem('token')
  };



  const handleChooseSort = (item: string) => {
    const obj = sortList.find((i) => i.name === item);
    dispatch(setSortBy(obj))
  };
  const suggestions = feedbacks ? feedbacks.filter(item => item.status === 'Suggestion'): null;

  return (
    <div className={styles.home}>
      <SideBar statuses={statuses} />
      <div className={styles.main}>
        <header  >
          <div className={styles.suggestions}>
            <img src="./assets/suggestions/icon-suggestions.svg" alt="" />
            <span> {suggestions ? suggestions.length: 0} Suggestions</span>
          </div>

          <PopUp active={sortBy.name} handleChooseItem={handleChooseSort} list={sortList} className='sort'>
            <p className={styles.sort}>Sort by: <span>{sortBy.name}</span></p>
          </PopUp>

          {isAuth ?
            <div className={styles.buttons_box}>
              <Link to={'/create'}><Button className='add_button'>+ Add Feedback</Button></Link>
              <Button onClick={handleSignOut} className='sign_out'>Sign Out</Button>



            </div>
            :
            <div className={styles.buttons_box}>
              <Link to={'/login'}><Button className='sign_in'>Sign In</Button></Link>
              <Link to={'/register'}><Button className='sign_up'>Sign Up</Button></Link>


            </div>}
        </header>
        {isLoading ?
          [...Array(2)].map((i, ind) => (
            <ItemLoader key={ind} />
          )) :

          suggestions && suggestions.map((item) => (
            <div key={item._id} className={styles.items}>
              <Item handleFeedbackCliick={handleFeedbackCliick} item={item} />
            </div>
          ))
        }
        {suggestions && suggestions?.length < 1 && <EmptyBoard />}
      </div>
    </div>

  )
}

export default Home;