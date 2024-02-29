import React, { ChangeEvent } from 'react';
import styles from './Comment.module.scss';

import { Button, Reply } from '..';
import { Comment } from '../../redux/slices/feedbacks/types';
import { useSelector } from 'react-redux';
import { selectFeedbacks } from '../../redux/slices/feedbacks/feedbacksSlice';
import { useAppDispatch } from '../../redux/store';
import { selectIsAuth } from '../../redux/slices/auth/authSlice';
import { removeComment, removeReply } from '../../redux/slices/feedbacks/utils';

type FullCommentType = {
    comment: Comment
    setReplyText: (text: string) => void
    setCurrentReplyId: (arg0: string) => void
    currentReplyId: string
    replyText: string
    handleSubmitReply: (feedbackId: string, commentId: string, replyingTo: string) => void
}

const FullComment: React.FC<FullCommentType> = ({ comment, setReplyText, setCurrentReplyId, currentReplyId, replyText, handleSubmitReply }) => {
    const { currentFeedback } = useSelector(selectFeedbacks);
    const feedbackId = currentFeedback?._id ? currentFeedback?._id : '';
    const dispatch = useAppDispatch();
    const { data } = useSelector(selectIsAuth);
    const isEditable = data?._id === comment.user._id;

    const handleCommentInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        if (newText.length <= 255) {
            setReplyText(event.target.value);
        }
    };

    const handleClickReply = (id: string) => {
        if (id !== currentReplyId) {
            setCurrentReplyId(id)
        } else {
            setCurrentReplyId('')
        }
    };

    const handleRemoveComment = () => {
        dispatch(removeComment(comment._id))
    }

    const handleRemoveReply = (replyId: string) => {
        dispatch(removeReply(replyId))
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
                {isEditable && <Button onClick={handleRemoveComment} className='delete_comment'>Delete</Button>}
                <Button onClick={() => handleClickReply(comment._id)} className='view_roadmap'>Reply</Button>
            </div>
            <div className={`${styles.content} ${styles.line}`}>
                <p className={styles.text}>{comment.content}</p>
                <div className={styles.box}>
                    <div className={currentReplyId === comment._id ? styles.reply_input : styles.hide}>
                        <textarea value={replyText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                        <Button disabled={replyText.length < 1} onClick={() => handleSubmitReply(feedbackId, comment._id, comment.user.userName)} className={'add_button'}>Post Reply</Button>
                    </div>
                </div>

                {comment.replies && comment.replies.map(item => (
                    <Reply
                        replyText={replyText}
                        currentReplyId={currentReplyId}
                        handleCommentInput={handleCommentInput}
                        handleSubmitReply={handleSubmitReply}
                        handleClickReply={handleClickReply}
                        item={item}
                        handleRemoveReply={handleRemoveReply} />
                ))}


            </div>

        </div>
    )
};

export default FullComment;
