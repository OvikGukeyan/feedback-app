import React from 'react';
import styles from './Sign.module.scss';
import { Button } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchLogin, LoginParamsType, selectIsAuth } from '../../redux/slices/auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = Boolean(useSelector(selectIsAuth).data);
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: 'test@gmail.com',
            password: '12345'
        },
        mode: 'onBlur'
    });



    type FetchLoginResponse = {
        payload?: {
            token: string
        }
    }

    const onSubmit = async (values: LoginParamsType) => {
        const data = await dispatch(fetchLogin(values)) as FetchLoginResponse;
        if (data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    };






    if (isAuth) {
        navigate('/')
    }

    return (
        <div className={styles.wrapper}>
            <Link to={'/'}><Button className='go_back'>Go Back</Button></Link>
            <div className={styles.sign}>
                <svg className={styles.logo} width="56" height="56">
                    <defs>
                        <radialGradient
                            id="a"
                            cx="103.9%"
                            cy="-10.387%"
                            r="166.816%"
                            fx="103.9%"
                            fy="-10.387%"
                        >
                            <stop offset="0%"></stop>
                            <stop offset="53.089%"></stop>
                            <stop offset="100%"></stop>
                        </radialGradient>
                    </defs>
                    <g fill="none">
                        <circle cx="28" cy="28" r="28" fill="url(#a)"></circle>
                        <path
                            fill="#FFF"
                            d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
                        ></path>
                    </g>
                </svg>
                <h1>Sign - In</h1>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className={styles.email}>
                        <label htmlFor="email">E-mail
                            <div>
                                <span className={styles.placeholder}>Enter your email</span>
                                <span className={styles.error}>{errors.email?.message}</span>
                            </div>
                        </label>
                        <input className={errors.email && styles.input_error} {...register('email', {
                            required: 'Enter your email',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Wrong email format!'
                            }
                        },)} type="text" name='email' />
                    </div>
                    <div className={styles.password}>
                        <label htmlFor="password">Password
                            <div>
                                <span className={styles.placeholder}>Enter your password</span>
                                <span className={styles.error}>{errors.password?.message}</span>
                            </div>
                        </label>
                        <input className={errors.password && styles.input_error} {...register('password', {
                            required: 'Enter your password',
                            pattern: {
                                value: /^.{5,}$/,
                                message: 'Wrong password format!'
                            }
                        })} type="text" name='password' />
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.box}>
                            <button disabled={!isValid} className={styles.submit} type='submit'>Submit</button>
                        </div>

                    </div>
                </form>


            </div>

        </div>
    )
}

export default SignIn;