import axios from "axios";

import {
    GET_RENTALS
} from "./types";

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
