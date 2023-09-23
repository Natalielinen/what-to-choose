import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showConfirmDeleteModal: false,
    openEditModal: false,
    openAddModal: false
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
        }
    }

});

export const {setShowConfirmDeleteModal, setOpenEditModal, setOpenAddModal} = MainSlice.actions;
export default MainSlice.reducer;
