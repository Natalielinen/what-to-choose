import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Main from '../components/Main';

describe('Main component', () => {
    it('should update state when button is clicked', () => {
        render(<Main />);

        const button = screen.getByText('Фильмы');

        fireEvent.click(button);

        expect(screen.getByText('Посмотреть')).toBeInTheDocument();
        expect(screen.getByText('Что Посмотреть?')).toBeInTheDocument();

    });
});
