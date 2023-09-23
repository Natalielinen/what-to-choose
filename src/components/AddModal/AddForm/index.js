import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const AddForm = ({category, closeModal, setInitialState}) => {

    const form = useForm({
        defaultValues: {
            title: '',
            imageLink: '',
            link: ''
        }
    });

    const {register, handleSubmit} = form;

    const onSubmit = data => {
        console.log(data);
        closeModal();

        const newItem = {
            id: Math.random() * 10000 ,
            title: data.title,
            link: data.link,
            image: data.imageLink

        }

        setInitialState(prev => ({
            ...prev,
            data: [...prev.data, newItem]
        }));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={500}>
                <TextField
                    label="Название"
                    type="text"
                    placeholder="Например, Царь горы"
                    variant="standard"
                    {...register('title')}
                />
                <TextField
                    label="Ссылка на изображение"
                    type="text"
                    placeholder="https://photo.jpeg"
                    variant="standard"
                    {...register('imageLink')}
                />

                <TextField
                    label={`Ссылка на ${category}`}
                    type="text"
                    placeholder="https://exammple.com"
                    variant="standard"
                    {...register('link')}
                />

                <Button type="submit">Отправить</Button>
            </Stack>
        </form>
    )
}

export default AddForm;
