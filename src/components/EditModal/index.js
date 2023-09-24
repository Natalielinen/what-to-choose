import { setOpenEditModal } from '../../slices/mainSlice';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import styles from '../Main/style.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import EditForm from '../EditForm';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditModal = ({setInitialState, current, itemToEdit}) => {

    const {openEditModal} = useSelector(state => state.main);

    const dispatch = useDispatch();

    const handleCloseEditModal = () => {
        dispatch(setOpenEditModal(false));
    };

    return (
        <Dialog open={openEditModal} onClose={() => dispatch(setOpenEditModal(false))}>
            <DialogTitle className={styles.modalTitle}>
                Редактировать {current.toLowerCase()} {itemToEdit?.title}
                <IconButton onClick={() => dispatch(setOpenEditModal(false))}>
                    <ClearIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <EditForm
                    category={current.toLowerCase()}
                    handleCloseEditModal={handleCloseEditModal}
                    setInitialState={setInitialState}
                    item={itemToEdit}
                />
            </DialogContent>
        </Dialog>
    )
}

export default EditModal;
