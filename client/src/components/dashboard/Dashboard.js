import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getRentals} from "../../actions/rentalActions";
import DashboardActions from "./DashboardActions";


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
        let leihen = [];
        if(rentals){
            leihen = rentals.map((rents) => (
                <tr key={rents._id}>
                    <td>{rents.name}</td>
                    <td>{rents.tumid}</td>
                    <td>{rents.email}</td>
                    <td>{rents.adresse}</td>
                    <td>{rents.telefonnummer}</td>
                    <td>
                    <button className="btn btn-primary">
                        Betrachten
                    </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                        >
                            Löschen
                        </button>
                    </td>

                </tr>
            ));
        }

        let dashboardContent = (
            <div>
                <DashboardActions />
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>TUM-ID</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Telefonnummer</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {leihen}
                        </thead>
                    </table>
                </div>
            </div>
        );


        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Verleihübersicht</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
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
    errors: state.errors,
});

export default connect(mapStateToProps, { getRentals })(
    Dashboard
);