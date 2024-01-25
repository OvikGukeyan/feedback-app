import React from 'react';
import styles from './SideBar.module.scss'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
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
    const categorys = ['ALL', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
    const navigate = useNavigate();
    const { category } = useSelector(selectFilters);
    const dispatch = useDispatch();

    const handleRoadmapClick = () => {
        navigate('/roadmap')
    };

    const handleChooseCategory = (cat: string) => {
        dispatch(setCategory(cat))
    }

    return (
        <aside className={styles.side_bar}>
            <div className={styles.board}>
                <h1>Ovik Hukieian</h1>
                <p>Feedback Board</p>
            </div>
            <div className={styles.categorys}>
                {categorys.map((i) => (<Button key={i} onClick={() => handleChooseCategory(i)} className={category === i ? 'category_button_active' : 'category_button'}>{i}</Button>))}
            </div>
            <div className={styles.roadmap}>
                <div className={styles.title}>
                    <h2>Roadmap</h2>
                    <Button onClick={handleRoadmapClick} className='view_roadmap'>View</Button>
                </div>

                <ul>
                    {
                        statuses.map((status, ind) => (
                            <li key={ind}>
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
    )
}

export default SideBar;