import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./UrlSlice";
import idReducer from "./IdSlice";
import userReducer from "./Connect"; 
import ProgectsReducer from "./Folder";

const store = configureStore({
    reducer: {
        connect: userReducer, 
        Projects:ProgectsReducer,
        url: urlReducer,   
        id: idReducer, 
        projects: ProgectsReducer    
    },
});
   

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
