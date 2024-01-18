import React from 'react';
import styles from './Comment.module.scss';
import { Button } from '..';

const Comment: React.FC = () => {
    return (
        <div className={styles.comment}>
            <div className={styles.comment_head}>
                <div className={styles.img}>
                    <img src="/assets/user-images/image-anne.jpg" alt="" />
                </div>
                <div className={styles.names}>
                    <h4>Ovik Hukieian</h4>
                    <p>@nvsvks</p>
                </div>
                <Button className='view_roadmap'>Reply</Button>
            </div>
            <div className={`${styles.content} ${styles.line}`}>
                <p className={styles.text}>Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.</p>
                <div className={`${styles.comment} ${styles.reply}`}>
                    <div className={styles.comment_head}>
                        <div className={styles.img}>
                            <img src="/assets/user-images/image-anne.jpg" alt="" />
                        </div>
                        <div className={styles.names}>
                            <h4>Ovik Hukieian</h4>
                            <p>@nvsvks</p>
                        </div>
                        <Button className='view_roadmap'>Reply</Button>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.text}> <span>@hdhhdhd</span>Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.</p>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Comment;
