import React from 'react';
import styles from '../RegisterPage/style.module.css';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const {register, handleSubmit, formState} = form;

    const {errors} = formState;

    const navigate = useNavigate();

    const onSubmit = data => {
        //TODO: Должна быть проверка существует ли такой пользователь  правильный ли пароль/email
        console.log(data);
        navigate('/');

    }

    const onRegisterButtonClick = () => {
        navigate("/register");
    }

    return (
        <div className={styles.registerPage}>
            <h3>Войти в аккаунт</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} width={500}>
                    <TextField
                        required
                        error={errors.email}
                        label="email"
                        type="email"
                        variant="standard"
                        {...register('email', {required: true})}
                    />

                    <TextField
                        required
                        error={errors.password}
                        label="Пароль"
                        type="password"
                        variant="standard"
                        {...register('password', {required: true})}
                    />

                    <Button type="submit" variant="contained">Войти</Button>
                </Stack>
            </form>
            <p>Еще не зарегистрированы?<Button variant="text" onClick={onRegisterButtonClick}>Регистрация</Button></p>
        </div>
    )
}

export default LoginPage;
