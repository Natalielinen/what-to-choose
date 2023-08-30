import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showConfirmDeleteModal: false
};

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setShowConfirmDeleteModal: (state, action) => {
            state.showConfirmDeleteModal = action.payload;
        }
    }

});

export const {setShowConfirmDeleteModal} = MainSlice.actions;
export default MainSlice.reducer;
