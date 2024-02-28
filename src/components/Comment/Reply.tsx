import React, { ChangeEvent } from 'react';
import styles from './Comment.module.scss';
import { ReplyType } from '../../redux/slices/feedbacks/types';
import Button from '../Button';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth/authSlice';

type ReplyComponentType = {
    item: ReplyType
    handleClickReply: (id: string)=>void
    handleSubmitReply: (feedbackId: string, commentId: string, replyingTo: string) => void
    handleCommentInput: (event: ChangeEvent<HTMLTextAreaElement>) => void
    currentReplyId: string
    replyText: string
    handleRemoveReply: (replyId: string) => void
}

const Reply: React.FC<ReplyComponentType> = ({handleRemoveReply, replyText, currentReplyId, item, handleClickReply, handleSubmitReply, handleCommentInput}) => {
    const {data} = useSelector(selectIsAuth)
    const isEditable = data?._id === item.user._id
    
    
    return (
        <div className={`${styles.comment} ${styles.reply}`}>
            <div className={styles.comment_head}>
                <div className={styles.img}>
                    <img src={`http://localhost:4444${item.user.avatarUrl}`} alt="" />
                </div>
                <div className={styles.names}>
                    <h4>{item.user.fullName}</h4>
                    <p>@{item.user.userName}</p>
                </div>
                {isEditable && <Button onClick={() => handleRemoveReply(item._id)} className='delete_comment'>Delete</Button>}
                <Button onClick={() => handleClickReply(item._id)} className='view_roadmap'>Reply</Button>
            </div>
            <div className={styles.content}>
                <div className={styles.text}>
                    <span>@{item.replyingTo}</span>
                    <p></p>{item.content}<p/>
                    <div className={currentReplyId === item._id ? styles.reply_input : styles.hide}>
                        <textarea value={replyText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                        <Button disabled={replyText.length < 1} onClick={() => handleSubmitReply(item.feedbackId, item.commentId, item.user.userName)} className={'add_button'}>Post Reply</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Reply