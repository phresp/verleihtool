import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";

import {
  getRentalstats,
  updateRentalstats,
} from "../../actions/rentalstatsActions";
import isEmpty from "../../validation/is-empty";

class RentalstatsConfig extends Component {
  componentDidMount() {
    this.props.getRentalstats();
  }

  constructor(props) {
    super(props);
    this.state = {
      ipad: 0,
      mikrofon: 0,
      wacom: 0,
      webcam: 0,
      stativ: 0,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.rentalstats) {
      var { rentalstats } = nextProps.rentalstats;

      rentalstats.ipad = !isEmpty(rentalstats.ipad) ? rentalstats.ipad : 0;
      rentalstats.mikrofon = !isEmpty(rentalstats.mikrofon)
        ? rentalstats.mikrofon
        : 0;
      rentalstats.wacom = !isEmpty(rentalstats.wacom) ? rentalstats.wacom : 0;
      rentalstats.stativ = !isEmpty(rentalstats.stativ)
        ? rentalstats.stativ
        : 0;
      rentalstats.webcam = !isEmpty(rentalstats.webcam)
        ? rentalstats.webcam
        : 0;

      this.setState({
        ipad: rentalstats.ipad,
        mikrofon: rentalstats.mikrofon,
        wacom: rentalstats.wacom,
        stativ: rentalstats.stativ,
        webcam: rentalstats.webcam,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const rentalstatsData = {
      ipad: this.state.ipad,
      mikrofon: this.state.mikrofon,
      wacom: this.state.wacom,
      webcam: this.state.webcam,
      stativ: this.state.stativ,
    };
    this.props.updateRentalstats(rentalstatsData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/rentalstats`} className={"btn btn-light"}>
              back
            </Link>
            <h1 className="display-4 text-center">Leihobjektzahl bearbeiten</h1>
            <hr />
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputGroupsize">Gesamtzahl iPads</label>
                  <TextFieldGroup
                    placeholder="iPads"
                    onChange={this.onChange}
                    value={this.state.ipad}
                    name="ipad"
                    error={errors.ipad}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTutorialhours">
                    Gesamtzahl Mikrofone
                  </label>
                  <TextFieldGroup
                    placeholder="Mikrofone"
                    onChange={this.onChange}
                    value={this.state.mikrofon}
                    name="mikrofon"
                    error={errors.mikrofon}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputGroupsize">
                    Gesamtzahl Wacom Tablets
                  </label>
                  <TextFieldGroup
                    placeholder="Wacom Tablets"
                    onChange={this.onChange}
                    value={this.state.wacom}
                    name="wacom"
                    error={errors.wacom}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTutorialhours">Gesamtzahl Stative</label>
                  <TextFieldGroup
                    placeholder="Stative"
                    onChange={this.onChange}
                    value={this.state.stativ}
                    name="stativ"
                    error={errors.stativ}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputGroupsize">Gesamtzahl Webcams</label>
                  <TextFieldGroup
                    placeholder="Webcams"
                    onChange={this.onChange}
                    value={this.state.webcam}
                    name="webcam"
                    error={errors.webcam}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Bestätigen"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RentalstatsConfig.propTypes = {
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

export default connect(mapStateToProps, { getRentalstats, updateRentalstats })(
  withRouter(RentalstatsConfig)
);
