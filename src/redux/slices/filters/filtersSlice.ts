import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface FilterSliceState {
    category: string | null
    sortBy: string
    searchValue: string
    curentPage: number
}

const initialState: FilterSliceState = {
    category: null,
    sortBy: 'upvotes',
    searchValue: '',
    curentPage: 1
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

    }
});

export const selectFilters = (state:RootState) => state.filters
export default filterSlice.reducer;