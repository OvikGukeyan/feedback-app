import React, { ChangeEvent, useState } from 'react';
import styles from './Comment.module.scss';

import { Button } from '..';
import { Comment } from '../../redux/slices/feedbacks/types';

type FullCommentType = {
    comment: Comment
    setReplyText: (text: string) => void
    setReplyId: (arg0: string) => void
    replyId: string
    replyText: string
    handleSubmitReply: (id: string, replyingTo: string) => void
}

const FullComment: React.FC<FullCommentType> = ({ comment, setReplyText, setReplyId, replyId, replyText, handleSubmitReply }) => {


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
                <Button onClick={() => handleClickReply(comment._id)} className='view_roadmap'>Reply</Button>
            </div>
            <div className={`${styles.content} ${styles.line}`}>
                <p className={styles.text}>{comment.content}</p>
                <div className={replyId === comment._id ? styles.reply_input : styles.hide}>
                    <textarea value={replyText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                    <Button onClick={() => handleSubmitReply(comment._id, comment.user.userName)} className={'add_button'}>Post Reply</Button>
                </div>
                {comment.replies && comment.replies.map(item => (
                    <div className={`${styles.comment} ${styles.reply}`}>
                        <div className={styles.comment_head}>
                            <div className={styles.img}>
                                <img src={`http://localhost:4444${item.user.avatarUrl}`} alt="" />
                            </div>
                            <div className={styles.names}>
                                <h4>{item.user.fullName}</h4>
                                <p>@{item.user.userName}</p>
                            </div>
                            <Button onClick={() => handleClickReply(item._id)} className='view_roadmap'>Reply</Button>
                        </div>
                        <div className={styles.content}>
                            <p className={styles.text}>
                                <span>@{item.replyingTo}</span>
                                {item.content}
                                <div className={replyId === item._id ? styles.reply_input : styles.hide}>
                                    <textarea value={replyText} onChange={(e) => { handleCommentInput(e) }} placeholder='Type your comment here' />
                                    <Button onClick={() => handleSubmitReply(comment._id, comment.user.userName)} className={'add_button'}>Post Reply</Button>
                                </div>
                            </p>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
};

export default FullComment;
