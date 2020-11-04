import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getRentalOfId, getRentals } from "../../actions/rentalActions";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import moment from "moment";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import rentalReducer from "../../reducers/rentalReducer";

import { updateRental } from "../../actions/rentalActions";

class ViewRental extends Component {
  componentDidMount() {
    this.props.getRentalOfId(this.props.match.params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      processable: true,
      name: "",
      tumid: "",
      email: "",
      adresse: "",
      telefonnummer: "",
      veranstaltung: "",
      von: "",
      bis: "",
      betreuer: "",
      angeschrieben: "",
      rückmeldung: "",
      leihscheinverschickt: "",
      device: "",
      inventorynumber: "",
      rbgnumber: "",
      serialnumber: "",
      details: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.rentals.rental) {
      const rental = nextProps.rentals.rental;

      //Check if Leihobject is there
      rental.leihobjekt = !isEmpty(rental.leihobjekt) ? rental.leihobjekt : {};
      rental.vertragslaufzeit = !isEmpty(rental.vertragslaufzeit)
        ? rental.vertragslaufzeit
        : {};

      //If rental field doesn't exist, make empty string
      rental.name = !isEmpty(rental.name) ? rental.name : "";
      rental.tumid = !isEmpty(rental.tumid) ? rental.tumid : "";
      rental.email = !isEmpty(rental.email) ? rental.email : "";
      rental.adresse = !isEmpty(rental.adresse) ? rental.adresse : "";
      rental.telefonnummer = !isEmpty(rental.telefonnummer)
        ? rental.telefonnummer
        : "";
      rental.veranstaltung = !isEmpty(rental.veranstaltung)
        ? rental.veranstaltung
        : "";
      rental.betreuer = !isEmpty(rental.betreuer) ? rental.betreuer : "";

      //Dates
      rental.vertragslaufzeit.von = !isEmpty(rental.vertragslaufzeit.von)
        ? rental.vertragslaufzeit.von
        : "";
      rental.vertragslaufzeit.bis = !isEmpty(rental.vertragslaufzeit.bis)
        ? rental.vertragslaufzeit.bis
        : "";
      rental.angeschrieben = !isEmpty(rental.angeschrieben)
        ? rental.angeschrieben
        : "";
      rental.rückmeldung = !isEmpty(rental.rückmeldung)
        ? rental.rückmeldung
        : "";
      rental.leihscheinverschickt = !isEmpty(rental.leihscheinverschickt)
        ? rental.leihscheinverschickt
        : "";

      //Leihgerätefelder
      rental.device = !isEmpty(rental.leihobjekt.device)
        ? rental.leihobjekt.device
        : "";
      rental.inventorynumber = !isEmpty(rental.leihobjekt.inventorynumber)
        ? rental.inventorynumber
        : "";
      rental.rbgnumber = !isEmpty(rental.leihobjekt.rbgnumber)
        ? rental.leihobjekt.rbgnumber
        : "";
      rental.serialnumber = !isEmpty(rental.leihobjekt.serialnumber)
        ? rental.leihobjekt.serialnumber
        : "";
      rental.details = !isEmpty(rental.leihobjekt.details)
        ? rental.leihobjekt.details
        : "";

      //Set component fields state
      this.setState({
        id: rental._id,
        name: rental.name,
        tumid: rental.tumid,
        email: rental.email,
        adresse: rental.adresse,
        telefonnummer: rental.telefonnummer,
        veranstaltung: rental.veranstaltung,
        von: rental.vertragslaufzeit.von,
        bis: rental.vertragslaufzeit.bis,
        betreuer: rental.betreuer,
        angeschrieben: rental.angeschrieben,
        rückmeldung: rental.rückmeldung,
        leihscheinverschickt: rental.leihscheinverschickt,
        device: rental.device,
        inventorynumber: rental.inventorynumber,
        rbgnumber: rental.rbgnumber,
        serialnumber: rental.serialnumber,
        details: rental.details,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const rentalData = {
      name: this.state.name,
      tumid: this.state.tumid,
      email: this.state.email,
      adresse: this.state.adresse,
      telefonnummer: this.state.telefonnummer,
      veranstaltung: this.state.veranstaltung,
      von: this.state.von,
      bis: this.state.bis,
      betreuer: this.state.betreuer,
      angeschrieben: this.state.angeschrieben,
      rückmeldung: this.state.rückmeldung,
      leihscheinverschickt: this.state.leihscheinverschickt,
      device: this.state.device,
      inventorynumber: this.state.inventorynumber,
      rbgnumber: this.state.rbgnumber,
      serialnumber: this.state.serialnumber,
      details: this.state.details,
    };
    console.log(this.state.id);
    this.props.updateRental(this.state.id, rentalData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, processable } = this.state;
    console.log(errors);
    return (
      <div className="edit-rental">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3>Ausleihe von {this.state.name}</h3>
              <form onSubmit={this.onSubmit}>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        processable: !prevState.processable,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Bearbeiten an/aus
                  </button>
                </div>

                <TextFieldGroup
                  placeholder="* 'Name'"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <TextFieldGroup
                  placeholder="* Tum-ID"
                  onChange={this.onChange}
                  value={this.state.tumid}
                  name="tumid"
                  error={errors.tumid}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="* Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  error={errors.email}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextAreaFieldGroup
                  placeholder="* Adresse"
                  onChange={this.onChange}
                  value={this.state.adresse}
                  name="adresse"
                  error={errors.adresse}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="* Telefonnummer"
                  onChange={this.onChange}
                  value={this.state.telefonnummer}
                  name="telefonnummer"
                  error={errors.telefonnummer}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="Veranstaltung"
                  onChange={this.onChange}
                  value={this.state.veranstaltung}
                  name="veranstaltung"
                  error={errors.veranstaltung}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Vertragslaufzeit von:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={moment.utc(this.state.von).format("YYYY-MM-DD")}
                  name={"von"}
                  error={errors.von}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>bis:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={moment.utc(this.state.bis).format("YYYY-MM-DD")}
                  name={"bis"}
                  error={errors.bis}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="Betreuer"
                  onChange={this.onChange}
                  value={this.state.betreuer}
                  name="betreuer"
                  error={errors.betreuer}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Angeschrieben am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={moment
                    .utc(this.state.angeschrieben)
                    .format("YYYY-MM-DD")}
                  name={"angeschrieben"}
                  error={errors.angeschrieben}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Leihschein verschickt am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={moment
                    .utc(this.state.leihscheinverschickt)
                    .format("YYYY-MM-DD")}
                  name={"leihscheinverschickt"}
                  error={errors.leihscheinverschickt}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Rückmeldung erhalten am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={moment
                    .utc(this.state.rückmeldung)
                    .format("YYYY-MM-DD")}
                  name={"rückmeldung"}
                  error={errors.rückmeldung}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <TextFieldGroup
                  placeholder="Leihgerät"
                  onChange={this.onChange}
                  value={this.state.device}
                  name="device"
                  error={errors.device}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <TextFieldGroup
                  placeholder="Inventarnummer"
                  onChange={this.onChange}
                  value={this.state.inventorynumber}
                  name="inventorynumber"
                  error={errors.inventorynumber}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <TextFieldGroup
                  placeholder="RBG-Nummer"
                  onChange={this.onChange}
                  value={this.state.rbgnumber}
                  name="rbgnumber"
                  error={errors.rbgnumber}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <TextFieldGroup
                  placeholder="Seriennummer"
                  onChange={this.onChange}
                  value={this.state.serialnumber}
                  name="serialnumber"
                  error={errors.serialnumber}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <TextAreaFieldGroup
                  placeholder="Details"
                  onChange={this.onChange}
                  value={this.state.details}
                  name="details"
                  error={errors.details}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <input
                  type="submit"
                  value="Bestätigen"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewRental.propTypes = {
  getRentalOfId: PropTypes.func.isRequired,
  updateRental: PropTypes.func.isRequired,
  rentals: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getRentalOfId, updateRental })(
  withRouter(ViewRental)
);
