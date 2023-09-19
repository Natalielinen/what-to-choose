import React from 'react';
import styles from '../RegisterPage/style.module.css';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const PasswordRecoveryPage = () => {

    const form = useForm({
        defaultValues: {
            email: ''
        }
    });

    const {register, handleSubmit, formState} = form;

    const {errors} = formState;

    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        navigate('/linkSent');
    }

    const onGoBack = () => {
        navigate("/login");
    }

    return (
        <div className={styles.registerPage}>
            <h3>Восстановить пароль</h3>
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

                    <Button type="submit" variant="contained">Отправить ссылку</Button>
                </Stack>
            </form>
            <p><Button variant="text" onClick={onGoBack}>Вернуться</Button></p>
        </div>
    )
}

export default PasswordRecoveryPage;
