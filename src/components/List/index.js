import React from 'react';
import styles from './style.module.css';

const List = ({list}) => {
    return (

            <ul className={styles.list}>
                {
                    list.map(item => {
                        return <li key={item.id}>{item.title}</li>;
                    })
                }
            </ul>
    )
}

export default List;
