import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import rentalReducer from "./rentalReducer";
import rentalstatsReducer from "./rentalstatsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  rentals: rentalReducer,
  rentalstats: rentalstatsReducer,
});
