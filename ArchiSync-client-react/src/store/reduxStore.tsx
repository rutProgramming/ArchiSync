import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./UrlSlice";
import idReducer from "./IdSlice";
import userReducer from "./Connect"; 
import messageReducer from "./Message";
import ProgectsReducer from "./Project";
import premmisionReucer from "./Premission";
const store = configureStore({
    reducer: {
        connect: userReducer, 
        url: urlReducer,   
        id: idReducer, 
        projects: ProgectsReducer ,
        messages:messageReducer  ,
        premmision:premmisionReucer
    },
});
   

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

