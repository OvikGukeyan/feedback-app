import React from 'react';
import styles from './SideBar.module.scss'
import Button from '../Button';

type SideBarTypes = {
    statuses: {
        name: string,
        count: number,
        color: string
    }[]
}

const SideBar: React.FC<SideBarTypes> = ({statuses}) => {
    const categorys = ['ALL', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

    return (
        <aside className={styles.side_bar}>
            <div className={styles.board}>
                <h1>Ovik Hukieian</h1>
                <p>Feedback Board</p>
            </div>
            <div className={styles.categorys}>
                {categorys.map((i) => (<Button className='category_button'>{i}</Button>))}
            </div>
            <div className={styles.roadmap}>
                <div className={styles.title}>
                    <h2>Roadmap</h2>
                    <Button className='view_roadmap'>View</Button>
                </div>

                <ul>
                {
                    statuses.map((status) => (
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
    )
}

export default SideBar;