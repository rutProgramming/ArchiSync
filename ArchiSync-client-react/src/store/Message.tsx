import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PartialMessage } from "../types/types";
import { GetHeaders } from "./Project";
const url = "https://localhost:7218/api/Message/";

export const createMessage = createAsyncThunk('message/createMessage', async ({ message }:{ message: PartialMessage }, thunkAPI) => {
    try {
        const response = await axios.post(url, message, { headers: GetHeaders() });
        console.log(response)
        return {
           id: response.data.id
        };
    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});



const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        message:  ({} as PartialMessage),
        loading: false,
        error: ""
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createMessage.fulfilled, (state, action: PayloadAction<{ id:number}>) => {
                state.loading = false;
                state.message.id = action.payload.id ;
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed';
            })
            

    },
});

export default messageSlice.reducer;
