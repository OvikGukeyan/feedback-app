import React from 'react';
import styles from './Button.module.scss';

type ButtonType = {
  children: any
  className: string
}

const Button: React.FC<ButtonType> = ({ children, className }) => {
  return (
    <div className={`${styles.button} ${styles[className]}`}>
      {children}
    </div>
  )
}

export default Button;