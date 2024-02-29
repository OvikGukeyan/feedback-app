import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FeedbacksSliceState } from "./types";
import { fetchFeedbacks, fetchOneFeedback, handlePending, handleRejected, postComment, postReply, removeComment, removeReply } from "./utils";


const initialState: FeedbacksSliceState = {
    feedbacks: null,
    currentFeedback: null,
    isLoading: false,
    loadingRejected: false,
}



const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        upvotePlus: (state, action) => {
            if(state.feedbacks) {
                const feedbackInd = state.feedbacks.findIndex((obj) => obj._id === action.payload);
                state.feedbacks[feedbackInd].upvotes++;
            }
            

        },
        upvoteMinus: (state, action) => {
            if(state.feedbacks) {
                const feedbackInd = state.feedbacks.findIndex((obj) => obj._id === action.payload);
                state.feedbacks[feedbackInd].upvotes--;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks.pending, handlePending)
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                state.isLoading = false;
                state.loadingRejected = false;
            })
            .addCase(fetchFeedbacks.rejected, handleRejected)


            .addCase(postComment.pending, handlePending)
            .addCase(postComment.fulfilled, (state, action) => {
                state.currentFeedback = action.payload
            })
            .addCase(postComment.rejected, handleRejected)


            .addCase(fetchOneFeedback.pending, handlePending)
            .addCase(fetchOneFeedback.fulfilled, (state, action) => {
                state.currentFeedback = action.payload;
                state.isLoading = false;
                state.loadingRejected = false;
            })
            .addCase(fetchOneFeedback.rejected, handleRejected)


            .addCase(postReply.pending, handlePending)
            .addCase(postReply.fulfilled, (state, action) => {
                if (state.currentFeedback?.comments?.length) {
                    const index = state.currentFeedback.comments?.findIndex((obj) => obj._id === action.payload._id);
                    state.currentFeedback.comments[index] = action.payload;
                    state.currentFeedback.commentsCount++;
                }
                state.isLoading = false;
                state.loadingRejected = false;
            })
            .addCase(postReply.rejected, handleRejected)


            
            .addCase(removeComment.pending, handlePending)
            .addCase(removeComment.fulfilled, (state, action) => {
                state.currentFeedback = action.payload;
            })
            .addCase(removeComment.rejected, handleRejected)



            .addCase(removeReply.pending, handlePending)
            .addCase(removeReply.fulfilled, (state, action) => {
                if (state.currentFeedback?.comments?.length) {
                    const index = state.currentFeedback.comments?.findIndex((obj) => obj._id === action.payload._id);
                    state.currentFeedback.comments[index] = action.payload;
                    state.currentFeedback.commentsCount--;
                }
            })
            .addCase(removeReply.rejected, handleRejected)

    }
});

export const { upvoteMinus, upvotePlus } = feedbacksSlice.actions;
export const selectFeedbacks = (state: RootState) => state.feedbacks
export default feedbacksSlice.reducer;