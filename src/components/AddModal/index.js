import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import styles from '../Main/style.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import AddForm from './AddForm';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenAddModal } from '../../slices/mainSlice';

const AddModal = ({current, setInitialState}) => {

    const {openAddModal} = useSelector(state => state.main);

    const dispatch = useDispatch();

    const handleCloseAddModal = () => {
        dispatch(setOpenAddModal(false))
    }

    return (
        <Dialog open={openAddModal} onClose={handleCloseAddModal}>
            <DialogTitle className={styles.modalTitle}>
                Добавить {current}
                <IconButton onClick={handleCloseAddModal}>
                    <ClearIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <AddForm category={current.toLowerCase()} setInitialState={setInitialState} closeModal={handleCloseAddModal}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddModal;
