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
  },
  email: {
    type: String,
  },
  adresse: {
    strasse: {
      type: String,
    },
    ort: {
      type: String,
    },
    plz: {
      type: String,
    },
  },
  telefonnummer: {
    type: String,
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
  lasthandle: {
    type: String,
  },
  status: {
    type: String,
  },
  rückgabe: {
    type: Date,
  },
  leihobjekt: {
    ipad: {
      type: Boolean,
    },
    mikrofon: {
      type: Boolean,
    },
    wacom: {
      type: Boolean,
    },
    webcam: {
      type: Boolean,
    },
    stativ: {
      type: Boolean,
    },
  },
  details: {
    type: String,
  },
});

module.exports = Rentals = mongoose.model("rentals", RentalsSchema);
