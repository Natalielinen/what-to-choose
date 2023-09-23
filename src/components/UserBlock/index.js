import styles from '../Main/style.module.css';
import user from '../../assets/images/userDefault.png';
import React from 'react';

const UserBlock = () => {
    return (
        <div className={styles.userBlock}>
            <div className={styles.avatarContainer}>
                <img src={user} alt="user"/>
            </div>
        </div>
    )
}

export default UserBlock;
