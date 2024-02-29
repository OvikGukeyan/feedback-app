import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { FeedbackItem, FetchFeedbacksOptionsType, PostCommentOptionsType, PostReplyOptionsType, Comment, FeedbacksSliceState } from "./types";



export const fetchFeedbacks = createAsyncThunk<FeedbackItem[], FetchFeedbacksOptionsType>('feedbacks/fetchFeedbacks', async (options) => {
    const { data } = await axios.get(`/feedbacks${options.sortBy ? `?sortBy=${options.sortBy.type}&sortOrder=${options.sortBy.order}` : ''}${options.filter && options.filter.status ? `&category=${options.filter.category}&status=${options.filter.status}` : ''}`);
    return data;
}
);

export const fetchOneFeedback = createAsyncThunk<FeedbackItem, string>('feedbacks/fetchOneFeedback', async (id) => {
const { data } = await axios.get(`/feedbacks/${id}`);
return data
});


export const postComment = createAsyncThunk<FeedbackItem, PostCommentOptionsType>('feedbacks/postComment', async ({ id, options }) => {
const { data } = await axios.post(`/feedbacks/${id}/comments`, options);
return data
});

export const removeComment = createAsyncThunk<FeedbackItem, string>('feedbacks/removeComment', async (commentId) => {
const { data } = await axios.delete(`/comments/${commentId}`);
return data
});

export const postReply = createAsyncThunk<Comment, PostReplyOptionsType>('feedbacks/postReply', async ({ commentId, options }) => {
const { data } = await axios.post(`/comments/${commentId}/replies`, options);
return data
});

export const removeReply = createAsyncThunk<Comment, string>('feedbacks/removeReply', async (reolyId) => {
const { data } = await axios.delete(`/replies/${reolyId}`);
return data
});


export const handlePending = (state: FeedbacksSliceState) => {
    state.isLoading = true;
    state.loadingRejected = false;
}

export const handleRejected = (state: FeedbacksSliceState) => {
    state.isLoading = true;
    state.loadingRejected = false;
}