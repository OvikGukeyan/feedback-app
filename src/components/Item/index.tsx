import React from 'react';
import styles from './Item.module.scss';
import Button from '../Button';
import { FeedbackItem } from '../../redux/slices/feedbacks/feedbacksSlice';

type ItemType = {
    item: FeedbackItem,
    handleFeedbackCliick?: (id:number)=>void
}

const Item: React.FC<ItemType> = ({item, handleFeedbackCliick}) => {
    return (
        <div onClick={()=>handleFeedbackCliick?.(item.id)} className={styles.item}>

            <Button className='upvotes'>{item.upvotes}</Button>
            <div className={styles.content}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <Button className='category_button'>{item.category}</Button>
            </div>
            <div className={styles.comments}>
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fill-rule="nonzero" /></svg>
                <span>{item.comments ? item.comments.length : 0}</span>
            </div>
        </div>
    )
}

export default Item;