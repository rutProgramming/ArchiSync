import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
    name: "url",
    initialState: { value: "https://localhost:7034/api/Auth/" }, 
    reducers: {} 
});

export default urlSlice.reducer;
