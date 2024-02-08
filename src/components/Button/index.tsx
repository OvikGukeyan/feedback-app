import React from 'react';
import styles from './Button.module.scss';
import { UseFormHandleSubmit } from 'react-hook-form';

type ButtonType = {
  children: any
  className: string
  onClick?: ()=>void 
}

const Button: React.FC<ButtonType> = ({ children, className, onClick }) => {
  return (
    <div onClick={onClick} className={`${styles.button} ${styles[className]}`}>
      {children}
    </div>
  )
}

export default Button;