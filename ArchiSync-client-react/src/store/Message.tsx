import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Message, PartialMessage } from "../types/types";
import { GetHeaders } from "./Project";
const url = "https://localhost:7218/api/Message/";

export const createMessage = createAsyncThunk('message/createMessage', async ({ message }: { message: PartialMessage }, thunkAPI) => {
    try {
        const response = await axios.post(url, message, { headers: GetHeaders() });
        return response.data

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});

export const GetArchitectMessages = createAsyncThunk('message/GetArchitectMessages', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "architect", { headers: GetHeaders() });
        return response.data
    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});

export const GetUserMessages = createAsyncThunk('message/GetUserMessages', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "user", { headers: GetHeaders() });
        return response.data

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});
export const UpdateMessageStatus = createAsyncThunk('message/toggleMessageReadStatus', async (message: PartialMessage, thunkAPI) => {
    try {
        await axios.put(url + message.id, message, { headers: GetHeaders() });
        return message;

    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to send request');
    }
});
export const fetchUnreadMessagesCount = createAsyncThunk('message/fetchUnreadMessagesCount', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + `unread-count`, {
            headers: GetHeaders()
        });
        const count = response.data.unreadMessages;
        return count;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to fetch unread messages count');
    }

});

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [] as PartialMessage[],
        loading: false,
        error: "",
        unreadCount: 0,
    },
    reducers: {
        
        toggleUserMessageReadStatus: (state, action: PayloadAction<number>) => {
            const messageId = action.payload;
            const message = state.messages.find((msg) => msg.id === messageId);
            if (message) {
              message.architectIsRead = !message.architectIsRead;
              state.unreadCount = state.messages.filter((msg) => !msg.architectIsRead).length;
            }
          },
        toggleArchitectMessageReadStatus: (state, action: PayloadAction<number>) => {
            const messageId = action.payload;
            const message = state.messages.find((msg) => msg.id === messageId);
            if (message) {
              message.architectIsRead = !message.architectIsRead;
              state.unreadCount = state.messages.filter((msg) => !msg.architectIsRead).length;
            }
          },
    },
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
                state.unreadCount = action.payload.filter((msg) => !msg.architectIsRead).length;
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
                state.unreadCount = action.payload.filter((msg) => !msg.architectIsRead).length;

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
                    state.messages[index] = { ...action.payload };
                }
                
            })
            .addCase(UpdateMessageStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update message';

            })

            .addCase(fetchUnreadMessagesCount.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchUnreadMessagesCount.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.unreadCount = action.payload;
            })
            .addCase(fetchUnreadMessagesCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch unread messages count';
            });
    },            

});
export const { toggleUserMessageReadStatus, toggleArchitectMessageReadStatus } = messageSlice.actions;
export default messageSlice.reducer;
