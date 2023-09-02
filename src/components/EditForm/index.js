import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const EditForm = ({ category, handleCloseEditModal, setInitialState, item}) => {

    const form = useForm({
        defaultValues: {
            title: item.title,
            imageLink: item.image,
            link: item.link
        }
    });

    const {register, handleSubmit} = form;

    const onSubmit = data => {

        const editedData = {
            title: data.title,
            link: data.link,
            image: data.imageLink
        }

        setInitialState(prev => ({
            ...prev,
            data: prev.data.map(prevItem => {
                if (prevItem.id === item.id) {
                    return { ...prevItem, ...editedData };
                }
                return prevItem;
            })
        }));

        handleCloseEditModal();
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

                <Button type="submit">Редактировать</Button>
            </Stack>
        </form>
    )
}

export default EditForm;
