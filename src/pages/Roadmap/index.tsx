import React, { useEffect } from 'react';
import styles from './Roadmap.module.scss';
import { Button, RoadmapItem } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchFeedbacks, selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { FeedbackItem } from '../../redux/slices/feedbacks/types';
import { useAppDispatch } from '../../redux/store';

const Roadmap: React.FC = () => {
    const dispatch = useAppDispatch()
    const { feedbacks } = useSelector(selectFeedbacks);


    useEffect(() => {
        dispatch(fetchFeedbacks({}))
    }, []);

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
            <div className={styles.control_panel}>
                {Object.keys(sortedFeedbacks).map((key) =>
                    <div className={styles.button}>
                        <h3>{sortedFeedbacks[key].name} ({sortedFeedbacks[key].items.length})</h3>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                {Object.keys(sortedFeedbacks).map((key) =>
                    <div key={key} className={styles.box}>
                        <h3>{sortedFeedbacks[key].name} ({sortedFeedbacks[key].items.length})</h3>
                        <p>{sortedFeedbacks[key].description}</p>
                        {sortedFeedbacks[key].items.map(feedbackItem => (
                            <RoadmapItem
                                feedbackItem={feedbackItem}
                                styleKey={key}
                            />
                        ))}

                    </div>
                )}

            </div>
        </div>
    )
}

export default Roadmap;