import { GET_RENTALS, GET_RENTAL } from "../actions/types";

const initialState = {
  rentals: null,
  rental: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RENTALS:
      return {
        ...state,
        rentals: action.payload,
        rental: null,
        loading: false,
      };
    case GET_RENTAL:
      return {
        ...state,
        rentals: null,
        rental: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
