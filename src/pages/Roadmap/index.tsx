import React, { useEffect } from 'react';
import styles from './Roadmap.module.scss';
import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchFeedbacks, selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { FeedbackItem } from '../../redux/slices/feedbacks/types';
import { useAppDispatch } from '../../redux/store';

const Roadmap: React.FC = () => {
    const dispatch = useAppDispatch()
    const { feedbacks } = useSelector(selectFeedbacks);

    // useEffect(() => {
    //     dispatch(fetchFeedbacks())
    //   }, []);
    
    type sortedFeedbacksTypes = {
        [key: string]: {
            name: string
            description: string
            items: FeedbackItem[]
        }
    }
    const sortedFeedbacks: sortedFeedbacksTypes = {
        planned: { name: 'Planned', description: 'Ideas prioritized for research', items: feedbacks.filter(feedback => feedback.status === 'Planned') },
        inProgress: { name: 'In Progress', description: 'Currently being developed', items: feedbacks.filter(feedback => feedback.status === 'In Progress') },
        live: { name: 'Live', description: 'Released features', items: feedbacks.filter(feedback => feedback.status === 'Live') },
    }

    return (
        <div className={styles.roadmap}>
            <header  >
                <div className={styles.left_box}>
                    <Link to={'/'}><Button className='go_back_white'>Go Back</Button></Link>
                    <h1>Roadmap</h1>
                </div>
                <Link to={'/create'}><Button className='add_button'>+ Add Feedback</Button></Link>

            </header>
            <div className={styles.content}>
                {Object.keys(sortedFeedbacks).map((key) => (
                    <div key={key} className={styles.box}>
                        <h3>{sortedFeedbacks[key].name} ({sortedFeedbacks[key].items.length})</h3>
                        <p>{sortedFeedbacks[key].description}</p>
                        {sortedFeedbacks[key].items.map(i => (
                            <div key={i._id} className={`${styles.feedback} ${styles[key]}`}>
                                <span className={styles.state}>{i.status}</span>
                                <Link to={`/detail/${i._id}`}>
                                    <h3>{i.title}</h3>
                                </Link>
                                <p>{i.description}</p>
                                <Button className='category_button'>{i.category}</Button>
                                <div className={styles.foot}>
                                    <Button className='upvotes_goriz'>{i.upvotes}</Button>
                                    <div className={styles.comments}>
                                        <svg width="18" height="16"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fillRule="nonzero" /></svg>
                                        <span>{i.comments ? i.comments.length : 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Roadmap;