import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LinkSentPage = () => {

    const [remainingTime, setRemainingTime] = useState(15);

    const navigate = useNavigate();

    useEffect(() => {
        // Создаем интервал, который каждую секунду уменьшает remainingTime на 1
        const intervalId = setInterval(() => {
            if (remainingTime === 0) {
                clearInterval(intervalId); // Останавливаем интервал, когда время истекло
                navigate("/login"); // Перенаправляем пользователя на страницу авторизации
            } else {
                setRemainingTime((prevTime) => prevTime - 1); // Уменьшаем remainingTime на 1
            }
        }, 1000); // 1000 миллисекунд = 1 секунда

        // Очищаем интервал, когда компонент размонтируется
        return () => clearInterval(intervalId);
    }, [navigate, remainingTime]);

    return (
        <div className={styles.linkSentPage}>
            <Stack spacing={2} width={700}>
                <p>На указанный адрес была отправлена ссылка для восстановления пароля</p>
                <p>Вы будете перенаправлены на страницу авторизации через {remainingTime} секунд</p>
            </Stack>
        </div>
    )
}

export default LinkSentPage;
