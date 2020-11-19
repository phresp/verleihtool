const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.handle = !isEmpty(data.handle) ? data.handle : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Der Name muss zwischen 2 und 30 Zeichen lang sein";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Ihr Name wird benötigt";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Das Email Feld wird benötigt";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email nicht gültig";
  }

  if (!Validator.isLength(data.handle, { min: 2, max: 4 })) {
    errors.handle = "Kürzel muss zwischen 2 und 4 Zeichen lang sein";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Das Kürzel wird benötigt";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Das Password Feld wird benötigt";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Das Password muss mindesten 6 Zeichen lang sein";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Das Passwort bestätigen Feld wird benötigt";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Die Passwörter stimmen nicht überein";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
