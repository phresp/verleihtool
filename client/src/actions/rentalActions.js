import axios from "axios";

import { GET_RENTALS, GET_RENTAL, GET_ERRORS } from "./types";

//Get Rentals
export const getRentals = () => (dispatch) => {
  axios
    .get("/api/rentals")
    .then((res) => dispatch({ type: GET_RENTALS, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_RENTALS,
        payload: {},
      })
    );
};

//Get Rental with id
export const getRentalOfId = (id) => (dispatch) => {
  axios
    .get(`/api/rentals/${id}`)
    .then((res) => dispatch({ type: GET_RENTAL, payload: res.data }))
    .catch((err) =>
      dispatch({
        type: GET_RENTAL,
        payload: {},
      })
    );
};

//CreateRental
export const createRental = (rentalData, history) => (dispatch) => {
  axios
    .post("api/rentals", rentalData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//UpdateRental
export const updateRental = (id, rentalData, history) => (dispatch) => {
  console.log(id);
  axios
    .post(`http://localhost:3000/api/rentals/${id}`, rentalData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Rental
export const deleteRental = (id, history) => (dispatch) => {
  axios
    .delete(`api/rentals/${id}`)
    .then((res) => {
      dispatch({
        type: GET_RENTALS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
