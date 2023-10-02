import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './style.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.settings}>

            <Stack spacing={2} width={500} className={styles.container}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography>Назад</Typography>
                </div>
                <h3>Настройки профиля</h3>
                <div className={styles.item}>
                    <TextField label="Изменить имя пользователя" type="text" variant="standard"
                               className={styles.textfield}/>
                    <Button variant="contained" className={styles.button}>OK</Button>
                </div>
                <div className={styles.item}>
                    <TextField label="Изменить email" type="text" variant="standard" className={styles.textfield}/>
                    <Button variant="contained" className={styles.button}>OK</Button>
                </div>
                <div className={styles.item}>
                    <TextField label="Изменить пароль" type="text" variant="standard" className={styles.textfield}/>
                    <Button variant="contained" className={styles.button}>OK</Button>
                </div>
            </Stack>
        </div>
    );
};

export default Settings;
