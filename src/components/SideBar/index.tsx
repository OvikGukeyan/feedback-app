import React from 'react';
import styles from './SideBar.module.scss'
import Button from '../Button';

const SideBar: React.FC = () => {
    const subjects = ['ALL', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

    return (
        <aside className={styles.side_bar}>
            <div className={styles.board}>
                <h1>Ovik Hukieian</h1>
                <p>Feedback Board</p>
            </div>
            <div className={styles.subjects}>
                {subjects.map((i) => (<Button className='subject_button'>{i}</Button>))}
            </div>
            <div className={styles.roadmap}>
                <div className={styles.title}>
                    <h2>Roadmap</h2>
                    <Button className='view_roadmap'>View</Button>
                </div>
                <ul>
                    <li>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#F49F85" />
                        </svg>
                        <p>Planned</p>
                        <span>12</span>
                    </li>
                    <li>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#AD1FEA" />
                        </svg>
                        <p>In-Progress</p>
                        <span>12</span>

                    </li>
                    <li>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#62BCFA" />
                        </svg>
                        <p>Live</p>
                        <span>12</span>

                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar;