import React from 'react';
import styles from './Button.module.scss';

type ButtonType = {
  children: any
  className: string
  onClick?: ()=>void 
  active?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonType> = ({active, children, className, onClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`${styles.button} ${styles[className]} ${active ? styles.active : ''}`}>
      {children}
    </button>
  )
}

export default Button;