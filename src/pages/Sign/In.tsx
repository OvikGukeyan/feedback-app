import React from 'react';
import styles from './Sign.module.scss';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchLogin, LoginParamsType, selectIsAuth } from '../../redux/slices/auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = Boolean(useSelector(selectIsAuth).data);
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: 'tjlkiklkkjkekkst@gmail.com',
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



    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/');
    };

    if (isAuth) {
        navigate('/')
    }

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleClickBack} className='go_back'>Go Back</Button>
            <div className={styles.sign}>
                <svg className={styles.logo} width="56" height="56" ><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stopColor="#E84D70" offset="0%" /><stop stopColor="#A337F6" offset="53.089%" /><stop stopColor="#28A7ED" offset="100%" /></radialGradient></defs><g fill="none" fillRule="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28" /><path fill="#FFF" fillRule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z" /></g></svg>
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
                            <button disabled = {!isValid} className={styles.submit} type='submit'>Submit</button>
                        </div>

                    </div>
                </form>


            </div>

        </div>
    )
}

export default SignIn;