import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { RootState } from "../../store";
import { sortByType } from "../filters/filtersSlice";
import { UserDataType } from "../auth/authSlice";

export type OptionsType = {
    sortBy: sortByType
    category: string | null
}

export const fetchFeedbacks = createAsyncThunk<FeedbackItem[], OptionsType>('feedbacks/fetchFeedbacks', async ({sortBy, category}) => {
    const { data } = await axios.get('/feedbacks');
    // const { data } = await axios.get(`https://64fa17ff4098a7f2fc156145.mockapi.io/feedbacks?sortBy=${sortBy.type}&order=${sortBy.order}&${category !== 'ALL' ? `category=${category}` : ''}`);
    return data
});









export type Comment = {
    id: number
    content: string
    user: UserDataType
    replies?: Reply[]
};

type Reply = {
    content: string
    replyingTo: string
    user: UserDataType
};

export type FeedbackItem = {
    _id: number
    title: string
    description: string
    upvotes: number
    category: string
    status: string
    user: UserDataType
    comments?: Comment[]
    createdAt: string
    updatedAt: string
    __v: number
};


interface FeedbacksSliceState {
    feedbacks: FeedbackItem[]
    isLoading: boolean
    loadingRejected: boolean
}

const initialState: FeedbacksSliceState = {
    feedbacks: [],
    isLoading: false,
    loadingRejected: false,
}

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFeedbacks.pending, (state) => {
            state.feedbacks = [];
            state.isLoading = true;
            state.loadingRejected = false;
        });
        builder.addCase(fetchFeedbacks.fulfilled, (state, action) => {
            state.feedbacks = action.payload;
            state.isLoading = false;
            state.loadingRejected = false;
        });
        builder.addCase(fetchFeedbacks.rejected, (state) => {
            state.feedbacks = [];
            state.isLoading = false;
            state.loadingRejected = true;
        })
    }
});

export const selectFeedbacks = (state: RootState) => state.feedbacks
export default feedbacksSlice.reducer;