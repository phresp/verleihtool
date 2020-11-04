const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRentalsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.tumid = !isEmpty(data.tumid) ? data.tumid : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.adresse = !isEmpty(data.adresse) ? data.adresse : "";
  data.telefonnummer = !isEmpty(data.telefonnummer) ? data.telefonnummer : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name muss zwischen 2 und 30 Zeichen besitzen";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Das Name Feld darf nicht leer sein";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Das Email Feld darf nicht leer sein";
  }

  if (Validator.isEmpty(data.tumid)) {
    errors.tumid = "Das Feld TUM-ID darf nicht leer sein";
  }

  if (Validator.isEmpty(data.adresse)) {
    errors.adresse = "Das Adressfeld darf nicht leer sein";
  }

  if (Validator.isEmpty(data.telefonnummer)) {
    errors.telefonnummer = "Die Telefonnummer darf nicht leer sein";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
