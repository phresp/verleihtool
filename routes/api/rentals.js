const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validateRentalsInput = require("../../validation/rentals");
// const validateLeihobjektInput = require("../../validation/leihobjekt");

//Load Rentals model
const Rentals = require("../../models/Rentals");

// @route   GET /api/users/test
// @desc    Tess users route
// @access  Public
router.get("/test", (req, res) => res.json({msg: "Rentals Works"}));

// @route   GET /api/rentals
// @desc    Get all Rentals
// @access  Private
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Rentals.find()
        .sort({date: -1})
        .then((rentals) => res.json(rentals))
        .catch((err) => res.status(404).json({norentalfound: "Keine Ausleihen gefunden"}));
});

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
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const {errors, isValid} = validateRentalsInput(req.body);
        //Check validation
        if (!isValid) {
            //If not valid, send 400 with errors
            res.status(400).json(errors);
        }

        //Get fields
        const rentalsFields = {}
        rentalsFields.name = req.body.name;
        rentalsFields.tumid = req.body.tumid;
        rentalsFields.email = req.body.email;
        rentalsFields.adresse = req.body.adresse;
        rentalsFields.telefonnummer = req.body.telefonnummer;

        if (req.body.telefonnummer) rentalsFields.telefonnummer = req.body.telefonnummer;
        if (req.body.veranstaltung) rentalsFields.veranstaltung = req.body.veranstaltung;

        //Vertragslaufzeit
        rentalsFields.vertragslaufzeit = {};
        if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
        if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

        if (req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
        if (req.body.angeschrieben) rentalsFields.angeschrieben = req.body.angeschrieben;
        if (req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
        if (req.body.leihscheinverschickt) rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;

        //Leihobjekt
        rentalsFields.leihobjekt = {};
        if (req.body.device) rentalsFields.leihobjekt.device = req.body.device;
        if (req.body.inventorynumber) rentalsFields.leihobjekt.inventorynumber = req.body.inventorynumber;
        if (req.body.rbgnumber) rentalsFields.leihobjekt.rbgnumber = req.body.rbgnumber;
        if (req.body.serialnumber) rentalsFields.leihobjekt.serialnumber = req.body.serialnumber;
        if (req.body.details) rentalsFields.leihobjekt.details = req.body.details;


        new Rentals(rentalsFields).save().then((rentals) => res.json(rentals));
    }
);

// @route   POST api/rentals/:id
// @desc    Edit Rental
// @access  Private
router.post(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const {errors, isValid} = validateRentalsInput(req.body);
        //Check validation
        if (!isValid) {
            //If not valid, send 400 with errors
            res.status(400).json(errors);
        }
        //Get fields
        const rentalsFields = {}
        rentalsFields.name = req.body.name;
        rentalsFields.tumid = req.body.tumid;
        rentalsFields.email = req.body.email;
        rentalsFields.adresse = req.body.adresse;
        rentalsFields.telefonnummer = req.body.telefonnummer;

        if (req.body.telefonnummer) rentalsFields.telefonnummer = req.body.telefonnummer;
        if (req.body.veranstaltung) rentalsFields.veranstaltung = req.body.veranstaltung;

        //Vertragslaufzeit
        rentalsFields.vertragslaufzeit = {};
        if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
        if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

        if (req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
        if (req.body.angeschrieben) rentalsFields.angeschrieben = req.body.angeschrieben;
        if (req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
        if (req.body.leihscheinverschickt) rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;

        //Leihobjekt
        rentalsFields.leihobjekt = {};
        if (req.body.device) rentalsFields.leihobjekt.device = req.body.device;
        if (req.body.inventorynumber) rentalsFields.leihobjekt.inventorynumber = req.body.inventorynumber;
        if (req.body.rbgnumber) rentalsFields.leihobjekt.rbgnumber = req.body.rbgnumber;
        if (req.body.serialnumber) rentalsFields.leihobjekt.serialnumber = req.body.serialnumber;
        if (req.body.details) rentalsFields.leihobjekt.details = req.body.details;


        //Update
        Rentals.findOneAndUpdate(
            {_id: req.params.id},
            {$set: rentalsFields},
            {new: true}
        ).then((rentals) => res.json(rentals))
            .catch((err) => res.status(404).json({norentalfound: "Keine Ausleihen gefunden"}));

    }
);


// @route   DELETE /api/rentals/:id
// @desc    DELETE Rental
// @access  Private
router.delete(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        Rentals.findById(req.params.id)
            .then((rental) => {
                // Delete
                rental.remove().then(() => res.json({success: true}));
            })
            .catch((err) =>
                res.status(404).json({rentalnotfound: "Ausleihe nicht gefunden"})
            );
    }
);


module.exports = router;