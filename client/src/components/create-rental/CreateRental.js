import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateRental extends Component {
    render() {
        return (
            <div>

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

export default connect(mapStateToProps)(withRouter(CreateProfile));