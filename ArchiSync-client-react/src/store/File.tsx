import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { File, PartialFile } from "../types/types";
import { GetHeaders } from "./Project";
const url = import.meta.env.VITE_BASE_URL+"/api/File"


export const addFile = createAsyncThunk(
    'Project/addFile',
    async (file: PartialFile, thunkAPI) => {
        try {
            console.log(file,GetHeaders());

            var response = await axios.post(url, file, { headers: GetHeaders() });
            return response.data;
        } catch (error) {
            alert(error);
            return thunkAPI.rejectWithValue('Failed to add File');
        }
    }
);
export const deleteFile = createAsyncThunk(
    'Project/deleteFile',
    async (file: PartialFile, thunkAPI) => {
        try {
            await axios.delete(`${url}/${file.id}`, {
                headers: GetHeaders(),
            });
                return file.id;
            
        } catch (error) {
            alert(error);
            return thunkAPI.rejectWithValue('Failed to delete file');
        }
    }
);


export const getFiles = createAsyncThunk('Project/getFiles', async ({projectId,userId}:{projectId:number,userId:number}, thunkAPI) => {
    console.log("getFiles",projectId,userId)
    try {
        const response = await axios.get(url, {
            params: {
                projectId: projectId,
                userId: userId,
            },
            headers: GetHeaders()
        });
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching public projects:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch Files');
    }
});
const FileSlice = createSlice({
    name: 'files',
    initialState: {
        files: [] as File[],
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFiles.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getFiles.fulfilled, (state, action: PayloadAction<File[]>) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(getFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get files';
            })

            .addCase(addFile.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(addFile.fulfilled, (state, action: PayloadAction<File>) => {
                state.loading = false;
                state.files.push(action.payload);

            })
            .addCase(addFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to add file';
            })
            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteFile.fulfilled, (state, action: PayloadAction<number | undefined>) => {
                state.loading = false;
                //if (action.payload !== undefined) {
                    state.files = state.files.filter(file => file.id !== action.payload);
                    console.log("File deleted successfully", state.files,action.payload);
                //}
            })
            
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to delete file';
            });
            

    },
});

export default FileSlice.reducer;