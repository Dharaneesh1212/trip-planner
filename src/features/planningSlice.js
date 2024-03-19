import { PLANIT, DELETEIT, EDITIT } from "../app/action";

const initialState = {
  data: [],
};

const planningReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLANIT:
      const newData = [...state.data];
      newData.push(action.payload);
      return { data: newData };

    case DELETEIT:
      const filteredDataDelete = state.data.filter(
        (d) => d.id !== action.payload
      );
      return { data: filteredDataDelete };

    case EDITIT:
      const filteredDataEdit = state.data.filter(
        (d) => d.id !== action.payload
      );
      return { data: filteredDataEdit };

    default:
      return state;
  }
};

export default planningReducer;
