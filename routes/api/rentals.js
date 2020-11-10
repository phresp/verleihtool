const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys_dev");
const passport = require("passport");
const pdftk = require("node-pdftk");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

//pdftk config TOTO: Make Environment Variable
pdftk.configure({
  bin: "H:\\PDFtk\\bin\\pdftk.exe",
});

//Leihschein-Template-Path
const pdfTemplatePath = path.resolve(
  __dirname + "../../../templates/Leihschein-Template.pdf"
);

//PDF Outout Path Keep for debugging purposes
// const pdfOutputPath = path.resolve(
//   __dirname + "../../../templates/Leihschein-Template-filled.pdf"
// );

//Load input validation
const validateRentalsInput = require("../../validation/rentals");
// const validateLeihobjektInput = require("../../validation/leihobjekt");

//Load Rentals model
const Rentals = require("../../models/Rentals");

// @route   GET /api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Rentals Works" }));

// @route   GET /api/rentals
// @desc    Get all Rentals
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Rentals.find()
      .sort({ date: -1 })
      .then((rentals) => res.json(rentals))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Ausleihen gefunden" })
      );
  }
);

// @route   GET /api/rentals/:id
// @desc    Get Rental by id
// @access  Private
router.get("/:id", (req, res) => {
  const errors = {};
  Rentals.findOne({ _id: req.params.id })
    .then((rental) => {
      res.json(rental);
    })
    .catch((err) =>
      res.status(404).json({ rentalnotfound: "Keine Ausleihen gefunden" })
    );
});

// @route   Post /api/rentals
// @desc    Post new Rental
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRentalsInput(req.body);
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      res.status(400).json(errors);
    }

    //Get fields
    const rentalsFields = {};
    rentalsFields.name = req.body.name;
    rentalsFields.vorname = req.body.vorname;
    rentalsFields.tumid = req.body.tumid;
    rentalsFields.email = req.body.email;
    rentalsFields.adresse = req.body.adresse;
    rentalsFields.telefonnummer = req.body.telefonnummer;

    if (req.body.telefonnummer)
      rentalsFields.telefonnummer = req.body.telefonnummer;
    if (req.body.veranstaltung)
      rentalsFields.veranstaltung = req.body.veranstaltung;

    //Vertragslaufzeit
    rentalsFields.vertragslaufzeit = {};
    if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
    if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

    if (req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
    if (req.body.angeschrieben)
      rentalsFields.angeschrieben = req.body.angeschrieben;
    if (req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
    if (req.body.leihscheinverschickt)
      rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;

    //Leihobjekt
    rentalsFields.leihobjekt = {};
    if (req.body.device) rentalsFields.leihobjekt.device = req.body.device;
    if (req.body.inventorynumber)
      rentalsFields.leihobjekt.inventorynumber = req.body.inventorynumber;
    if (req.body.rbgnumber)
      rentalsFields.leihobjekt.rbgnumber = req.body.rbgnumber;
    if (req.body.serialnumber)
      rentalsFields.leihobjekt.serialnumber = req.body.serialnumber;
    if (req.body.details) rentalsFields.leihobjekt.details = req.body.details;

    new Rentals(rentalsFields).save().then((rentals) => res.json(rentals));
  }
);

// @route   POST api/rentals/:id
// @desc    Edit Rental
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRentalsInput(req.body);
    //Check validation
    if (!isValid) {
      //If not valid, send 400 with errors
      res.status(400).json(errors);
    }
    //Get fields
    const rentalsFields = {};
    rentalsFields.name = req.body.name;
    rentalsFields.vorname = req.body.vorname;
    rentalsFields.tumid = req.body.tumid;
    rentalsFields.email = req.body.email;
    rentalsFields.adresse = req.body.adresse;
    rentalsFields.telefonnummer = req.body.telefonnummer;

    if (req.body.telefonnummer)
      rentalsFields.telefonnummer = req.body.telefonnummer;
    if (req.body.veranstaltung)
      rentalsFields.veranstaltung = req.body.veranstaltung;

    //Vertragslaufzeit
    rentalsFields.vertragslaufzeit = {};
    if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
    if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

    if (req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
    if (req.body.angeschrieben)
      rentalsFields.angeschrieben = req.body.angeschrieben;
    if (req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
    if (req.body.leihscheinverschickt)
      rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;

    //Leihobjekt
    rentalsFields.leihobjekt = {};
    if (req.body.device) rentalsFields.leihobjekt.device = req.body.device;
    if (req.body.inventorynumber)
      rentalsFields.leihobjekt.inventorynumber = req.body.inventorynumber;
    if (req.body.rbgnumber)
      rentalsFields.leihobjekt.rbgnumber = req.body.rbgnumber;
    if (req.body.serialnumber)
      rentalsFields.leihobjekt.serialnumber = req.body.serialnumber;
    if (req.body.details) rentalsFields.leihobjekt.details = req.body.details;

    //Update

    Rentals.findOneAndUpdate(
      { _id: req.params.id },
      { $set: rentalsFields },
      { new: true }
    )
      .then((rentals) => res.json(rentals))
      .catch((err) =>
        res.status(404).json({ norentalfound: "Keine Ausleihen gefunden" })
      );
  }
);

// @route   DELETE /api/rentals/:id
// @desc    DELETE Rental
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Rentals.findById(req.params.id)
      .then((rental) => {
        // Delete
        rental.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch((err) => {
        res.status(404).json({ rentalnotfound: "Ausleihe nicht gefunden" });
      });
  }
);

// @route   GET /api/rentals/download/rentalform
// @desc    GET Filled pdf
// @access  Private
router.post(
  "/download/rentalform",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var issuer = req.body.user.user.name;
    const formdata = {
      name: req.body.name + ", " + req.body.vorname,
      tumid: req.body.tumid,
      adresse: req.body.adresse,
      telefonnummer: req.body.telefonnummer,
      aussteller: issuer,
      nutzung: req.body.veranstaltung,
      rückgabe: "todo",
      device: req.body.device,
      details: req.body.details,
      date: moment.utc(Date.now()).format("DD-MM-YYYY"),
    };
    pdftk
      .input(pdfTemplatePath)
      .fillForm(formdata)
      .output()
      .then((buf) => {
        res.type("application/pdf");
        res.send(buf);
      })
      .catch((err) => {
        res.status(404).json({ err });
      });
  }
);

module.exports = router;
