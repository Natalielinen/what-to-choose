import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showConfirmDeleteModal: false,
    openEditModal: false,
    openAddModal: false,
    movies: []
};

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setShowConfirmDeleteModal: (state, action) => {
            state.showConfirmDeleteModal = action.payload;
        },
        setOpenEditModal: (state, action) => {
            state.openEditModal = action.payload;
        },
        setOpenAddModal: (state, action) => {
            state.openAddModal = action.payload;
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
        }
    }

});

export const {setShowConfirmDeleteModal, setOpenEditModal, setOpenAddModal, setMovies} = MainSlice.actions;
export default MainSlice.reducer;
