import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

const fetchUserData = createAsyncThunk('auth/fetchUserData', async(params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            
        });
        builder.addCase(fetchUserData.rejected, (state) => {
            
        })
    }
})