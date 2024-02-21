import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { RootState } from "../../store";
import { Comment, FeedbackItem, FeedbacksSliceState, FetchFeedbacksOptionsType, PostCommentOptionsType, PostReplyOptionsType } from "./types";





export const fetchFeedbacks = createAsyncThunk<FeedbackItem[], FetchFeedbacksOptionsType>('feedbacks/fetchFeedbacks', async (options) => {
        const { data } = await axios.get(`/feedbacks?sortBy=${options.sortBy.type}&sortOrder=${options.sortBy.order}&${options.filter.status ? `category=${options.filter.category}&status=${options.filter.status}` : ''}`);
        return data;
    }
);

export const fetchOneFeedback = createAsyncThunk<FeedbackItem, string>('feedbacks/fetchOneFeedback', async (id) => {
    const { data } = await axios.get(`/feedbacks/${id}`);
    return data
});


export const postComment = createAsyncThunk<FeedbackItem, PostCommentOptionsType>('feedbacks/postComment', async ({ id, options }) => {
    const { data } = await axios.post(`/feedbacks/${id}/comments`, options);
    return data.updatedFeedback
});

export const postReply = createAsyncThunk<Comment, PostReplyOptionsType>('feedbacks/postReply', async ({ commentId, options }) => {
    const { data } = await axios.post(`/comments/${commentId}/replies`, options);
    return data.updatedComment
});


const initialState: FeedbacksSliceState = {
    feedbacks: [],
    currentFeedback: null,
    isLoading: false,
    loadingRejected: false,
}

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks.pending, (state) => {
                state.feedbacks = [];
                state.isLoading = true;
                state.loadingRejected = false;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                state.isLoading = false;
                state.loadingRejected = false;
            })
            .addCase(fetchFeedbacks.rejected, (state) => {
                state.feedbacks = [];
                state.isLoading = false;
                state.loadingRejected = true;
            })
            .addCase(postComment.pending, (state) => {
                state.isLoading = true;
                state.loadingRejected = false;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.currentFeedback = action.payload
            })
            .addCase(postComment.rejected, (state) => {
                state.feedbacks = [];
                state.isLoading = false;
                state.loadingRejected = true;
            })
            .addCase(fetchOneFeedback.pending, (state) => {
                state.currentFeedback = null;
                state.isLoading = true;
                state.loadingRejected = false;
            })
            .addCase(fetchOneFeedback.fulfilled, (state, action) => {
                state.currentFeedback = action.payload;
                state.isLoading = false;
                state.loadingRejected = false;
            })
            .addCase(fetchOneFeedback.rejected, (state) => {
                state.feedbacks = [];
                state.isLoading = false;
                state.loadingRejected = true;
            })
            .addCase(postReply.pending, (state) => {
                state.isLoading = true;
                state.loadingRejected = false;
            })
            .addCase(postReply.fulfilled, (state, action) => {
                if (state.currentFeedback?.comments?.length) {
                    const index = state.currentFeedback.comments?.findIndex((obj) => obj._id === action.payload._id);
                    state.currentFeedback.comments[index] = action.payload;
                }
                state.isLoading = false;
                state.loadingRejected = false;
            })
            .addCase(postReply.rejected, (state) => {
                state.feedbacks = [];
                state.isLoading = false;
                state.loadingRejected = true;
            })
    }
});

export const selectFeedbacks = (state: RootState) => state.feedbacks
export default feedbacksSlice.reducer;