import React from 'react'
import styles from './Home.module.scss'
import { Button, Item } from '../../components';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
        <header  >
            <div className={styles.suggestions}>
              <img src="./assets/suggestions/icon-suggestions.svg" alt="" />
              <span> 6 Suggestions</span>
            </div>
            <div className={styles.sort}>
              <p>Sort by: <span>Most Upwotes</span></p>
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="#fff" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
            </div>
            <Button className='header_button'>+ Add Feedback</Button>
        </header>
        <div className={styles.items}>
          <Item/>
        </div>
        
    </div>
  )
}

export default Home;