import React from 'react';
import styles from './CreateFeedback.module.scss';
import { Button, PopUp } from '../../components';

const CreateFeedback: React.FC = () => {
    const categorysList = [{ name: 'ALL' }, { name: 'UI' }, { name: 'UX' }, { name: 'Enhancement' }, { name: 'Bug' }, { name: 'Feature' }];


    return (
        <div className={styles.wrapper}>
            <Button className='go_back'>Go Back</Button>
            <div className={styles.create_feedback}>
                <svg className={styles.logo} width="56" height="56" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stop-color="#E84D70" offset="0%" /><stop stop-color="#A337F6" offset="53.089%" /><stop stop-color="#28A7ED" offset="100%" /></radialGradient></defs><g fill="none" fill-rule="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28" /><path fill="#FFF" fill-rule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z" /></g></svg>
                <h1>Create New Feedback</h1>

                <form action="">
                    <div className={styles.feedback_title}>
                        <label htmlFor="title">Feedback Title <span>Add a short, descriptive headline</span></label>
                        <input type="text" name='title' />
                    </div>

                    <div className={styles.category}>
                        <h4>Category</h4>
                        <p>Choose a category for your feedback</p>
                        <PopUp list={categorysList} className='category'>
                            <span>Feature</span>
                        </PopUp>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFeedback;