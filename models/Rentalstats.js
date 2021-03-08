const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RentalstatsSchema = new Schema({
  ipad: {
    type: Number,
  },
  mikrofon: {
    type: Number,
  },
  wacom: {
    type: Number,
  },
  webcam: {
    type: Number,
  },
  stativ: {
    type: Number,
  },
});

module.exports = Rentalstats = mongoose.model("rentalstats", RentalstatsSchema);
