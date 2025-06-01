import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Connect"; 
import messageReducer from "./Message";
import ProgectsReducer from "./Project";
import premmisionReucer from "./Premission";
import filesReducer from "./File";
const store = configureStore({
    reducer: {
        connect: userReducer, 
        projects: ProgectsReducer ,
        messages:messageReducer  ,
        premmision:premmisionReucer,
        files:filesReducer
    },
});
   

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

