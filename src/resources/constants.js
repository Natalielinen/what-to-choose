import { movies } from '../data/movies';
import { food } from '../data/food';
import { games } from '../data/games';

export const DELAY_MS = 3000;

export const QUESTION_MARK_IMAGE = 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-19.jpg';

export const CHOICE_VERBS = {
    'Фильмы': 'Посмотреть',
    'Музыка': 'Послушать',
    'Книги': 'Почитать',
    'Еда': 'Поесть',
    'Игры': 'Поиграть',
};

export const QUESTION_TEMPLATES = {
    'Игры': 'Во Что',
    default: 'Что',
};

export const ARRAYS = {
    'Фильмы': movies,
    'Музыка': [],
    'Книги': [],
    'Еда': food,
    'Игры': games,
};

export const FILTER_BUTTONS = [
    'Фильмы',
    'Музыка',
    'Книги',
    'Еда',
    'Игры'
];

export const ADD = {
    'Фильмы': 'Фильм',
    'Музыка': 'Музыку',
    'Книги': 'Книгу',
    'Еда': 'Еду',
    'Игры': 'Игру',
};
