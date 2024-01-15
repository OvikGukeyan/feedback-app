import React from 'react';
import styles from './Item.module.scss';
import Button from '../Button';

const Item: React.FC = () => {
    return (
        <div className={styles.item}>

            <Button className='upvotes'>12</Button>
            <div className={styles.content}>
                <h1>Add tags for solutions</h1>
                <p>Easier to search for solutions based on a specific stack.</p>
                <Button className='subject_button'>Enhancement</Button>
            </div>
            <div className={styles.coments}>
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fill-rule="nonzero" /></svg>
                <span>4</span>
            </div>
        </div>
    )
}

export default Item;