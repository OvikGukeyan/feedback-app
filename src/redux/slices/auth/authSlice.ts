import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { RootState } from "../../store";

export type paramsType = {
    email: string,
    password: string
}

export const fetchLogin = createAsyncThunk<dataType, paramsType>('auth/fetchLogin', async(params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk<dataType>('auth/fetchAuthMe', async() => {
    const {data} = await axios.get('/auth/me');
    return data;
})


export type dataType = {
    _id: string;
  fullName: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

interface authSliceState {
    data: dataType | null
    isLoading: boolean
    loadingRejected: boolean
}

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchLogin.rejected, (state) => {
            state.isLoading = false; 
            state.loadingRejected = true;
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.isLoading = false; 
            state.loadingRejected = true;
        })
    }
});

export const {signOut} = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth
export default authSlice.reducer;