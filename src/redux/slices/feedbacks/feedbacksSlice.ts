import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async () => {
    const { data } = await axios.get('https://64fa17ff4098a7f2fc156145.mockapi.io/feedbacks');
    return data
})





type User = {
    image: string;
    name: string;
    username: string;
};

export type Comment = {
    id: number;
    content: string;
    user: User;
    replies?: Reply[];
};

type Reply = {
    content: string;
    replyingTo: string;
    user: User;
};

export type FeedbackItem = {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments?: Comment[];
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
            state.isLoading = true;
            state.loadingRejected = true;
        })
    }
});

export const selectFeedbacks = (state: RootState) => state.feedbacks
export default feedbacksSlice.reducer;