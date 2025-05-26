// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios, {  AxiosRequestConfig } from "axios";
// import { PartialProject } from "../types/types";
// import { Project, ProjectDTO } from "../types/Project";
// const url = import.meta.env.VITE_BASE_URL+"/api/Project/"

// export const GetHeaders = (): AxiosRequestConfig['headers'] => {
//     const token = sessionStorage.getItem('token') || ''; 
//     return {
//         Authorization: `Bearer ${token.replace(/"/g, '')}`,
//         'Content-Type': 'application/json',
//     };
// };
// export const addProject = createAsyncThunk(
//     'Project/addProject',
//     async ({ project }: {project: Project }, thunkAPI) => {
//         try {
//             console.log(project);
//             var response = await axios.post(url, project, { headers: GetHeaders() });
//             return response.data;
                
//         } catch (error) {
//             alert(error);
//             return thunkAPI.rejectWithValue('Failed to add project');
//         }
//     }
// );
// export const GetProgectsArchitect = createAsyncThunk(
//     'Progect/getProjects',
//     async (_, thunkAPI) => {
//         try {
//             const response = await axios.get(url + "architect",  { headers: GetHeaders() });
//             console.log("architect",response);
//             return response.data; 
//         } catch (error) {
//             alert(error);
//             return thunkAPI.rejectWithValue('Failed to fetch projects');
//         }
//     }
// );
// export const GetPublicProjects = createAsyncThunk('Project/GetPublicProjects', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get(url + "public");
//         console.log(response);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error fetching public projects:', error);
//         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
//     }
// });
// export const GetAccessProjects = createAsyncThunk('Project/GetAccessProjects', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get(url + "UserAccess", { headers: GetHeaders() });
//         console.log(response);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error fetching access projects:', error);
//         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
//     }
// });
// export const GetAllProjects = createAsyncThunk('Project/GetAllProjects', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get(url + "all", { headers: GetHeaders() });
//         console.log(response);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error fetching access projects:', error);
//         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch projects');
//     }
// });
// const ProjectSlice = createSlice({
//     name: 'projects',
//     initialState: {
//         projects: [] as ProjectDTO[],
//         loading: false,
//         error: ""
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(GetProgectsArchitect.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(GetProgectsArchitect.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
//                 state.loading = false;
//                 state.projects = action.payload; 
//             })
//             .addCase(GetProgectsArchitect.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to get projects';
//             })
//             .addCase(GetAccessProjects.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(GetAccessProjects.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
//                 state.loading = false;
//                 state.projects = action.payload; 
//             })
//             .addCase(GetAccessProjects.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to get projects';
//             })
//             .addCase(GetPublicProjects.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(GetPublicProjects.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
//                 state.loading = false;
//                 state.projects = action.payload; 
//             })
//             .addCase(GetPublicProjects.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to get projects';
//             })
//             .addCase(GetAllProjects.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(GetAllProjects.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
//                 state.loading = false;
//                 state.projects = action.payload; 
//             })
//             .addCase(GetAllProjects.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to get projects';
//             })
//             .addCase(addProject.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(addProject.fulfilled, (state, action: PayloadAction<ProjectDTO>) => {
//                 state.loading = false;
//                 state.projects.push(action.payload);
                
//             })
//             .addCase(addProject.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to add project';
//             });
//     },
// });

// export default ProjectSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { ProjectDTO } from "../types/Project";

const url = import.meta.env.VITE_BASE_URL + "/api/Project/";

// טיפוס לשגיאה שמגיעה מהשרת
interface ServerError {
  statusCode?: number;
  message?: string;
  errors?: any;
}

export const GetHeaders = (): AxiosRequestConfig['headers'] => {
  const token = sessionStorage.getItem('token') || '';
  return {
    Authorization: `Bearer ${token.replace(/"/g, '')}`,
    'Content-Type': 'application/json',
  };
};

// thunk להוספת פרויקט
export const addProject = createAsyncThunk<ProjectDTO, { project: ProjectDTO }, { rejectValue: ServerError }>(
  'Project/addProject',
  async ({ project }, thunkAPI) => {
    try {
      const response = await axios.post(url, project, { headers: GetHeaders() });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ServerError);
      }
      return thunkAPI.rejectWithValue({ message: 'Failed to add project' });
    }
  }
);

// thunk לקבלת פרויקטים של ארכיטקט
export const GetProjectsArchitect = createAsyncThunk<ProjectDTO[], void, { rejectValue: ServerError }>(
  'Project/getProjectsArchitect',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url + "architect", { headers: GetHeaders() });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ServerError);
      }
      return thunkAPI.rejectWithValue({ message: 'Failed to fetch architect projects' });
    }
  }
);

// thunk לקבלת פרויקטים ציבוריים
export const GetPublicProjects = createAsyncThunk<ProjectDTO[], void, { rejectValue: ServerError }>(
  'Project/getPublicProjects',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url + "public");
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ServerError);
      }
      return thunkAPI.rejectWithValue({ message: 'Failed to fetch public projects' });
    }
  }
);

// thunk לקבלת פרויקטים עם גישה למשתמש
export const GetAccessProjects = createAsyncThunk<ProjectDTO[], void, { rejectValue: ServerError }>(
  'Project/getAccessProjects',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url + "UserAccess", { headers: GetHeaders() });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ServerError);
      }
      return thunkAPI.rejectWithValue({ message: 'Failed to fetch access projects' });
    }
  }
);

// thunk לקבלת כל הפרויקטים (למנהל)
export const GetAllProjects = createAsyncThunk<ProjectDTO[], void, { rejectValue: ServerError }>(
  'Project/getAllProjects',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url + "all", { headers: GetHeaders() });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ServerError);
      }
      return thunkAPI.rejectWithValue({ message: 'Failed to fetch all projects' });
    }
  }
);

// thunk לקבלת פרויקט לפי מזהה
export const GetProjectById = createAsyncThunk<ProjectDTO, string, { rejectValue: ServerError }>(
  'Project/getProjectById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(url + id, { headers: GetHeaders() });
      console.log("Fetched project by id:", response);
      
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ServerError);
      }
      return thunkAPI.rejectWithValue({ message: 'Failed to fetch project by id' });
    }
  }
);

interface ProjectState {
  projects: ProjectDTO[];
  selectedProject: ProjectDTO | null;
  loading: boolean;
  error: string;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: "",
};

const ProjectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetProjectsArchitect
      .addCase(GetProjectsArchitect.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetProjectsArchitect.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(GetProjectsArchitect.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = `Error ${action.payload.statusCode || ''}: ${action.payload.message || 'Unknown error'}`;
        } else {
          state.error = action.error.message || 'Failed to get projects architect';
        }
      })

      // GetPublicProjects
      .addCase(GetPublicProjects.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetPublicProjects.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(GetPublicProjects.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = `Error ${action.payload.statusCode || ''}: ${action.payload.message || 'Unknown error'}`;
        } else {
          state.error = action.error.message || 'Failed to get public projects';
        }
      })

      // GetAccessProjects
      .addCase(GetAccessProjects.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetAccessProjects.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(GetAccessProjects.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = `Error ${action.payload.statusCode || ''}: ${action.payload.message || 'Unknown error'}`;
        } else {
          state.error = action.error.message || 'Failed to get access projects';
        }
      })

      // GetAllProjects
      .addCase(GetAllProjects.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetAllProjects.fulfilled, (state, action: PayloadAction<ProjectDTO[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(GetAllProjects.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = `Error ${action.payload.statusCode || ''}: ${action.payload.message || 'Unknown error'}`;
        } else {
          state.error = action.error.message || 'Failed to get all projects';
        }
      })

      // GetProjectById
      .addCase(GetProjectById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetProjectById.fulfilled, (state, action: PayloadAction<ProjectDTO>) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(GetProjectById.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = `Error ${action.payload.statusCode || ''}: ${action.payload.message || 'Unknown error'}`;
        } else {
          state.error = action.error.message || 'Failed to get project by id';
        }
      })

      // addProject
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addProject.fulfilled, (state, action: PayloadAction<ProjectDTO>) => {
        state.loading = false;
        state.selectedProject = action.payload; 
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = `Error ${action.payload.statusCode || ''}: ${action.payload.message || 'Unknown error'}`;
        } else {
          state.error = action.error.message || 'Failed to add project';
        }
      });
  }
});

export default ProjectSlice.reducer;