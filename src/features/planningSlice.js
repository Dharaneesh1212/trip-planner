import { PLANIT, DELETEIT, EDITIT } from "../app/action";

const initialState = {
  data: [],
};

const planningReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLANIT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case DELETEIT:
      return {
        ...state,
        data: state.data.filter((d) => d.id !== action.payload),
      };

    case EDITIT:
      return {
        ...state,
        data: state.data.map((trip) =>
          trip.id === action.payload.id ? action.payload : trip
        ),
      };

    default:
      return state;
  }
};

export default planningReducer;
