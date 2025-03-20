import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Puser } from "../types/types";
const url = "https://localhost:7218/api/Auth/";

export const SignIn = createAsyncThunk('connect/signIn', async ({ user }: { user: Puser }, thunkAPI) => {
    try {
        const response = await axios.post(url + "login", {
            Password: user.password,
            UserName: user.userName
        });
        console.log(response)
        return {
            Token: response.data.token,
            User: response.data.user,
            RoleName: response.data.roleName

        };
    }
    catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to sign in');
    }
});

export const SignUp = createAsyncThunk('connect/signUp', async ({ user }: { user: Puser }, thunkAPI) => {
    const userDetails = {
        UserName: user.userName,
        Email: user.email,
        PasswordHash: user.password,
        RoleName: user.RoleName,
    };
    try {
        console.log(userDetails);
        const response = await axios.post(url + 'register', userDetails);
        console.log(response);
        return {
            user: {
                id: response.data.userId,
                token: response.data.token,
                mainFolderId: response.data.mainFolderId,
                userName: user.userName,
                email: user.email,
                password: user.password,
                roleName: user.RoleName,
            }


        };
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data || 'Failed to sign up');
    }
});
const loadUserFromSession = (): Puser | null => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
};
const userSlice = createSlice({
    name: 'connect',
    initialState: {
        user: loadUserFromSession() || ({} as Puser),
        loading: false,
        error: ""
    },
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            state.user = {} as Puser;
            state.user.token = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignIn.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(SignIn.fulfilled, (state, action: PayloadAction<{ User: Puser; Token: string, RoleName: string }>) => {
                state.loading = false;
                state.user = { ...action.payload.User };
                state.user.RoleName = action.payload.RoleName;
                sessionStorage.setItem('user', JSON.stringify(state.user));
                sessionStorage.setItem('token', JSON.stringify(action.payload.Token));


            })
            .addCase(SignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to sign in';
            })
            .addCase(SignUp.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(SignUp.fulfilled, (state, action: PayloadAction<{ user: Puser }>) => {
                state.loading = false;
                state.user = action.payload.user;
                sessionStorage.setItem('user', JSON.stringify(state.user));
                sessionStorage.setItem('token', JSON.stringify(state.user.token));


            })
            .addCase(SignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to sign up';
            });



    },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
