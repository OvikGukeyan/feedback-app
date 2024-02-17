import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { RootState } from "../../store";

export type LoginParamsType = {
    email: string,
    password: string
}

export type RegisterParamsType = {
    fullName: string
    userName: string
    email: string
    password: string
    avatarUrl?: string 
}

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


export type UserDataType = {
    _id: string;
    fullName: string;
    userName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    token: string;
    avatarUrl?: string
}

interface authSliceState {
    data: UserDataType | null
    isLoading: boolean
    loadingRejected: boolean
}

const initialState: authSliceState = {
    data: null,
    isLoading: false,
    loadingRejected: false
}

const handleRequest = (state: authSliceState, action: PayloadAction<UserDataType>) => {
    state.isLoading = false;
    state.data = action.payload;
};

const handleRejected = (state: authSliceState) => {
    state.isLoading = false;
    state.loadingRejected = true;
};

const handlePending = (state: authSliceState) => {
    state.isLoading = true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.data = null;
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

export const { signOut } = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth
export default authSlice.reducer;