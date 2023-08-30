import React from 'react';
import styles from './style.module.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const List = ({list, handleOpenDeleteModal}) => {

    return (
        <ul className={styles.list}>
            {
                list.map(item => {
                    return <li key={item.id} className={styles.listItem}>
                        <div>{item.title}</div>
                        <div>
                            <IconButton><EditIcon/></IconButton>
                            <IconButton onClick={() => handleOpenDeleteModal(item)}><DeleteForeverIcon/></IconButton>
                        </div>
                    </li>;
                })
            }
        </ul>
    );
};

export default List;
