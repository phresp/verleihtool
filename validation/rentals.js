const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRentalsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.vorname = !isEmpty(data.vorname) ? data.vorname : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Das Name Feld darf nicht leer sein";
  }

  if (Validator.isEmpty(data.vorname)) {
    errors.vorname = "Das Vorname Feld darf nicht leer sein";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status Feld wird benötigt";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
