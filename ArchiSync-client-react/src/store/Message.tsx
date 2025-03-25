import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Message, PartialMessage } from "../types/types";
import { GetHeaders } from "./Project";
const url = "https://localhost:7218/api/Message/";

export const createMessage = createAsyncThunk('message/createMessage', async ({ message }: { message: PartialMessage }, thunkAPI) => {
    try {
        const response = await axios.post(url, message, { headers: GetHeaders() });
        console.log(response)
        return response.data

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});

export const GetArchitectMessages = createAsyncThunk('message/GetArchitectMessages', async (_, thunkAPI) => {
    try {
        console.log(GetHeaders())
        const response = await axios.get(url + "architect", { headers: GetHeaders() });
        console.log(response)
        return response.data

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});

export const GetUserMessages = createAsyncThunk('message/GetUserMessages', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "user", { headers: GetHeaders() });
        console.log(response)
        return response.data

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});
export const UpdateMessageStatus = createAsyncThunk('message/toggleMessageReadStatus', async (message: PartialMessage, thunkAPI) => {
    try {
        const response = await axios.put(url + message.id, message, { headers: GetHeaders() });
        console.log(response)
        return message;

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});
const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [] as PartialMessage[],
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createMessage.fulfilled, (state, action: PayloadAction<Message>) => {
                state.loading = false;
                state.messages.push(action.payload);
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed';
            })
            .addCase(GetUserMessages.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetUserMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(GetUserMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get Messages';
            })
            .addCase(GetArchitectMessages.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetArchitectMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(GetArchitectMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get Messages';
            })
            .addCase(UpdateMessageStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateMessageStatus.fulfilled, (state, action: PayloadAction<PartialMessage>) => {
                state.loading = false;
                const index = state.messages.findIndex(m => m.id === action.payload.id);
                if (index !== -1) {
                    state.messages[index] = {...action.payload};
                }

            })
            .addCase(UpdateMessageStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update message';
            })


    },

});

export default messageSlice.reducer;
