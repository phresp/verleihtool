import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createRental } from "../../actions/rentalActions";

class CreateRental extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      rgbnumber: "",
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
      rgbnumber: this.state.rgbnumber,
      serialnumber: this.state.serialnumber,
      details: this.state.details,
    };

    this.props.createRental(rentalData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const errors = this.state.errors;
    return (
      <div className={"create-rental"}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Neue Ausleihe</h1>
              <small className="d-block pb-3">* = Pflichtfelder</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Tum-ID"
                  onChange={this.onChange}
                  value={this.state.tumid}
                  name="tumid"
                  error={errors.tumid}
                />
                <TextFieldGroup
                  placeholder="* Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  error={errors.email}
                />
                <TextAreaFieldGroup
                  placeholder="* Adresse"
                  onChange={this.onChange}
                  value={this.state.adresse}
                  name="adresse"
                  error={errors.adresse}
                />
                <TextFieldGroup
                  placeholder="* Telefonnummer"
                  onChange={this.onChange}
                  value={this.state.telefonnummer}
                  name="telefonnummer"
                  error={errors.telefonnummer}
                />
                <TextFieldGroup
                  placeholder="Veranstaltung"
                  onChange={this.onChange}
                  value={this.state.veranstaltung}
                  name="veranstaltung"
                  error={errors.veranstaltung}
                />
                <h6>Vertragslaufzeit von:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.von}
                  name={"von"}
                  error={errors.von}
                />
                <h6>bis:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.bis}
                  name={"bis"}
                  error={errors.bis}
                />
                <TextFieldGroup
                  placeholder="Betreuer"
                  onChange={this.onChange}
                  value={this.state.betreuer}
                  name="betreuer"
                  error={errors.betreuer}
                />
                <h6>Angeschrieben am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.angeschrieben}
                  name={"angeschrieben"}
                  error={errors.angeschrieben}
                />
                <h6>Leihschein verschickt am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.leihscheinverschickt}
                  name={"leihscheinverschickt"}
                  error={errors.leihscheinverschickt}
                />
                <h6>Rückmeldung erhalten am:</h6>
                <TextFieldGroup
                  type={"date"}
                  onChange={this.onChange}
                  value={this.state.rückmeldung}
                  name={"rückmeldung"}
                  error={errors.rückmeldung}
                />
                <TextFieldGroup
                  placeholder="Leihgerät"
                  onChange={this.onChange}
                  value={this.state.device}
                  name="device"
                  error={errors.device}
                />

                <TextFieldGroup
                  placeholder="Inventarnummer"
                  onChange={this.onChange}
                  value={this.state.inventorynumber}
                  name="inventorynumber"
                  error={errors.inventorynumber}
                />

                <TextFieldGroup
                  placeholder="RBG-Nummer"
                  onChange={this.onChange}
                  value={this.state.rbgnumber}
                  name="rbgnumber"
                  error={errors.rbgnumber}
                />

                <TextFieldGroup
                  placeholder="Seriennummer"
                  onChange={this.onChange}
                  value={this.state.serialnumber}
                  name="serialnumber"
                  error={errors.serialnumber}
                />

                <TextAreaFieldGroup
                  placeholder="Details"
                  onChange={this.onChange}
                  value={this.state.details}
                  name="details"
                  error={errors.details}
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

CreateRental.propTypes = {
  rentals: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
  errors: state.errors,
});

export default connect(mapStateToProps, { createRental })(
  withRouter(CreateRental)
);
