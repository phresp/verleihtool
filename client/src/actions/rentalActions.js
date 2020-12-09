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
    .post("/api/rentals", rentalData)
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
  axios
    .post(`/api/rentals/${id}`, rentalData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Rental
export const deleteRental = (id) => (dispatch, history) => {
  if (
    window.confirm(
      "Sind Sie sicher? Dieser Vorgang kann NICHT rückgängig gemacht werden!"
    )
  ) {
    axios.delete(`/api/rentals/${id}`).catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
  }
};

//downloadRentalform
export const downloadRentalform = (rentalData) => (dispatch) => {
  axios({
    url: "/api/rentals/download/rentalform",
    method: "POST",
    responseType: "blob",
    data: rentalData,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Leihschein-${rentalData.tumid}.pdf`);
    document.body.appendChild(link);
    link.click();
  });
};
