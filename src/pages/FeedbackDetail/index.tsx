import React from 'react';
import styles from './FeedbackDetail.module.scss';
import { Button, FullComment, Item } from '../../components';
import { useSelector } from 'react-redux';
import { selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { selectFilters } from '../../redux/slices/filters/filtersSlice';

const FeedbackDetail: React.FC = () => {
    const { curentFeedbackId } = useSelector(selectFilters)
    const { feedbacks } = useSelector(selectFeedbacks);
    const curentFeedback = feedbacks.find(item => item.id === curentFeedbackId);
    const comments = curentFeedback?.comments
    // let i = comments?.length;
    // const numberOfComments = comments?.reduce((acu, cur) => cur.replies ? acu + cur.replies?.length : 0, 0) ;
    // const k = comments?.map((item) => {return item?.replies && item.replies} )
    // console.log(k)
    return (
        <div className={styles.detail}>
            <div className={styles.head}>
                <Button className='go_back'>Go Back</Button>
                <Button className='edit'>Edit Feedback</Button>
            </div>
            {curentFeedback && <Item item={curentFeedback} />}
            <div className={styles.comments}>
                <h2>{4} Comments</h2>
                {comments && 
                    comments.map(item => (
                        <FullComment comment={item}/>
                    ))
                 }
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