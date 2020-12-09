import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getRentalOfId } from "../../actions/rentalActions";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import moment from "moment";

import { updateRental } from "../../actions/rentalActions";
import { downloadRentalform } from "../../actions/rentalActions";
import { deleteRental } from "../../actions/rentalActions";

class ViewRental extends Component {
  componentDidMount() {
    this.props.getRentalOfId(this.props.match.params.id);
  }

  onDeleteClick(id) {
    this.props.deleteRental(id);
  }

  constructor(props) {
    super(props);
    this.state = {
      processable: true,
      name: "",
      vorname: "",
      tumid: "",
      email: "",
      strasse: "",
      plz: "",
      ort: "",
      telefonnummer: "",
      veranstaltung: "",
      von: "",
      bis: "",
      betreuer: "",
      angeschrieben: "",
      rückmeldung: "",
      leihscheinverschickt: "",
      rückgabe: "",
      ipad: true,
      mikrofon: true,
      wacom: true,
      webcam: true,
      stativ: true,
      details: "",
      status: "",
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

      //Check if Leihobjekt is there
      rental.leihobjekt = !isEmpty(rental.leihobjekt) ? rental.leihobjekt : {};
      rental.vertragslaufzeit = !isEmpty(rental.vertragslaufzeit)
        ? rental.vertragslaufzeit
        : {};
      rental.adresse = !isEmpty(rental.adresse) ? rental.adresse : {};

      //If rental field doesn't exist, make empty string
      rental.name = !isEmpty(rental.name) ? rental.name : "";
      rental.vorname = !isEmpty(rental.vorname) ? rental.vorname : "";
      rental.tumid = !isEmpty(rental.tumid) ? rental.tumid : "";
      rental.email = !isEmpty(rental.email) ? rental.email : "";
      rental.adresse.strasse = !isEmpty(rental.adresse.strasse)
        ? rental.adresse.strasse
        : "";
      rental.adresse.plz = !isEmpty(rental.adresse.plz)
        ? rental.adresse.plz
        : "";
      rental.adresse.ort = !isEmpty(rental.adresse.ort)
        ? rental.adresse.ort
        : "";
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
      rental.rückgabe = !isEmpty(rental.rückgabe) ? rental.rückgabe : "";

      //Leihgerätefelder
      rental.leihobjekt.ipad = !isEmpty(rental.leihobjekt.ipad)
        ? rental.leihobjekt.ipad
        : false;

      rental.leihobjekt.mikrofon = !isEmpty(rental.leihobjekt.mikrofon)
        ? rental.leihobjekt.mikrofon
        : false;

      rental.leihobjekt.wacom = !isEmpty(rental.leihobjekt.wacom)
        ? rental.leihobjekt.wacom
        : false;

      rental.leihobjekt.webcam = !isEmpty(rental.leihobjekt.webcam)
        ? rental.leihobjekt.webcam
        : false;

      rental.leihobjekt.stativ = !isEmpty(rental.leihobjekt.stativ)
        ? rental.leihobjekt.stativ
        : false;

      rental.details = !isEmpty(rental.details) ? rental.details : "";
      rental.status = !isEmpty(rental.status) ? rental.status : "";

      //Set component fields state
      this.setState({
        id: rental._id,
        name: rental.name,
        vorname: rental.vorname,
        tumid: rental.tumid,
        email: rental.email,
        strasse: rental.adresse.strasse,
        plz: rental.adresse.plz,
        ort: rental.adresse.ort,
        telefonnummer: rental.telefonnummer,
        veranstaltung: rental.veranstaltung,
        von: rental.vertragslaufzeit.von,
        bis: rental.vertragslaufzeit.bis,
        betreuer: rental.betreuer,
        angeschrieben: rental.angeschrieben,
        rückmeldung: rental.rückmeldung,
        leihscheinverschickt: rental.leihscheinverschickt,
        rückgabe: rental.rückgabe,
        ipad: rental.leihobjekt.ipad,
        mikrofon: rental.leihobjekt.mikrofon,
        wacom: rental.leihobjekt.wacom,
        webcam: rental.leihobjekt.webcam,
        stativ: rental.leihobjekt.stativ,
        details: rental.details,
        status: rental.status,
      });
    }
  }

  onDownloadClick(e) {
    e.preventDefault();
    const rentalData = {
      name: this.state.name,
      vorname: this.state.vorname,
      tumid: this.state.tumid,
      email: this.state.email,
      strasse: this.state.strasse,
      plz: this.state.plz,
      ort: this.state.ort,
      telefonnummer: this.state.telefonnummer,
      veranstaltung: this.state.veranstaltung,
      von: this.state.von,
      bis: this.state.bis,
      betreuer: this.state.betreuer,
      angeschrieben: this.state.angeschrieben,
      rückmeldung: this.state.rückmeldung,
      leihscheinverschickt: this.state.leihscheinverschickt,
      rückgabe: this.state.rückgabe,
      ipad: this.state.ipad,
      mikrofon: this.state.mikrofon,
      wacom: this.state.wacom,
      webcam: this.state.webcam,
      stativ: this.state.stativ,
      details: this.state.details,
      status: this.state.status,
    };
    this.props.downloadRentalform(rentalData);
  }

  onSubmit(e) {
    e.preventDefault();
    const rentalData = {
      name: this.state.name,
      vorname: this.state.vorname,
      tumid: this.state.tumid,
      email: this.state.email,
      strasse: this.state.strasse,
      plz: this.state.plz,
      ort: this.state.ort,
      telefonnummer: this.state.telefonnummer,
      veranstaltung: this.state.veranstaltung,
      von: this.state.von,
      bis: this.state.bis,
      betreuer: this.state.betreuer,
      angeschrieben: this.state.angeschrieben,
      rückmeldung: this.state.rückmeldung,
      leihscheinverschickt: this.state.leihscheinverschickt,
      rückgabe: this.state.rückgabe,
      ipad: this.state.ipad,
      mikrofon: this.state.mikrofon,
      wacom: this.state.wacom,
      webcam: this.state.webcam,
      stativ: this.state.stativ,
      details: this.state.details,
      status: this.state.status,
    };
    this.props.updateRental(this.state.id, rentalData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const statusOptions = [
      { label: "Unvollständig", value: "Unvollständig" },
      { label: "LS verschickt", value: "LS verschicktw" },
      { label: "HW ausgegeben", value: "HW ausgegeben" },
      { label: "Abgeschlossen", value: "Abgeschlossen" },
    ];

    return (
      <div className="edit-rental">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3>
                Ausleihe von {this.state.vorname} {this.state.name}
              </h3>
              <form onSubmit={this.onSubmit}>
                <div className="mb-4">
                  <div className="col">
                    <div className="btn-group">
                      <button
                        type="button"
                        onClick={() => {
                          this.setState((prevState) => ({
                            processable: !prevState.processable,
                          }));
                        }}
                        className="btn btn-dark"
                      >
                        Bearbeiten an/aus
                      </button>
                      <button
                        type="button"
                        onClick={this.onDownloadClick.bind(this)}
                        className="btn btn-info"
                      >
                        PDF exportieren
                      </button>
                      <button onClick="Submit" className="btn btn-primary">
                        Bestätigen
                      </button>
                      <button
                        onClick={this.onDeleteClick.bind(this, this.state.id)}
                        className="btn btn-danger"
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                  <p></p>
                  <h6>Status der Leihe:</h6>
                  <SelectListGroup
                    placeholder="* Status"
                    onChange={this.onChange}
                    value={this.state.status}
                    name="status"
                    error={errors.status}
                    options={statusOptions}
                    disabled={this.state.processable ? "disabled" : ""}
                  />
                </div>

                <h6>Leihgeräte</h6>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="ipad"
                      onChange={() => {
                        this.setState((prevState) => ({
                          ipad: !prevState.ipad,
                        }));
                      }}
                      checked={this.state.ipad}
                      value={this.state.ipad}
                      disabled={this.state.processable ? "disabled" : ""}
                    />
                    <label className="form-check-label" htmlFor="ipad">
                      iPad Pro
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mikrofon"
                      onChange={() => {
                        this.setState((prevState) => ({
                          mikrofon: !prevState.mikrofon,
                        }));
                      }}
                      checked={this.state.mikrofon}
                      value={this.state.mikrofon}
                      disabled={this.state.processable ? "disabled" : ""}
                    />
                    <label className="form-check-label" htmlFor="mikrofon">
                      Mikrofon
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="wacom"
                      onChange={() => {
                        this.setState((prevState) => ({
                          wacom: !prevState.wacom,
                        }));
                      }}
                      value={this.state.wacom}
                      checked={this.state.wacom}
                      disabled={this.state.processable ? "disabled" : ""}
                    />
                    <label className="form-check-label" htmlFor="wacom">
                      Wacom Tablet
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="webcam"
                      onChange={() => {
                        this.setState((prevState) => ({
                          webcam: !prevState.webcam,
                        }));
                      }}
                      value={this.state.webcam}
                      checked={this.state.webcam}
                      disabled={this.state.processable ? "disabled" : ""}
                    />
                    <label className="form-check-label" htmlFor="webcam">
                      Webcam
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="stativ"
                      onChange={() => {
                        this.setState((prevState) => ({
                          stativ: !prevState.stativ,
                        }));
                      }}
                      value={this.state.stativ}
                      checked={this.state.stativ}
                      disabled={this.state.processable ? "disabled" : ""}
                    />
                    <label className="form-check-label" htmlFor="stativ">
                      Mikrofonstativ
                    </label>
                    <div></div>
                  </div>
                </div>

                <h6>Details:</h6>
                <TextAreaFieldGroup
                  placeholder="Bemerkungen"
                  onChange={this.onChange}
                  value={this.state.details}
                  name="details"
                  error={errors.details}
                  disabled={this.state.processable ? "disabled" : ""}
                />

                <h6>Name:</h6>
                <TextFieldGroup
                  placeholder="* 'Name'"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Vorname:</h6>
                <TextFieldGroup
                  placeholder="* 'Vorname'"
                  onChange={this.onChange}
                  value={this.state.vorname}
                  name="vorname"
                  error={errors.vorname}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>TUM-ID:</h6>
                <TextFieldGroup
                  placeholder="TUM-ID"
                  onChange={this.onChange}
                  value={this.state.tumid}
                  name="tumid"
                  error={errors.tumid}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Email-Adresse:</h6>
                <TextFieldGroup
                  placeholder="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  error={errors.email}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Anschrift:</h6>
                <h6>Straße:</h6>
                <TextFieldGroup
                  placeholder="Straße"
                  onChange={this.onChange}
                  value={this.state.strasse}
                  name="strasse"
                  error={errors.strasse}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Postleitzahl:</h6>
                <TextFieldGroup
                  placeholder="Postleitzahl"
                  onChange={this.onChange}
                  value={this.state.plz}
                  name="plz"
                  error={errors.plz}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Ort:</h6>
                <TextFieldGroup
                  placeholder="Ort"
                  onChange={this.onChange}
                  value={this.state.ort}
                  name="ort"
                  error={errors.ort}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Telefonnummer:</h6>
                <TextFieldGroup
                  placeholder="Telefonnummer"
                  onChange={this.onChange}
                  value={this.state.telefonnummer}
                  name="telefonnummer"
                  error={errors.telefonnummer}
                  disabled={this.state.processable ? "disabled" : ""}
                />
                <h6>Veranstaltung:</h6>
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
                <h6>Betreuer:</h6>
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

                <h6>Vorraussichtliche Rückgabe:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={moment.utc(this.state.rückgabe).format("YYYY-MM-DD")}
                  name={"rückgabe"}
                  error={errors.rückgabe}
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
  deleteRental: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  getRentalOfId,
  updateRental,
  downloadRentalform,
  deleteRental,
})(withRouter(ViewRental));
