import { configureStore } from "@reduxjs/toolkit";
import filters from './slices/filters/filtersSlice';
import feedbacks from './slices/feedbacks/feedbacksSlice';
import auth from './slices/auth/authSlice'
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        filters,
        feedbacks,
        auth
    }
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch ;

export type RootState = ReturnType<typeof store.getState>;
export default store;