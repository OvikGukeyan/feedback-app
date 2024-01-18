import React from 'react';
import styles from './FeedbackDetail.module.scss';
import { Button, Comment } from '../../components';

const FeedbackDetail: React.FC = () => {
    return (
        <div className={styles.detail}>
            <div className={styles.head}>
                <Button className='go_back'>Go Back</Button>
                <Button className='edit'>Edit Feedback</Button>
            </div>
            {/* <Item/> */}
            <div className={styles.comments}>
                <h2>4 Comments</h2>
                <Comment />
            </div>
            <div className={styles.add_comment}>
                <h2>Add Comment</h2>
                <textarea placeholder='Type your comment here'></textarea>
                <div className={styles.wrapper}>
                    <p><span>255 </span>Characters left</p>
                    <Button className='add_button'>Post Comment</Button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDetail;