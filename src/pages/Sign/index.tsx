import React from 'react';
import styles from './Sign.module.scss';
import { Button } from '../../components';
import { useNavigate } from 'react-router-dom';

const Sign = () => {
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleClickBack} className='go_back'>Go Back</Button>
            <div className={styles.sign}>
                <svg className={styles.logo} width="56" height="56" ><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stopColor="#E84D70" offset="0%" /><stop stopColor="#A337F6" offset="53.089%" /><stop stopColor="#28A7ED" offset="100%" /></radialGradient></defs><g fill="none" fillRule="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28" /><path fill="#FFF" fillRule="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z" /></g></svg>
                <h1>Sign - In</h1>
                <form action="">
                    <div className={styles.email}>
                        <label htmlFor="title">E-mail<span>Enter your e-mail</span></label>
                        <input type="text" name='title' />
                    </div>
                    <div className={styles.password}>
                        <label htmlFor="title">Password <span>Enter your password</span></label>
                        <input type="text" name='title' />
                    </div>
                </form>
                <div className={styles.buttons}>
                    <div className={styles.box}>
                        <Button className='sign_in'>Sign In</Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Sign;