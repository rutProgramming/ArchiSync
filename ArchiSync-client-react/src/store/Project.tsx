import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, {  AxiosRequestConfig } from "axios";
import { PartialProject } from "../types/types";
const url = "https://archisync-server.onrender.com/api/Project/";

export const GetHeaders = (): AxiosRequestConfig['headers'] => {
    const token = sessionStorage.getItem('token') || ''; 
    return {
        Authorization: `Bearer ${token.replace(/"/g, '')}`,
        'Content-Type': 'application/json',
    };
};
export const addProject = createAsyncThunk(
    'Project/addProject',
    async ({ project }: {project: PartialProject }, thunkAPI) => {
        try {
            console.log(project);
            var response = await axios.post(url, project, { headers: GetHeaders() });
            return response.data;
                
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
            const response = await axios.get(url + "architect",  { headers: GetHeaders() });
            console.log("architect",response);
            return response.data; 
        } catch (error) {
            alert(error);
            return thunkAPI.rejectWithValue('Failed to fetch projects');
        }
    }
);
export const GetPublicProjects = createAsyncThunk('Project/GetPublicProjects', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "public");
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching public projects:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
});
export const GetAccessProjects = createAsyncThunk('Project/GetAccessProjects', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "UserAccess", { headers: GetHeaders() });
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching access projects:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
});
export const GetAllProjects = createAsyncThunk('Project/GetAllProjects', async (_, thunkAPI) => {
    try {
        const response = await axios.get(url + "all", { headers: GetHeaders() });
        console.log(response);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching access projects:', error);
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
});
const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [] as PartialProject[],
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
            .addCase(GetProgectsArchitect.fulfilled, (state, action: PayloadAction<PartialProject[]>) => {
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(GetProgectsArchitect.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            })
            .addCase(GetAccessProjects.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetAccessProjects.fulfilled, (state, action: PayloadAction<PartialProject[]>) => {
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(GetAccessProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            })
            .addCase(GetPublicProjects.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetPublicProjects.fulfilled, (state, action: PayloadAction<PartialProject[]>) => {
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(GetPublicProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            })
            .addCase(GetAllProjects.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(GetAllProjects.fulfilled, (state, action: PayloadAction<PartialProject[]>) => {
                state.loading = false;
                state.projects = action.payload; 
            })
            .addCase(GetAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to get projects';
            })
            .addCase(addProject.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(addProject.fulfilled, (state, action: PayloadAction<PartialProject>) => {
                state.loading = false;
                state.projects.push(action.payload);
                
            })
            .addCase(addProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to add project';
            });
    },
});

export default ProjectSlice.reducer;