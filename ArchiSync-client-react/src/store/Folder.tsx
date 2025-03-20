import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, {  AxiosRequestConfig } from "axios";
import { PartialFolder } from "../types/types";
const url = "https://localhost:7218/api/Project";



const GetHeaders = (): AxiosRequestConfig['headers'] => {
    const token = sessionStorage.getItem('token') || ''; 
    return {
        Authorization: `Bearer ${token.replace(/"/g, '')}`,
        'Content-Type': 'application/json',
    };
};
export const addProject = createAsyncThunk(
    'Project/addProject',
    async ({ project }: {project: PartialFolder }, thunkAPI) => {
        try {
            console.log(project);
            await axios.post(url, project, { headers: GetHeaders() });
            return true;
        } catch (error) {
            alert(error);
            return thunkAPI.rejectWithValue('Failed to add project');
        }
    }
);

export const GetProgectsArchitect = createAsyncThunk(
    'Progect/getProjects',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(url + "/architect",  { headers: GetHeaders() });
            console.log(response);
            return response.data; 
        } catch (error) {
            alert(error);
            return thunkAPI.rejectWithValue('Failed to fetch projects');
        }
    }
);

const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [] as PartialFolder[],
        loading: false,
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProgectsArchitect.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetProgectsArchitect.fulfilled, (state, action: PayloadAction<PartialFolder[]>) => {
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(GetProgectsArchitect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            });
    },
});

export default ProjectSlice.reducer;