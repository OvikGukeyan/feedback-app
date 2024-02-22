import React, { ChangeEvent } from 'react';
import styles from './Comment.module.scss';
import { ReplyType } from '../../redux/slices/feedbacks/types';
import Button from '../Button';

type ReplyComponentType = {
    item: ReplyType
    handleClickReply: (id: string)=>void
    handleSubmitReply: (feedbackId: string, commentId: string, replyingTo: string) => void
    handleCommentInput: (event: ChangeEvent<HTMLTextAreaElement>) => void
    feedbackId: string
    replyId: string
    replyText: string
    commentId: string
    userName: string
}

const Reply: React.FC<ReplyComponentType> = ({userName, commentId, replyText, replyId, item, handleClickReply, handleSubmitReply, handleCommentInput, feedbackId}) => {
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
                <Button onClick={() => { }} className='delete_comment'>Delete</Button>
                <Button onClick={() => handleClickReply(item._id)} className='view_roadmap'>Reply</Button>
            </div>
            <div className={styles.content}>
                <div className={styles.text}>
                    <span>@{item.replyingTo}</span>
                    {item.content}
                    <div className={replyId === item._id ? styles.reply_input : styles.hide}>
                        <textarea value={replyText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                        <Button onClick={() => handleSubmitReply(feedbackId, commentId, userName)} className={'add_button'}>Post Reply</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Reply