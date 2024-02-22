import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './FeedbackDetail.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { Button, FullComment, Item } from '../../components';
import { fetchOneFeedback, postComment, postReply, selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import ItemLoader from '../../components/Item/ItemLoader';
import { selectIsAuth } from '../../redux/slices/auth/authSlice';


const FeedbackDetail: React.FC = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const { data } = useSelector(selectIsAuth);
    const { currentFeedback } = useSelector(selectFeedbacks)

    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyId, setReplyId] = useState('');

    const isEditable = data?._id === currentFeedback?.user._id;
    const comments = currentFeedback?.comments;

    

    useEffect(() => {
        params.id &&
            dispatch(fetchOneFeedback(params.id))
    }, []);

    const handleCommentInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        if (newText.length <= 255) {
            setCommentText(event.target.value);
        }
    };

    const handleSubmitComment = () => {
        if (currentFeedback?._id) {
            const params = {
                id: currentFeedback?._id,
                options: {
                    content: commentText
                }
            }
            dispatch(postComment(params))
            setCommentText('');
        }
    };

    const handleSubmitReply = (feedbackId: string, commentId: string, replyingTo: string) => {
        const params = {
            commentId,
            options: {
                content: replyText,
                replyingTo: replyingTo,
                feedbackId: feedbackId
            }
        }
        dispatch(postReply(params))
        setReplyText('');
        setReplyId('');
    };






    return (
        <div className={styles.detail}>
            <div className={styles.head}>
                <Link to={'/'}><Button className='go_back'>Go Back</Button></Link>

                {isEditable && <Link to={`/edit/${currentFeedback?._id}`}><Button className='edit'>Edit Feedback</Button></Link>}
            </div>
            {currentFeedback ? <Item item={currentFeedback} /> : <ItemLoader />}
            <div className={styles.comments}>
                {currentFeedback ? <h2>{currentFeedback.commentsCount} Comments</h2> : <h2> This feedback has no comments yet </h2>}
                {comments &&
                    comments.map((item, ind) => (
                        <FullComment
                            replyText={replyText}
                            replyId={replyId}
                            setReplyId={setReplyId}
                            setReplyText={setReplyText}
                            key={ind}
                            comment={item}
                            handleSubmitReply={handleSubmitReply} />
                    ))
                }
            </div>
            <div className={styles.add_comment}>
                <h2>Add Comment</h2>
                <textarea value={commentText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                <div className={styles.wrapper}>
                    <p><span>{255 - commentText.length}</span> Characters left</p>
                    <Button onClick={handleSubmitComment} className='add_button'>Post Comment</Button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackDetail;