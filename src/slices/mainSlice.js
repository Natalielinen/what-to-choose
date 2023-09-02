import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showConfirmDeleteModal: false,
    openEditModal: false
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
        }
    }

});

export const {setShowConfirmDeleteModal, setOpenEditModal} = MainSlice.actions;
export default MainSlice.reducer;
