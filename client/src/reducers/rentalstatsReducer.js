import { GET_RENTALSTATS } from "../actions/types";

const initialState = {
  rentalstats: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RENTALSTATS:
      return {
        ...state,
        rentalstats: action.payload,
      };
    default:
      return state;
  }
}
