import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type SortByType = {
    name: string
    type: string
    order: string
}

interface FilterSliceState {
    category: string | null
    sortBy: SortByType 
    searchValue: string
}

const initialState: FilterSliceState = {
    category: 'ALL',
    sortBy: { name: 'Most Upvotes', type: 'upvotes', order: 'desc' },
    searchValue: '',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    }
});

export const {setCategory, setSortBy} = filterSlice.actions;
export const selectFilters = (state:RootState) => state.filters;
export default filterSlice.reducer;