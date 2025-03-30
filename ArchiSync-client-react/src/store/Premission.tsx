import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GetHeaders } from "./Project";
import { PartialProjectPermission } from "../types/types";
const url = "https://localhost:7218/api/ProjectPermission/";



export const checkProjectAccess = createAsyncThunk(
  "projects/checkAccess",
  async ( projectId: number , thunkAPI) => {
    try {
      console.log("check-permission");
      const response = await axios.get(`${url}${projectId}/check-permission`, {
        headers: GetHeaders(),
      });
      return { projectId, hasAccess: response.data.hasAccess };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to check access");
    }
  }
);

export const addProjectPremmision = createAsyncThunk(
  "projects/addProjectPremmision",
  async (projectPremmision: PartialProjectPermission , thunkAPI) => {
    try {
      const response = await axios.post(url, projectPremmision, {
        headers: GetHeaders(),
      });
      console.log(response);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to check access");
    }
  }
);

const premmisionSlice = createSlice({
  name: 'premmision',
  initialState: {
    premmision: ({} as PartialProjectPermission),
    loading: false,
    error: ""
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      
      .addCase(addProjectPremmision.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addProjectPremmision.fulfilled, (state, action: PayloadAction<PartialProjectPermission>) => {
        state.loading = false;
        state.premmision = { ...action.payload };

      })
      .addCase(addProjectPremmision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to add ProjectPremmision';
      });
  },
});

export default premmisionSlice.reducer;
