import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GetHeaders } from "./Project";
const url = "https://localhost:7218/api/ProjectPermission/";



export const checkProjectAccess = createAsyncThunk(
  "projects/checkAccess",
  async ({ projectId }: { projectId: number }, thunkAPI) => {
    try {
      console.log("check-permission");
      const response = await axios.get(`${url}${projectId}/check-permission`, {
        headers: GetHeaders(),
    });
    console.log(response);
    return { projectId, hasAccess: response.data.hasAccess };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to check access");
    }
  }
);



const premmisionSlice = createSlice({
    name: 'premmision',
    initialState: {
        premmision:  ({} as boolean),
        loading: false,
        error: ""
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(checkProjectAccess.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkProjectAccess.fulfilled, (state, action: PayloadAction<{ projectId: number; hasAccess: boolean }>) => {
            state.loading = false;
            state.premmision = action.payload.hasAccess;
          })
          .addCase(checkProjectAccess.rejected, (state) => {
            state.loading = false;
          });

    },
});

export default premmisionSlice.reducer;
