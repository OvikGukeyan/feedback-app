import React, { useRef, useState } from 'react';
import styles from './SideBar.module.scss'
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setCategory } from '../../redux/slices/filters/filtersSlice';

type SideBarTypes = {
    statuses: {
        name: string,
        count: number,
        color: string
    }[]
};

const SideBar: React.FC<SideBarTypes> = ({ statuses }) => {
    const categorys = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
    const { filter } = useSelector(selectFilters);
    const dispatch = useDispatch();
    const [isSideBar, setIsSideBar] = useState(false);
    const sideBarRef = useRef<HTMLDivElement>(null);


    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sideBarRef.current) {
            if (!sideBarRef.current.contains(e.target as Node)) {
                setIsSideBar(false);
            }
        }
    }



    const handleHamburgerClick = () => {
        setIsSideBar(!isSideBar)
    }

    const handleChooseCategory = (cat: string | null) => {
        dispatch(setCategory(cat))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.board}>
                <div className={styles.text}>
                    <h1>Ovik Hukieian</h1>
                    <p>Feedback Board</p>
                </div>
                <svg onClick={handleHamburgerClick} xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                    <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M0 0h24v4H0zm0 8h24v4H0zm0 8h24v4H0z"
                    ></path>
                </svg>
            </div>
            <div onClick={(e) => handleOutsideClick(e)} className={`${styles.overlay} ${isSideBar ? styles.overlayVisible : ''}`}>
                <aside ref={sideBarRef} className={styles.side_bar}>

                    <div className={styles.categorys}>
                        <Button active={!filter.status} onClick={() => handleChooseCategory(null)} className='category_button'>ALL</Button>
                        {categorys.map((i) => (<Button active={filter.status === i} key={i} onClick={() => handleChooseCategory(i)} className='category_button'>{i}</Button>))}
                    </div>
                    <div className={styles.roadmap}>
                        <div className={styles.title}>
                            <h2>Roadmap</h2>
                            <Link to={'/roadmap'}><Button className='view_roadmap'>View</Button></Link>

                        </div>

                        <ul>
                            {
                                statuses.map((status, ind) => (
                                    <li>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4" cy="4" r="4" fill={status.color} />
                                        </svg>
                                        <p>{status.name}</p>
                                        <span>{status.count}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </aside>
            </div >

        </div >

    )
}

export default SideBar;