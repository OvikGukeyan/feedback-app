import React, { ChangeEvent } from 'react';
import styles from './Comment.module.scss';

import { Button, Reply } from '..';
import { Comment } from '../../redux/slices/feedbacks/types';
import { useSelector } from 'react-redux';
import { removeComment, selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { useAppDispatch } from '../../redux/store';

type FullCommentType = {
    comment: Comment
    setReplyText: (text: string) => void
    setReplyId: (arg0: string) => void
    replyId: string
    replyText: string
    handleSubmitReply: (feedbackId: string, commentId: string, replyingTo: string) => void
}

const FullComment: React.FC<FullCommentType> = ({ comment, setReplyText, setReplyId, replyId, replyText, handleSubmitReply }) => {
    const { currentFeedback } = useSelector(selectFeedbacks);
    const feedbackId = currentFeedback?._id ? currentFeedback?._id : '';
    const dispatch = useAppDispatch();

    const handleCommentInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        if (newText.length <= 255) {
            setReplyText(event.target.value);
        }
    };

    const handleClickReply = (id: string) => {
        if (id !== replyId) {
            setReplyId(id)
        } else {
            setReplyId('')
        }
    };

    const handleRemoveComment = () => {
        dispatch(removeComment(comment._id))
    }



    return (
        <div className={styles.comment}>
            <div className={styles.comment_head}>
                <div className={styles.img}>
                    <img src={`http://localhost:4444${comment.user?.avatarUrl}`} alt="" />
                </div>
                <div className={styles.names}>
                    <h4>{comment.user.fullName}</h4>
                    <p>@{comment.user.userName}</p>
                </div>
                <Button onClick={handleRemoveComment} className='delete_comment'>Delete</Button>
                <Button onClick={() => handleClickReply(comment._id)} className='view_roadmap'>Reply</Button>
            </div>
            <div className={`${styles.content} ${styles.line}`}>
                <p className={styles.text}>{comment.content}</p>
                <div className={replyId === comment._id ? styles.reply_input : styles.hide}>
                    <textarea value={replyText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                    <Button onClick={() => handleSubmitReply(feedbackId, comment._id, comment.user.userName)} className={'add_button'}>Post Reply</Button>
                </div>
                {comment.replies && comment.replies.map(item => (
                    <Reply userName={comment.user.userName} commentId={comment._id} replyText={replyText} replyId={replyId} feedbackId={feedbackId} handleCommentInput={handleCommentInput} handleSubmitReply={handleSubmitReply} handleClickReply={handleClickReply} item ={item}/>
                ))}

            </div>

        </div>
    )
};

export default FullComment;
