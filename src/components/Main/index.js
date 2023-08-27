import React, { useState } from 'react';
import styles from './style.module.css';
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Modal,
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

    const [initialState, setInitialState] = useState(initialData);
    const [open, setOpen] = useState(false);

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

    return (
        <div className={styles.wrapper}>
            <FullList list={initialState.data}/>
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
                <DialogTitle>Добавить {ADD[initialState.current]}</DialogTitle>
                <DialogContent>
                    Content
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Main;
