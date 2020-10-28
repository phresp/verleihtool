const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVerleihobjektInput(data) {
    let errors = {};

    data.device = !isEmpty(data.device) ? data.device : "";
    data.inventorynumber = !isEmpty(data.inventorynumber) ? data.inventorynumber : "";
    data.rbgnumber = !isEmpty(data.rbgnumber) ? data.rbgnumber : "";
    data.serialnumber = !isEmpty(data.serialnumber) ? data.serialnumber : "";

    if (Validator.isEmpty(data.device)) {
        errors.device = "Das Device muss angegeben werden";
    }

    if (Validator.isEmpty(data.inventorynumber)) {
        errors.inventorynumber = "Die Inventar-Nummer muss angegeben werden";
    }

    if (Validator.isEmpty(data.rbgnummer)) {
        errors.rbgnummer = "Die RBG-Nummer muss angegeben werden";
    }

    if (Validator.isEmpty(data.serialnumber)) {
        errors.serialnumber = "Die Seriennummer muss angegeben werden";
    }

    return {
        errors: errors,
        isValid: isEmpty(errors),
    };
};
