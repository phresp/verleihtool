const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validateRentalsInput = require("../../validation/rentals");

//Load Rentals model
const Rentals = require("../../models/Rentals");

// @route   GET /api/users/test
// @desc    Tess users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Rentals Works" }));

// @route   GET /api/rentals
// @desc    Get Rentals
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Rentals.find()
        .sort({ date: -1 })
        .then((rentals) => res.json(rentals))
        .catch((err) => res.status(404).json({ norentalfound: "Kein Ausleihen gefunden" }));
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
        const rentalsFields = {}
        rentalsFields.name = req.body.name;
        rentalsFields.tumid= req.body.tumid;
        rentalsFields.email= req.body.email;
        rentalsFields.adresse= req.body.adresse;
        rentalsFields.telefonnummer= req.body.telefonnummer;

        if(req.body.telefonnummer) rentalsFields.telefonnummer = req.body.telefonnummer;
        if(req.body.veranstaltung) rentalsFields.veranstaltung = req.body.veranstaltung;

        //vertragslaufzeit
        rentalsFields.vertragslaufzeit = {};
        if (req.body.von) rentalsFields.vertragslaufzeit.von = req.body.von;
        if (req.body.bis) rentalsFields.vertragslaufzeit.bis = req.body.bis;

        if(req.body.betreuer) rentalsFields.betreuer = req.body.betreuer;
        if(req.body.angeschrieben) rentalsFields.angeschrieben = req.body.angeschrieben;
        if(req.body.rückmeldung) rentalsFields.rückmeldung = req.body.rückmeldung;
        if(req.body.leihscheinverschickt) rentalsFields.leihscheinverschickt = req.body.leihscheinverschickt;


        new Rentals(rentalsFields).save().then((rentals) => res.json(rentals));
    }
);


module.exports = router;