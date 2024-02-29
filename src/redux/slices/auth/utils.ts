import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { LoginParamsType, RegisterParamsType, UserDataType, authSliceState } from "./types";

export const fetchRegister = createAsyncThunk<UserDataType, RegisterParamsType>('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

export const fetchLogin = createAsyncThunk<UserDataType, LoginParamsType>('auth/fetchLogin', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk<UserDataType>('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})


export const handleRequest = (state: authSliceState, action: PayloadAction<UserDataType>) => {
    state.isLoading = false;
    state.data = action.payload;
};

export const handleRejected = (state: authSliceState) => {
    state.isLoading = false;
    state.loadingRejected = true;
};

export const handlePending = (state: authSliceState) => {
    state.isLoading = true
}