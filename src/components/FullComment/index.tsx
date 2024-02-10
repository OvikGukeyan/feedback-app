import React from 'react';
import styles from './Comment.module.scss';
import { Button } from '..';
import { Comment } from '../../redux/slices/feedbacks/feedbacksSlice';

type FullCommentType = {
    comment: Comment
}

const FullComment: React.FC<FullCommentType> = ({comment}) => {
    
    
    return (
        <div className={styles.comment}>
            <div className={styles.comment_head}>
                <div className={styles.img}>
                    <img src={comment.user?.avatarUrl} alt="" />
                </div>
                <div className={styles.names}>
                    <h4>{comment.user.fullName}</h4>
                    <p>@{comment.user.userName}</p>
                </div>
                <Button className='view_roadmap'>Reply</Button>
            </div>
            <div className={`${styles.content} ${styles.line}`}>
                <p className={styles.text}>{comment.content}</p>
                {comment.replies && comment.replies.map(item => (
                    <div className={`${styles.comment} ${styles.reply}`}>
                    <div className={styles.comment_head}>
                        <div className={styles.img}>
                            <img src={item.user.avatarUrl} alt="" />
                        </div>
                        <div className={styles.names}>
                            <h4>{item.user.fullName}</h4>
                            <p>@{item.user.userName}</p>
                        </div>
                        <Button className='view_roadmap'>Reply</Button>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.text}> <span>@{item.replyingTo}</span>{item.content}</p>

                    </div>

                </div>
                ))}
                
            </div>

        </div>
    )
}

export default FullComment;
