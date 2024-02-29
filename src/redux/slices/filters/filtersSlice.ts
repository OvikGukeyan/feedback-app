import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterSliceState } from "./types";


const initialState: FilterSliceState = {
    filter: {
        category: 'category',
        status: null
    },
    sortBy: { name: 'Most Upvotes', type: 'upvotes', order: 'desc' },
    searchValue: '',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.filter.status = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    }
});

export const {setCategory, setSortBy} = filterSlice.actions;
export const selectFilters = (state:RootState) => state.filters;
export default filterSlice.reducer;