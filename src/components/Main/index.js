import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Button, ButtonGroup, CircularProgress, IconButton, Tooltip } from '@mui/material';
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
import { setOpenAddModal, setOpenEditModal, setShowConfirmDeleteModal } from '../../slices/mainSlice';
import { useDispatch } from 'react-redux';
import UserBlock from '../UserBlock';
import AddModal from '../AddModal';
import DeleteModal from '../DeleteModal';
import EditModal from '../EditModal';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const Main = () => {

    const initialData = {
        current: 'Фильмы',
        choose: 'Посмотреть',
        isSelected: false,
        image: '',
        isSelecting: false,
        title: '',
        link: '',
        data: []
    };

    const dispatch = useDispatch();

    const [initialState, setInitialState] = useState(initialData);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [fbMovies, setFbMovies] = useState([]);

    const db = getFirestore();

    /* TODO: movies заменить на переменную, в которую по клику будет попадать название БД*/
    const colRef = collection(db, 'movies');

    useEffect(() => {

        getDocs(colRef)
            .then((snapshot) => {
                const movies = [];
                snapshot.docs.forEach(doc => {
                    movies.push({...doc.data(), id: doc.id});
                });

                setFbMovies(movies);

                const newState = {
                    ...initialData,
                    data: movies
                };

                setInitialState(newState);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    /** TODO: по клику на кнопку, должен идти запрос getDocs */
    const handleButtonClick = (text) => {

        const updatedState = {
            isSelected: false,
            image: '',
            title: '',
            link: '',
            current: text,
            choose: CHOICE_VERBS[text] || 'Посмотреть',
            data: text === 'Фильмы' ? fbMovies : ARRAYS[text]
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

    const handleOpenDeleteModal = (li) => {
        dispatch(setShowConfirmDeleteModal(true));

        setItemToDelete(li);
    };

    const handleOpenEditModal = li => {
        console.log(li);
        setItemToEdit(li);
        dispatch(setOpenEditModal(true));
    };

    return (
        <div className={styles.wrapper}>
            <FullList list={initialState.data} handleOpenDeleteModal={handleOpenDeleteModal}
                      handleOpenEditModal={handleOpenEditModal}/>
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
                        <IconButton onClick={() => dispatch(setOpenAddModal(true))}>
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

            <UserBlock/>

            <AddModal current={ADD[initialState.current]} setInitialState={setInitialState}/>

            <DeleteModal setInitialState={setInitialState} itemToDelete={itemToDelete}
                         current={ADD[initialState.current]}/>

            <EditModal setInitialState={setInitialState} itemToEdit={itemToEdit} current={ADD[initialState.current]}/>
        </div>
    );
};

export default Main;
