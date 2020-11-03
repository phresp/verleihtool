import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getRentals} from "../../actions/rentalActions";


class Dashboard extends Component {
    componentDidMount() {
        this.props.getRentals();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const rentals = this.props.rentals.rentals
        let leihen;
        if(rentals){
            leihen = rentals.map((rents) => (
                <tr key={rents._id}>
                    <td>{rents.name}</td>
                    <td>{rents.tumid}</td>
                    <td>{rents.email}</td>
                    <td>{rents.adresse}</td>
                    <td>{rents.telefonnummer}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ));
        } else {
           leihen = [];
        }


        return (
            <div>
                <h4 className="mb-4">Ausleihen</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>TUM-ID</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Telefonnummer</th>
                    </tr>
                    {leihen}
                    </thead>
                </table>
            </div>
        );}

}

Dashboard.propTypes = {
    getRentals: PropTypes.func.isRequired,
    rentals: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    rentals: state.rentals,
    auth: state.auth,
});

export default connect(mapStateToProps, { getRentals })(
    Dashboard
);