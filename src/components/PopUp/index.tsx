import React, { useEffect, useRef, useState } from 'react';
import styles from './PopUp.module.scss';

type PopUpTypes = {
    children: any
    className: string
    list: {
        name: string;
        type: string;
        order: string;
    }[] | { name: string }[]
    handleChooseItem: (item: string) => void
    active: string
}
const PopUp: React.FC<PopUpTypes> = ({ children, className, list, handleChooseItem, active }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const sortRef = useRef<HTMLUListElement>(null);


    const handleOutsideClick = (e: MouseEvent) => {
        if (sortRef.current) {
            if (!sortRef.current.contains(e.target as Node)) {
                setVisiblePopup(false);
            }
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
        return () => document.body.removeEventListener('click', handleOutsideClick)
    }, [])

    const toggleVisiablePopup = () => {
        setVisiblePopup(!visiblePopup)
    }
    return (
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <div className={styles[className]} onClick={toggleVisiablePopup}>
                {children}
                {
                    visiblePopup ?
                        <svg width="10" height="7">
                            <path fill="none" d="M1 6l4-4 4 4"></path>
                        </svg> :
                        <svg width="10" height="7">
                            <path fill="none" d="M1 1l4 4 4-4"></path>
                        </svg>
                }
                {visiblePopup && <div className={styles.pop_Up}>
                    <ul ref={sortRef}>
                        {list.map((item) => (
                            <li key={item.name} className={active === item.name ? styles.active : ''} onClick={() => handleChooseItem(item.name)}>{item.name}</li>
                        ))}
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default PopUp;