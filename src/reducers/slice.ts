import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface DataState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DataState = {
    data: null,
    status: 'idle',
    error: null,
};

const fetchData = createAsyncThunk(
    'data/fetchData',
    async (url: string, thunkAPI) => {
        const response = await axios.get(url);
        return response.data;
    }
);


const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export { dataSlice, fetchData };
