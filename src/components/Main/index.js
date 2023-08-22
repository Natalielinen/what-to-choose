import React, { useState } from 'react';
import styles from './style.module.css';
import { Button, ButtonGroup, CircularProgress, IconButton } from '@mui/material';
import { movies } from '../../data/movies';
import { Refresh } from '@mui/icons-material';
import { food } from '../../data/food';
import { games } from '../../data/games';

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

    const filterButtons = [
        'Фильмы',
        'Музыка',
        'Книги',
        'Еда',
        'Игры'
    ];

    const handleButtonClick = (text) => {
        switch (text) {
            case 'Фильмы':
                setInitialState(prev => ({
                    ...prev,
                    choose: 'Посмотреть',
                    data: movies
                }));
                break;
            case 'Музыка':
                setInitialState(prev => ({
                    ...prev,
                    choose: 'Послушать'
                }));
                break;
            case 'Книги':
                setInitialState(prev => ({
                    ...prev,
                    choose: 'Почитать'
                }));
                break;
            case 'Еда':
                setInitialState(prev => ({
                    ...prev,
                    choose: 'Поесть',
                    data: food
                }));
                break;
            case 'Игры':
                setInitialState(prev => ({
                    ...prev,
                    choose: 'Поиграть',
                    data: games
                }));
                break;
            default:
                setInitialState(prev => ({
                    ...prev,
                    choose: 'Посмотреть'
                }));
                break;
        }

        setInitialState(prev => ({
            ...prev,
            isSelected: false,
            image: '',
            title: '',
            link: '',
            current: text
        }));
    };

    const handleChoose = (arr) => {
        setInitialState(prev => ({
            ...prev,
            isSelecting: true
        }));
        const randomIndex = Math.floor(Math.random() * arr.length);

        const item = arr[randomIndex];

        setInitialState(prev => ({
            ...prev,
            isSelected: true,
            image: item.image,
            title: item.title,
            link: item.link
        }));

        setTimeout(() => {
            setInitialState(prev => ({
                ...prev,
                isSelecting: false
            }));
        }, 3000);
    };

    const handleRefresh = () => {
        setInitialState(initialData);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.buttons}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" color="primary">
                    {
                        filterButtons.map(fb => (
                            <Button
                                className={initialState.current === fb ? styles.current : null}
                                onClick={() => handleButtonClick(fb)}
                            >
                                {fb}
                            </Button>
                        ))
                    }
                </ButtonGroup>
            </div>
            <h2 className={styles.header}>
                Что {initialState.choose}?
            </h2>
            <div className={styles.card}>
                {
                    initialState.isSelecting
                        ? <CircularProgress color="success"/>
                        : <>

                            <h3>{initialState.title}</h3>

                            <div>
                                <img
                                    src={!initialState.isSelected ? 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-19.jpg' : initialState.image}
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
                <Button color="success" variant="contained" onClick={() => handleChoose(initialState.data)}>Нажми Меня!</Button>
                <IconButton aria-label="refresh" onClick={handleRefresh}>
                    <Refresh/>
                </IconButton>
            </div>
        </div>
    );
};

export default Main;
