import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import styles from '../Main/style.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowConfirmDeleteModal } from '../../slices/mainSlice';

const DeleteModal = ({setInitialState, itemToDelete, current}) => {

    const {showConfirmDeleteModal} = useSelector(state => state.main);

    const dispatch = useDispatch();

    const handleCloseDeleteModal = () => {
        dispatch(setShowConfirmDeleteModal(false));
    };

    const handleDeleteItem = () => {
        setInitialState(prev => ({
            ...prev,
            data: prev.data.filter(item => item.id !== itemToDelete.id)
        }));

        handleCloseDeleteModal();
    };

    return (
        <Dialog open={showConfirmDeleteModal} onClose={handleCloseDeleteModal}>
            <DialogTitle className={styles.modalTitle}>
                <div>Удалить?</div>
                <IconButton onClick={handleCloseDeleteModal}>
                    <ClearIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                Вы действительно хотите удалить {current.toLowerCase()}
                {" "}
                <b>{itemToDelete?.title}</b> ?
            </DialogContent>

            <DialogActions>
                <Button onClick={handleDeleteItem}>Удалить</Button>
                <Button onClick={handleCloseDeleteModal}>Отменить</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteModal;
