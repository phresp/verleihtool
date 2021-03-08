import axios from "axios";

import { GET_RENTALSTATS, GET_ERRORS } from "./types";

//Get Rentals
export const getRentalstats = () => (dispatch) => {
  axios
    .get("/api/rentalstats")
    .then((res) => dispatch({ type: GET_RENTALSTATS, payload: res.data[0] }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};

//Update Rentalstats
export const updateRentalstats = (rentalstatsData, history) => (dispatch) => {
  axios
    .post(`/api/rentalstats`, rentalstatsData)
    .then((res) => history.push("/rentalstats"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};
