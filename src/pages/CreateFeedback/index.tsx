import React, { useEffect } from 'react';
import styles from './CreateFeedback.module.scss';
import { Button, PopUp } from '../../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';





const CreateFeedback: React.FC = () => {
    const categorysList = [{ name: 'UI' }, { name: 'UX' }, { name: 'Enhancement' }, { name: 'Bug' }, { name: 'Feature' }];
    const statesList = [{ name: 'Suggestion' }, { name: 'Planned' }, { name: 'In Progress' }, { name: 'Live' }];
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id ? params.id : '';


    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch, trigger, control } = useForm({
        defaultValues: {
            title: '',
            category: 'UI',
            description: '',
            status: ''
        },
        mode: 'all'
    });

    useEffect(() => {
        if (id) {
            axios.get(`/feedbacks/${id}`)
                .then((res) => {
                    setValue('title', res.data.title);
                    setValue('category', res.data.category);
                    setValue('description', res.data.description);
                    setValue('status', res.data.status);
                    trigger();
                })
                .catch((error) => {
                    console.warn('Failed to fetch feedback:', error);
                })
        }
    }, [])

    const category = watch('category');
    const status = watch('status');


    const handleChooseCategory = (item: string) => {
        setValue('category', item)
    };

    const handleChooseState = (item: string) => {
        setValue('status', item)
    };

    const handleDelete = async (id: string) => {
        axios.delete(`/feedbacks/${id}`)
            .then((res) => {
                navigate('/')
            })
            .catch((error) => {
                console.warn(error)
                alert('Failed to delete feedback!')
            })
        navigate('/')

    }
    type ParamsType = {
        title: string;
        category: string;
        description: string;
        status: string;
    }


    const onSubmit = id ? async (params: ParamsType) => {
        await axios.patch(`/feedbacks/${id}`, params)
            .then((res) => {
                navigate(`/detail/${id}`)
            })
            .catch((error) => {
                console.warn(error)
                alert('Failed to edit!')
            })
    } :
        async (params: ParamsType) => {
            await axios.post('/feedbacks', params)
                .then((res) =>
                    navigate(`/detail/${res.data._id}`))
                .catch((error) => {
                    console.warn(error)
                    alert('Failed to create!')
                })
        };

    

    return (
        <div className={styles.wrapper}>
            <Link to={'/'}><Button className='go_back'>Go Back</Button></Link>
            <div className={styles.create_feedback}>
                {!id ?
                    <>
                        <svg className={styles.logo} width="56" height="56" ><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stopColor="#E84D70" offset="0%" /><stop stopColor="#A337F6" offset="53.089%" /><stop stopColor="#28A7ED" offset="100%" /></radialGradient></defs><g fill="none" fillRule="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28" /><path fill="#FFF" fillRule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z" /></g></svg>
                        <h1>Create New Feedback</h1>
                    </>
                    :
                    <>
                        <svg className={styles.logo} width="56" height="56"><g transform="matrix(1.4 0 0 1.4 28.094 27.906)"><radialGradient id="a" cx="1.039" cy="-0.104" r="1.668" fx="1.039" fy="-0.104" gradientUnits="objectBoundingBox"><stop offset="0%" stopColor="#e84d70"></stop><stop offset="53.089%" stopColor="#a337f6"></stop><stop offset="100%" stopColor="#28a7ed"></stop></radialGradient><path fill="url(#a)" d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20z" transform="translate(-20 -20)"></path></g><path fill="#fff" d="M27.41 21.42l6.966 6.342-5.32 7.756-13.246 4.988 6.28-5.74c1.062.385 2.563.036 3.375-.832a2.741 2.741 0 00-.18-3.948c-1.171-1.043-3.08-1.043-4.15.096-.798.85-1.074 2.346-.616 3.333l-5.025 6.69c.357-1.485.956-3.85 1.561-6.211l.192-.744c.921-3.588 1.802-6.95 1.802-6.95l8.362-4.78zm5.244-4.714l6.64 6.22-3.618 3.649-6.846-6.417 3.824-3.452z"></path></svg>
                        <h1>Editing: ‘Add a dark theme option’</h1>
                    </>
                }
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className={styles.feedback_title}>
                        <label htmlFor="title">Feedback Title <span className={errors.title && styles.instruction}>Add a short, descriptive headline</span></label>
                        <input className={errors.title && styles.input_error}  {...register('title', {
                            required: 'Enter title',
                        },)} />
                    </div>

                    <div className={styles.category}>
                        <h4>Category</h4>
                        <p className={errors.category && styles.instruction}>Choose a category for your feedback</p>
                        <PopUp
                            active={category}
                            handleChooseItem={handleChooseCategory}
                            list={categorysList}
                            className='category'
                        >
                            <span>{category}</span>
                        </PopUp>
                    </div>
                    {id &&
                        <div className={styles.category}>
                            <h4>Update Status</h4>
                            <p className={errors.status && styles.instruction}>Change feedback state</p>
                            <PopUp
                                active={status}
                                handleChooseItem={handleChooseState}
                                list={statesList}
                                className='category'
                            >

                                <span>{status}</span>
                            </PopUp>
                        </div>
                    }

                    <div className={styles.description}>
                        <label htmlFor="description">Feedback Detail <span className={errors.description && styles.instruction}>Include any specific comments on what should be improved, added, etc. At least five characters.</span></label>
                        <textarea className={errors.description && styles.input_error} {...register('description', {
                            required: 'Enter description',
                            minLength: 5,
                            maxLength: 255
                        },)} />
                    </div>
                    <div className={styles.buttons}>
                        {id &&
                            <Button onClick={() => handleDelete(id)} className='delete'>Delete</Button>
                        }

                        <div className={styles.box}>
                            <Button className='cancel'>Cancel</Button>
                            <button disabled={!isValid} className={styles.submit} type='submit'>Submit</button>
                        </div>

                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateFeedback;