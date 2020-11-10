const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RentalsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  vorname: {
    type: String,
    required: true,
  },
  tumid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  telefonnummer: {
    type: String,
    required: true,
  },
  veranstaltung: {
    type: String,
  },
  vertragslaufzeit: {
    von: {
      type: Date,
    },
    bis: {
      type: Date,
    },
  },
  betreuer: {
    type: String,
  },
  angeschrieben: {
    type: Date,
  },
  rückmeldung: {
    type: Date,
  },
  leihscheinverschickt: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  leihobjekt: {
    device: {
      type: String,
    },
    inventorynumber: {
      type: String,
    },
    rbgnumber: {
      type: String,
    },
    serialnumber: {
      type: String,
    },
    details: {
      type: String,
    },
  },
});

module.exports = Rentals = mongoose.model("rentals", RentalsSchema);
