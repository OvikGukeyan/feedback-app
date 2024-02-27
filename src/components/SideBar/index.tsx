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
                <svg onClick={handleHamburgerClick} width="24" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" fill-rule="evenodd"><path d="M0 0h24v4H0zM0 8h24v4H0zM0 16h24v4H0z" /></g></svg>
            </div>
            <div onClick={(e) => handleOutsideClick(e)} className={`${styles.overlay} ${isSideBar ? styles.overlayVisible : ''}`}>
                <aside ref={sideBarRef} className={styles.side_bar}>

                    <div className={styles.categorys}>
                        <Button onClick={() => handleChooseCategory(null)} className={!filter.status ? 'category_button_active' : 'category_button'}>ALL</Button>
                        {categorys.map((i) => (<Button key={i} onClick={() => handleChooseCategory(i)} className={filter.status === i ? 'category_button_active' : 'category_button'}>{i}</Button>))}
                    </div>
                    <div className={styles.roadmap}>
                        <div className={styles.title}>
                            <h2>Roadmap</h2>
                            <Link to={'/roadmap'}><Button className='view_roadmap'>View</Button></Link>

                        </div>

                        <ul>
                            {
                                statuses.map((status, ind) => (
                                    <li key={ind}>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" >
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
            </div>

        </div>

    )
}

export default SideBar;