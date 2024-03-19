import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./reducer";
import planningReducer from "../features/planningSlice";

const store = configureStore({
  reducer: { 
    data: rootReducers,
    planning: planningReducer
  },
  
});

export default store ;
