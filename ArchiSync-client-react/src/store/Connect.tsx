import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Puser } from "../types/types";



const url = import.meta.env.VITE_BASE_URL+"/api/Auth/"

export const SignIn = createAsyncThunk('connect/signIn', async ({ user }: { user: Puser }, thunkAPI) => {
    try {
        const response = await axios.post(url + "login", {
            Password: user.password,
            UserName: user.userName
        });
        return {
            token: response.data.token,
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
        Password: user.password,
        RoleName: user.RoleName,
    };
    try {
        const response = await axios.post(url + 'register', userDetails);
        return {
            user: {
                userId: response.data.userId,
                token: response.data.token,
                userName: user.userName,
                email: user.email,
                password: user.password,
                RoleName: user.RoleName,
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
            .addCase(SignIn.fulfilled, (state, action: PayloadAction<{ User: Puser; token: string, RoleName: string }>) => {
                state.loading = false;
                state.user = { ...action.payload.User };
                state.user.RoleName = action.payload.RoleName;
                state.user.token = action.payload.token;

                sessionStorage.setItem('user', JSON.stringify(state.user));
                sessionStorage.setItem('token', JSON.stringify(action.payload.token));
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
