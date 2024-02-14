import React, { useEffect, useState } from 'react';
import styles from './FeedbackDetail.module.scss';
import { Button, FullComment, Item } from '../../components';
import { Comment, FeedbackItem } from '../../redux/slices/feedbacks/feedbacksSlice';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';
import ItemLoader from '../../components/Item/ItemLoader';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth/authSlice';


const FeedbackDetail: React.FC = () => {
    const params = useParams();
    const { data } = useSelector(selectIsAuth);
    const [curentFeedback, setCurentFeedback] = useState<FeedbackItem>();
    const isEditable = data?._id === curentFeedback?.user._id
    const comments = curentFeedback?.comments;
    const countCommentsNumber = (com: Comment[]) => {
        const commentsNumber = com?.length ? com.length : 0;
        const replies = com?.reduce((acu, item) => item?.replies ? acu + item.replies.length : acu + 0, 0);
        return commentsNumber + replies
    };

    useEffect(() => {
        axios.get(`/feedbacks/${params.id}`)
            .then((res) => {
                setCurentFeedback(res.data);
            })
            .catch((error) => {
                console.warn(error)
                alert('Error getting article!')
            })
    }, [])

    const commentsNumber = comments ? countCommentsNumber(comments) : 0;
   

   

    return (
        <div className={styles.detail}>
            <div className={styles.head}>
                <Link to={'/'}><Button className='go_back'>Go Back</Button></Link>
                
                {isEditable && <Link to={`/edit/${curentFeedback?._id}`}><Button  className='edit'>Edit Feedback</Button></Link>}
            </div>
            {curentFeedback ? <Item item={curentFeedback} /> : <ItemLoader />}
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