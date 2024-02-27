import React from 'react';
import styles from './RoadmapItem.module.scss'
import { Link } from 'react-router-dom';
import Button from '../Button';
import { handleUpvote } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackItem } from '../../redux/slices/feedbacks/types';
import { selectIsAuth } from '../../redux/slices/auth/authSlice';

type RoadmapItemTypes = {
    feedbackItem: FeedbackItem
    styleKey: string
}

const RoadmapItem: React.FC<RoadmapItemTypes> = ({feedbackItem, styleKey}) => {
    const dispatch = useDispatch();
    const { data } = useSelector(selectIsAuth);
    const isUpvoted = data?.upvoted.includes(feedbackItem._id);

    return (
        <div key={feedbackItem._id} className={`${styles.feedback} ${styles[styleKey]}`}>
            <span className={styles.state}>{feedbackItem.status}</span>
            <Link to={`/detail/${feedbackItem._id}`}>
                <h3>{feedbackItem.title}</h3>
            </Link>
            <p>{feedbackItem.description}</p>
            <Button className='category_button'>{feedbackItem.category}</Button>
            <div className={styles.foot}>
                <Button disabled={!data && true} active={isUpvoted} onClick={() => handleUpvote(dispatch, feedbackItem, data)} className='upvotes_goriz'>{feedbackItem.upvotes}</Button>
                <div className={styles.comments}>
                    <svg width="18" height="16"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fillRule="nonzero" /></svg>
                    <span>{feedbackItem.comments ? feedbackItem.comments.length : 0}</span>
                </div>
            </div>
        </div>
    )
}

export default RoadmapItem;