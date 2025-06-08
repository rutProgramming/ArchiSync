// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { GetHeaders } from "./Project";
// import { PartialProjectPermission } from "../types/types";
// const url = import.meta.env.VITE_BASE_URL+"/api/ProjectPermission/"



// export const checkProjectAccess = createAsyncThunk(
//   "projects/checkAccess",
//   async ( projectId: number , thunkAPI) => {
//     try {
//       const response = await axios.get(`${url}${projectId}/check-permission`, {
//         headers: GetHeaders(),
//       });
//       return { projectId, hasAccess: response.data.hasAccess };
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Failed to check access");
//     }
//   }
// );

// export const addProjectPremmision = createAsyncThunk(
//   "projects/addProjectPremmision",
//   async (projectPremmision: PartialProjectPermission , thunkAPI) => {
//     try {
//       const response = await axios.post(url, projectPremmision, {
//         headers: GetHeaders(),
//       });
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Failed to check access");
//     }
//   }
// );

// const premmisionSlice = createSlice({
//   name: 'premmision',
//   initialState: {
//     premmision: ({} as PartialProjectPermission),
//     loading: false,
//     error: ""
//   },
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
      
//       .addCase(addProjectPremmision.pending, (state) => {
//         state.loading = true;
//         state.error = "";
//       })
//       .addCase(addProjectPremmision.fulfilled, (state, action: PayloadAction<PartialProjectPermission>) => {
//         state.loading = false;
//         state.premmision = { ...action.payload };

//       })
//       .addCase(addProjectPremmision.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string || 'Failed to add ProjectPremmision';
//       });
//   },
// });

// export default premmisionSlice.reducer;


import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { PartialProjectPermission } from "../types/types";

const url = "/api/ProjectPermission/";

export const checkProjectAccess = createAsyncThunk(
  "permissions/checkAccess",
  async (projectId: number, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${url}${projectId}/check-permission`);
      return { projectId, hasAccess: response.data.hasAccess as boolean };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to check access"
      );
    }
  }
);

export const addProjectPermission = createAsyncThunk(
  "permissions/addProjectPermission",
  async (permission: PartialProjectPermission, thunkAPI) => {
    try {
      const response = await axiosInstance.post(url, permission);
      return response.data as PartialProjectPermission;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to add permission"
      );
    }
  }
);

const permissionSlice = createSlice({
  name: "permission",
  initialState: {
    permission: {} as PartialProjectPermission,
    accessMap: {} as Record<number, boolean>, // לכל projectId – true/false
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add permission
      .addCase(addProjectPermission.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addProjectPermission.fulfilled, (state, action: PayloadAction<PartialProjectPermission>) => {
        state.loading = false;
        state.permission = action.payload;
      })
      .addCase(addProjectPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Check access
      .addCase(checkProjectAccess.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(checkProjectAccess.fulfilled, (state, action: PayloadAction<{ projectId: number; hasAccess: boolean }>) => {
        state.loading = false;
        state.accessMap[action.payload.projectId] = action.payload.hasAccess;
      })
      .addCase(checkProjectAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default permissionSlice.reducer;
