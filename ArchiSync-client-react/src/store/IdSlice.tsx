import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const idSlice = createSlice({
    name: "id",
    initialState: 0,
    reducers: {
        setId: (state, action: PayloadAction<number>) => action.payload,
    },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;
