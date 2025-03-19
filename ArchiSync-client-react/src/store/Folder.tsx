import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PartialFolder } from "../types/types";
const url = "https://localhost:7218/api/Project";


export const addProject = createAsyncThunk('Project/addProject', async ({ folderName,isPublic ,userId}: { folderName:string,isPublic:boolean,userId:number }, thunkAPI) => {
const folder: PartialFolder = {
    Name: folderName,
    OwnerId: userId,
    IsPublic: isPublic
}
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(url, folder, {
            headers: {
                 Authorization: `Bearer ${token!.replace(/"/g, '')}`,  
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return true;
    
        } 
        catch (error: any) {
          alert(error);
          return false;
    }
});

export const GetProgectsArchitect = createAsyncThunk('Progect/getProjects', async ({userId}: { userId:number }, thunkAPI) => {
   
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(url, {
                headers: {
                     Authorization: `Bearer ${token!.replace(/"/g, '')}`,  
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            return true;
        
            } 
            catch (error: any) {
              alert(error);
              return false;
        }
    });
const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        user:  {} as PartialFolder,
        loading: false,
        error: ""
    },
    reducers: {
        
    },
    
        
});

export default ProjectSlice.reducer;
