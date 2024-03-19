import { combineReducers } from "redux";
import { userSlice } from "../features/userSlice";
import { PLANIT, DELETEIT, EDITIT } from "./action";

const rootReducers = combineReducers({
  user: userSlice.reducer,
});

const planIt = (data) => {
  return {
    type: PLANIT,
    payload: data,
  };
};

const deleteIt = (id) => {
  return {
    type: DELETEIT,
    payload: id,
  };
};

const editIt = (id) => {
  return {
    type: EDITIT,
    payload: id,
  };
};

export { rootReducers, planIt, deleteIt, editIt };
