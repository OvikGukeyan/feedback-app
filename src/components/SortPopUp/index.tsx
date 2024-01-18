import React, { useEffect, useRef, useState } from 'react';
import styles from './SortPopUp.module.scss';

const SortPopUp: React.FC = () => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const sortList = [
        { name: 'Most Upvotes', type: 'upvotes', order: 'desc' },
        { name: 'Least Upvotes', type: 'upvotes', order: 'asc' },
        { name: 'Most Comments', type: 'comments', order: 'desc' },
        { name: 'Least Comments', type: 'comments', order: 'asc' },
    ];

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
        <div ref={sortRef} className={styles.sort}>
            <p onClick={toggleVisiablePopup}>Sort by: <span>Most Upwotes</span>
                <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="#fff" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
            </p>

            {visiblePopup && <div className={styles.sortPopUp}>
                <ul>
                    {sortList.map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            </div>}
        </div>
    )
}

export default SortPopUp;