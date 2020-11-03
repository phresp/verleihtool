import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import rentalReducer from "./rentalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  rentals: rentalReducer,
});
