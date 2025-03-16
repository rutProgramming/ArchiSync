import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PartialProjects } from "../types/types";

const url = "https://localhost:7218/api/ProjectOrFolder/";

export const GetPublicProjects = createAsyncThunk('fetchProjects', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "public");
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching public projects:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
});

export const GetAccessProjects = createAsyncThunk('fetchAccessProjects', async (_, thunkAPI) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        console.log(token, sessionStorage.getItem('user'));
        const response = await axios.get(url + "UserAccess", {
            headers: {
                 Authorization: `Bearer ${token.replace(/"/g, '')}`,  
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching access projects:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
});

const ProjectsSlice = createSlice({
    name: 'Projects',
    initialState: {
        project: {} as PartialProjects,
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetPublicProjects.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetPublicProjects.fulfilled, (state, action: PayloadAction<{ projects: PartialProjects }>) => {
                state.loading = false;
                state.project = { ...action.payload.projects };
            })
            .addCase(GetPublicProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            })
            .addCase(GetAccessProjects.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetAccessProjects.fulfilled, (state, action: PayloadAction<{ projects: PartialProjects }>) => {
                state.loading = false;
                state.project = { ...action.payload.projects };
            })
            .addCase(GetAccessProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            });
    },
});

export default ProjectsSlice.reducer;