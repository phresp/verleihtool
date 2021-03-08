const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Rentals model
const Rentals = require("../../models/Rentals");
const Rentalstats = require("../../models/Rentalstats");

// @route   GET /api/rentalstats/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Rentalstats Works" }));

// @route   GET /api/rentalstats
// @desc    Get all Rentalstats
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Rentalstats.find()
      .then((rentalstats) => res.json(rentalstats))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Statistiken gefunden" })
      );
  }
);

// @route   POSt /api/rentalstats
// @desc    Create or update Rentalstats
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Body Fields
    const rentalstatsFields = {};
    rentalstatsFields.ipad = req.body.ipad;
    rentalstatsFields.mikrofon = req.body.mikrofon;
    rentalstatsFields.wacom = req.body.wacom;
    rentalstatsFields.webcam = req.body.webcam;
    rentalstatsFields.stativ = req.body.stativ;
    Rentalstats.update({}, { $set: rentalstatsFields }, { new: true })
      .then((rentalstats) => res.send(rentalstats))
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
