import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip
} from '@mui/material';
import { movies } from '../../data/movies';
import { Add, Refresh } from '@mui/icons-material';
import {
    ADD,
    ARRAYS,
    CHOICE_VERBS,
    DELAY_MS,
    FILTER_BUTTONS,
    QUESTION_MARK_IMAGE,
    QUESTION_TEMPLATES
} from '../../resources/constants';
import FullList from '../List';
import {setShowConfirmDeleteModal} from '../../slices/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import AddForm from '../AddForm';

const Main = () => {

    const initialData = {
        current: 'Фильмы',
        choose: 'Посмотреть',
        isSelected: false,
        image: '',
        isSelecting: false,
        title: '',
        link: '',
        data: movies
    };

    const dispatch = useDispatch();

    const [initialState, setInitialState] = useState(initialData);
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const {showConfirmDeleteModal} = useSelector(state => state.main);

    const handleButtonClick = (text) => {
        const updatedState = {
            isSelected: false,
            image: '',
            title: '',
            link: '',
            current: text,
            choose: CHOICE_VERBS[text] || 'Посмотреть',
            data: ARRAYS[text]
        };

        setInitialState(prev => ({...prev, ...updatedState}));
    };

    const handleChoose = async (arr) => {
        setInitialState(prev => ({
            ...prev,
            isSelecting: true
        }));

        const randomIndex = Math.floor(Math.random() * arr.length);
        const item = arr[randomIndex];

        const updatedState = {
            isSelected: true,
            image: item.image,
            title: item.title,
            link: item.link
        };

        await new Promise(resolve => setTimeout(resolve, DELAY_MS));

        setInitialState(prev => ({
            ...prev,
            ...updatedState,
            isSelecting: false
        }));
    };

    const handleRefresh = () => {
        setInitialState(initialData);
    };

    const handleCloseDeleteModal = () => {
        dispatch(setShowConfirmDeleteModal(false));
    }

    const handleOpenDeleteModal = (li) => {
        dispatch(setShowConfirmDeleteModal(true));

        setItemToDelete(li);
    }

    const handleDeleteItem = () => {
        setInitialState(prev => ({
            ...prev,
            data: prev.data.filter(item => item.id !== itemToDelete.id)
        }));

        handleCloseDeleteModal();
    }


    console.log(initialState.data);

    return (
        <div className={styles.wrapper}>
            <FullList list={initialState.data} handleOpenDeleteModal={handleOpenDeleteModal}/>
            <div className={styles.mainContainer}>
                <div>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" color="primary">
                        {
                            FILTER_BUTTONS.map(fb => (
                                <Button
                                    key={fb}
                                    className={initialState.current === fb ? styles.current : null}
                                    onClick={() => handleButtonClick(fb)}
                                >
                                    {fb}
                                </Button>
                            ))
                        }
                    </ButtonGroup>
                </div>
                <h2>
                    {QUESTION_TEMPLATES[initialState.current] || QUESTION_TEMPLATES.default} {initialState.choose}?
                </h2>
                <div className={styles.card}>
                    {
                        initialState.isSelecting
                            ? <CircularProgress color="success"/>
                            : <>

                                <h3>{initialState.title}</h3>

                                <div>
                                    <img
                                        src={!initialState.isSelected ? QUESTION_MARK_IMAGE : initialState.image}
                                        alt=""
                                    />
                                </div>

                                <p className={styles.link}>
                                    <Button
                                        href={initialState.link}
                                        target="_blank"
                                        disabled={!initialState.link}
                                    >
                                        {initialState.choose}
                                    </Button>
                                </p>
                            </>
                    }
                </div>
                <div className={styles.button}>
                    <Tooltip title={`Добавить ${ADD[initialState.current]}`}>
                        <IconButton onClick={() => setOpen(true)}>
                            <Add/>
                        </IconButton>
                    </Tooltip>
                    <Button color="success" variant="contained" onClick={() => handleChoose(initialState.data)}>Нажми
                        Меня!</Button>
                    <IconButton aria-label="refresh" onClick={handleRefresh}>
                        <Refresh/>
                    </IconButton>
                </div>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle className={styles.modalTitle}>
                    Добавить {ADD[initialState.current]}
                    <IconButton onClick={() => setOpen(false)}>
                        <ClearIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <AddForm category={ADD[initialState.current].toLowerCase()} setOpen={setOpen} setInitialState={setInitialState}/>
                </DialogContent>
            </Dialog>

            <Dialog open={showConfirmDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle className={styles.modalTitle}>
                    <div>Удалить?</div>
                    <IconButton onClick={handleCloseDeleteModal}>
                        <ClearIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    Вы действительно хотите удалить {ADD[initialState.current].toLowerCase()} <b>{itemToDelete?.title}</b> ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteItem}>Удалить</Button>
                    <Button onClick={handleCloseDeleteModal}>Отменить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Main;
