import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { authSliceState } from "./types";
import { fetchAuthMe, fetchLogin, fetchRegister, handlePending, handleRejected, handleRequest } from "./utils";






const initialState: authSliceState = {
    data: null,
    isLoading: false,
    loadingRejected: false
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.data = null;
        },
        addUpvoted: (state, action) => {
            if(state.data?.upvoted.includes(action.payload)) {
                const newUpvoted = state.data.upvoted.filter((id) => id !== action.payload)
                state.data.upvoted = newUpvoted;
            }else{
                state.data?.upvoted.push(action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, handlePending)
            .addCase(fetchLogin.fulfilled, handleRequest)
            .addCase(fetchLogin.rejected, handleRejected)

            .addCase(fetchAuthMe.pending, handlePending)
            .addCase(fetchAuthMe.fulfilled, handleRequest)
            .addCase(fetchAuthMe.rejected, handleRejected)
            
            .addCase(fetchRegister.pending, handlePending)
            .addCase(fetchRegister.fulfilled, handleRequest)
            .addCase(fetchRegister.rejected, handleRejected);
    }

});

export const { signOut, addUpvoted } = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth
export default authSlice.reducer;