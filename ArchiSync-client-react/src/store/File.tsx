// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { File, PartialFile } from "../types/types";
// import { GetHeaders } from "./Project";
// const url = import.meta.env.VITE_BASE_URL+"/api/File"


// export const addFile = createAsyncThunk(
//     'Project/addFile',
//     async (file: PartialFile, thunkAPI) => {
//         try {
//             var response = await axios.post(url, file, { headers: GetHeaders() });
//             return response.data;
//         } catch (error) {
//             alert(error);
//             return thunkAPI.rejectWithValue('Failed to add File');
//         }
//     }
// );
// export const deleteFile = createAsyncThunk(
//     'Project/deleteFile',
//     async (file: PartialFile, thunkAPI) => {
//         try {
//             await axios.delete(`${url}/${file.id}`, {
//                 headers: GetHeaders(),
//             });
//                 return file.id;
            
//         } catch (error) {
//             alert(error);
//             return thunkAPI.rejectWithValue('Failed to delete file');
//         }
//     }
// );


// export const getFiles = createAsyncThunk('Project/getFiles', async ({projectId,userId}:{projectId:number,userId:number}, thunkAPI) => {
//     try {
//         const response = await axios.get(url, {
//             params: {
//                 projectId: projectId,
//                 userId: userId,
//             },
//             headers: GetHeaders()
//         });
//         return response.data;
//     } catch (error: any) {
//         console.error('Error fetching public projects:', error);
//         return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch Files');
//     }
// });
// const FileSlice = createSlice({
//     name: 'files',
//     initialState: {
//         files: [] as File[],
//         loading: false,
//         error: ""
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getFiles.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(getFiles.fulfilled, (state, action: PayloadAction<File[]>) => {
//                 state.loading = false;
//                 state.files = action.payload;
//             })
//             .addCase(getFiles.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to get files';
//             })

//             .addCase(addFile.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(addFile.fulfilled, (state, action: PayloadAction<File>) => {
//                 state.loading = false;
//                 state.files.push(action.payload);

//             })
//             .addCase(addFile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to add file';
//             })
//             .addCase(deleteFile.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(deleteFile.fulfilled, (state, action: PayloadAction<number | undefined>) => {
//                 state.loading = false;
//                 state.files = state.files.filter(file => file.id !== action.payload);
//             })
            
//             .addCase(deleteFile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to delete file';
//             });
            

//     },
// });

// export default FileSlice.reducer;



// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance"; // 👈 שימוש באינטרספטור
// import { File, PartialFile } from "../types/types";

// const url = "/api/File";

// export const addFile = createAsyncThunk(
//     'Project/addFile',
//     async (file: PartialFile, thunkAPI) => {
//         try {
//             const response = await axiosInstance.post(url, file);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.message || 'Failed to add file');
//         }
//     }
// );

// export const deleteFile = createAsyncThunk(
//     'Project/deleteFile',
//     async (file: PartialFile, thunkAPI) => {
//         try {
//             await axiosInstance.delete(`${url}/${file.id}`);
//             return file.id;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.message || 'Failed to delete file');
//         }
//     }
// );

// export const getFiles = createAsyncThunk(
//     'Project/getFiles',
//     async ({ projectId, userId }: { projectId: number, userId: number }, thunkAPI) => {
//         try {
//             const response = await axiosInstance.get(url, {
//                 params: { projectId, userId }
//             });
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.message || 'Failed to fetch files');
//         }
//     }
// );

// const FileSlice = createSlice({
//     name: 'files',
//     initialState: {
//         files: [] as File[],
//         loading: false,
//         error: ""
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getFiles.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(getFiles.fulfilled, (state, action: PayloadAction<File[]>) => {
//                 state.loading = false;
//                 state.files = action.payload;
//             })
//             .addCase(getFiles.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })

//             .addCase(addFile.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(addFile.fulfilled, (state, action: PayloadAction<File>) => {
//                 state.loading = false;
//                 state.files.push(action.payload);
//             })
//             .addCase(addFile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })

//             .addCase(deleteFile.pending, (state) => {
//                 state.loading = true;
//                 state.error = "";
//             })
//             .addCase(deleteFile.fulfilled, (state, action: PayloadAction<number | undefined>) => {
//                 state.loading = false;
//                 state.files = state.files.filter(file => file.id !== action.payload);
//             })
//             .addCase(deleteFile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export default FileSlice.reducer;



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { File, PartialFile } from "../types/types";

const url = "/api/File";

export const addFile = createAsyncThunk(
  "files/addFile",
  async (file: PartialFile, thunkAPI) => {
    try {
      const response = await axiosInstance.post(url, file);
      return response.data as File;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to add file"
      );
    }
  }
);

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async (file: PartialFile, thunkAPI) => {
    try {
      await axiosInstance.delete(`${url}/${file.id}`);
      return file.id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to delete file"
      );
    }
  }
);

export const getFiles = createAsyncThunk(
  "files/getFiles",
  async (
    { projectId, userId }: { projectId: number; userId: number },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.get(url, {
        params: { projectId, userId },
      });
      return response.data as File[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Failed to fetch files"
      );
    }
  }
);

const FileSlice = createSlice({
  name: "files",
  initialState: {
    files: [] as File[],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch files
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
        state.error = action.payload as string;
      })

      // Add file
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
        state.error = action.payload as string;
      })

      // Delete file
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteFile.fulfilled, (state, action: PayloadAction<number | undefined>) => {
        state.loading = false;
        state.files = state.files.filter((file) => file.id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default FileSlice.reducer;
