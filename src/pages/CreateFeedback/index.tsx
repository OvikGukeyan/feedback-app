import React, { useState } from 'react';
import styles from './CreateFeedback.module.scss';
import { Button, PopUp } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateFeedback: React.FC = () => {
    const categorysList = [{ name: 'ALL' }, { name: 'UI' }, { name: 'UX' }, { name: 'Enhancement' }, { name: 'Bug' }, { name: 'Feature' }];
    const statesList = [{ name: 'Suggestion' }, { name: 'Planned' }, { name: 'In-Progress' }, { name: 'Live' }];
    const [featureState, setFeatureState] = useState('Planned');
    const [category, setCategory] = useState('ALL');


    const navigate = useNavigate();
    const location = useLocation()

    const handleClickBack = () => {
        navigate('/');
    };

    const handleChooseCategory = (item: string) => {
        setCategory(item)
    };

    const handleChooseState = (item: string) => {
        setFeatureState(item)
    }

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleClickBack} className='go_back'>Go Back</Button>
            <div className={styles.create_feedback}>
                {location.pathname === '/create' ?
                    <>
                        <svg className={styles.logo} width="56" height="56" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stop-color="#E84D70" offset="0%" /><stop stop-color="#A337F6" offset="53.089%" /><stop stop-color="#28A7ED" offset="100%" /></radialGradient></defs><g fill="none" fill-rule="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28" /><path fill="#FFF" fill-rule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z" /></g></svg>
                        <h1>Create New Feedback</h1>
                    </>
                    :
                    <>
                        <svg className={styles.logo} xmlns="http://www.w3.org/2000/svg" width="56" height="56"><g transform="matrix(1.4 0 0 1.4 28.094 27.906)"><radialGradient id="a" cx="1.039" cy="-0.104" r="1.668" fx="1.039" fy="-0.104" gradientUnits="objectBoundingBox"><stop offset="0%" stopColor="#e84d70"></stop><stop offset="53.089%" stopColor="#a337f6"></stop><stop offset="100%" stopColor="#28a7ed"></stop></radialGradient><path fill="url(#a)" d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20z" transform="translate(-20 -20)"></path></g><path fill="#fff" d="M27.41 21.42l6.966 6.342-5.32 7.756-13.246 4.988 6.28-5.74c1.062.385 2.563.036 3.375-.832a2.741 2.741 0 00-.18-3.948c-1.171-1.043-3.08-1.043-4.15.096-.798.85-1.074 2.346-.616 3.333l-5.025 6.69c.357-1.485.956-3.85 1.561-6.211l.192-.744c.921-3.588 1.802-6.95 1.802-6.95l8.362-4.78zm5.244-4.714l6.64 6.22-3.618 3.649-6.846-6.417 3.824-3.452z"></path></svg>
                        <h1>Editing ‘Add a dark theme option’</h1>
                    </>
                }


                <form action="">
                    <div className={styles.feedback_title}>
                        <label htmlFor="title">Feedback Title <span>Add a short, descriptive headline</span></label>
                        <input type="text" name='title' />
                    </div>

                    <div className={styles.category}>
                        <h4>Category</h4>
                        <p>Choose a category for your feedback</p>
                        <PopUp active={category} handleChooseItem={handleChooseCategory} list={categorysList} className='category'>
                            <span>{category}</span>
                        </PopUp>
                    </div>
                    {location.pathname === '/edit' &&
                        <div className={styles.category}>
                            <h4>Update Status</h4>
                            <p>Change feedback state</p>
                            <PopUp active={featureState} handleChooseItem={handleChooseState} list={statesList} className='category'>
                                <span>{featureState}</span>
                            </PopUp>
                        </div>
                    }
                    <div className={styles.detail}>
                        <label htmlFor="detail">Feedback Detail <span>Include any specific comments on what should be improved, added, etc.</span></label>
                        <textarea name="detail"></textarea>
                    </div>
                </form>
                <div className={styles.buttons}>
                    {location.pathname === '/edit' &&
                        <Button className='delete'>Delete</Button>
                    }

                    <div className={styles.box}>
                        <Button className='cancel'>Cancel</Button>
                        <Button className='add_button'>Add Feedback</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateFeedback;