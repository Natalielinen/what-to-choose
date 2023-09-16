import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useForm } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';

const RegisterPage = () => {

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    });

    const {register, handleSubmit, formState, setError} = form;

    const {errors} = formState;

    const passwordsCompare = form.getValues('password') !== form.getValues('password2');

    const onSubmit = data => {
       if (data.password !== data.password2) {
           setError("password2", {
               type: "manual",
               message: "Пароли не совпадают",
           })
           return;
       }

        console.log(data);

    }

    return (
        <div className={styles.registerPage}>
            <h3>Регистрация нового пользователя</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} width={500}>
                    <TextField
                        required
                        error={errors.name}
                        label="Имя"
                        type="text"
                        variant="standard"
                        {...register('name', {required: true})}
                    />
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
                        {...register('password', {required: true,})}
                    />

                    <TextField
                        required
                        error={errors.password2 || passwordsCompare}
                        helperText={passwordsCompare ? "Пароли не совпадают" : ''}
                        label="Повторите пароль"
                        type="password"
                        variant="standard"
                        {...register('password2', {required: true})}
                    />

                    <Button type="submit" variant="contained">Зарегистрироваться</Button>
                </Stack>
            </form>
        </div>
    )
}

export default RegisterPage;
