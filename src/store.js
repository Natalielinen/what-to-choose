import { configureStore } from '@reduxjs/toolkit'
import MainSlice from './slices/mainSlice';

export const store = configureStore({
    reducer: {
        main: MainSlice
    },
})
