import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface FilterSliceState {
    category: string | null
    sortBy: string
    searchValue: string
    curentFeedbackId: number | null
}

const initialState: FilterSliceState = {
    category: null,
    sortBy: 'upvotes',
    searchValue: '',
    curentFeedbackId: 1
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCurentFeedbackId: (state, action) => {
            state.curentFeedbackId = action.payload
        }
    }
});

export const {setCurentFeedbackId} = filterSlice.actions;
export const selectFilters = (state:RootState) => state.filters;
export default filterSlice.reducer;