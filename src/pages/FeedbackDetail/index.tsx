import React from 'react';
import styles from './FeedbackDetail.module.scss';
import { Button, FullComment, Item } from '../../components';
import { useSelector } from 'react-redux';
import { Comment, selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { selectFilters } from '../../redux/slices/filters/filtersSlice';
import { useNavigate } from 'react-router-dom';


const FeedbackDetail: React.FC = () => {
    const navigate = useNavigate()
    const { curentFeedbackId } = useSelector(selectFilters)
    const { feedbacks } = useSelector(selectFeedbacks);
    const curentFeedback = feedbacks.find(item => item.id === curentFeedbackId);
    const comments = curentFeedback?.comments;


    const countCommentsNumber = (com: Comment[]) => {
        const commentsNumber = com?.length ? com.length : 0;
        const replies = com?.reduce((acu, item) => item?.replies ? acu + item.replies.length : acu + 0, 0);
        return commentsNumber + replies
    };

    const commentsNumber = comments ? countCommentsNumber(comments): 0;

    const handleClickBack = () => {
        navigate('/')
    };

    const handleClickEdit = () => {
        navigate('/edit')
    };


    return (
        <div className={styles.detail}>
            <div className={styles.head}>
                <Button onClick={handleClickBack} className='go_back'>Go Back</Button>
                <Button onClick={handleClickEdit} className='edit'>Edit Feedback</Button>
            </div>
            {curentFeedback && <Item item={curentFeedback} />}
            <div className={styles.comments}>
                {commentsNumber ? <h2>{commentsNumber} Comments</h2> : <h2> This feedback has no comments yet </h2>}
                {comments &&
                    comments.map((item, ind) => (
                        <FullComment key={ind} comment={item} />
                    ))
                }
            </div>
            <div className={styles.add_comment}>
                <h2>Add Comment</h2>
                <textarea placeholder='Type your comment here'></textarea>
                <div className={styles.wrapper}>
                    <p><span>255</span>Characters left</p>
                    <Button className='add_button'>Post Comment</Button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDetail;