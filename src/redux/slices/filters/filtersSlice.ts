import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type sortByType = {
    name: string
    type: string
    order: string
}

interface FilterSliceState {
    category: string | null
    sortBy: sortByType 
    searchValue: string
    curentFeedbackId: number | null
}

const initialState: FilterSliceState = {
    category: 'ALL',
    sortBy: { name: 'Most Upvotes', type: 'upvotes', order: 'desc' },
    searchValue: '',
    curentFeedbackId: 1
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurentFeedbackId: (state, action) => {
            state.curentFeedbackId = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    }
});

export const {setCurentFeedbackId, setCategory, setSortBy} = filterSlice.actions;
export const selectFilters = (state:RootState) => state.filters;
export default filterSlice.reducer;