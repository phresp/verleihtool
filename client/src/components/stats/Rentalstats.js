import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getRentals } from "../../actions/rentalActions";
import { getRentalstats } from "../../actions/rentalstatsActions";

class Rentalstats extends Component {
  componentDidMount() {
    this.props.getRentals();
    this.props.getRentalstats();
  }

  render() {
    var { rentals } = this.props.rentals;
    var { rentalstats } = this.props.rentalstats;

    var gesamt = {};
    var verliehen = {
      wacom: 0,
      ipad: 0,
      mikrofon: 0,
      stativ: 0,
      webcam: 0,
    };
    if (rentalstats) {
      gesamt.wacom = rentalstats.wacom;
      gesamt.ipad = rentalstats.ipad;
      gesamt.mikrofon = rentalstats.mikrofon;
      gesamt.stativ = rentalstats.stativ;
      gesamt.webcam = rentalstats.webcam;
    }

    if (rentals) {
      rentals.forEach((element) => {
        if (element.status !== "Abgeschlossen")
          if (element.leihobjekt) {
            if (element.leihobjekt.wacom) {
              verliehen.wacom += 1;
            }
            if (element.leihobjekt.ipad) {
              verliehen.ipad += 1;
            }
            if (element.leihobjekt.mikrofon) {
              verliehen.mikrofon += 1;
            }
            if (element.leihobjekt.stativ) {
              verliehen.stativ += 1;
            }
            if (element.leihobjekt.webcam) {
              verliehen.webcam += 1;
            }
          }
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={`/dashboard`} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">Statistik</h1>

            <Link to={`/rentalstats-config`} className={"btn btn-primary"}>
              Statistik konfigurieren
            </Link>
            <p></p>
            <table className={"table"}>
              <thead>
                <tr>
                  <th scope="col">Leihgerät</th>
                  <th scope="col">Verliehen</th>
                  <th scope="col">Gesamt</th>
                  <th scope="col">Offen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>iPad</td>
                  <td>{verliehen.ipad}</td>
                  <td>{gesamt.ipad}</td>
                  <td>{gesamt.ipad - verliehen.ipad}</td>
                </tr>
                <tr>
                  <td>Mikrofon</td>
                  <td>{verliehen.mikrofon}</td>
                  <td>{gesamt.mikrofon}</td>
                  <td>{gesamt.mikrofon - verliehen.mikrofon}</td>
                </tr>
                <tr>
                  <td>Wacom</td>
                  <td>{verliehen.wacom}</td>
                  <td>{gesamt.wacom}</td>
                  <td>{gesamt.wacom - verliehen.wacom}</td>
                </tr>
                <tr>
                  <td>Webcam</td>
                  <td>{verliehen.webcam}</td>
                  <td>{gesamt.webcam}</td>
                  <td>{gesamt.webcam - verliehen.webcam}</td>
                </tr>
                <tr>
                  <td>Stativ</td>
                  <td>{verliehen.stativ}</td>
                  <td>{gesamt.stativ}</td>
                  <td>{gesamt.stativ - verliehen.stativ}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Rentalstats.propTypes = {
  rentals: PropTypes.object.isRequired,
  rentalstats: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
  rentalstats: state.rentalstats,
  auth: state.auth,
  errors: state.errors,
  deleteRental: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getRentals, getRentalstats })(
  withRouter(Rentalstats)
);
