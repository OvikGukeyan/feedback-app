import React, { Children, useEffect, useRef, useState } from 'react';
import styles from './PopUp.module.scss';

type PopUpTypes = {
    children: any
    className: string
    list: {
        name: string;
        type: string;
        order: string;
    }[] | {name: string}[]
    handleChooseItem: (item: string)=>void
    active:string
}
const PopUp: React.FC<PopUpTypes> = ({ children, className, list, handleChooseItem, active }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    

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
        <div ref={sortRef} className={styles.head}>
            <div className={styles[className]} onClick={toggleVisiablePopup}>
                {children}
                {
                    visiblePopup ?
                        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke-width="2" fill="none" fill-rule="evenodd" /></svg> :
                        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
                }
                {visiblePopup && <div className={styles.pop_Up}>
                    <ul>
                        {list.map((item) => (
                            <li className={active === item.name ? styles.active : ''} onClick={()=>handleChooseItem(item.name)}>{item.name}</li>
                        ))}
                    </ul>
                </div>}
            </div>

        </div>
    )
}

export default PopUp;