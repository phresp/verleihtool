import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getRentals } from "../../actions/rentalActions";
import DashboardActions from "./DashboardActions";
import BootstrapTable from "react-bootstrap-table-next";

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
    //Data for Table
    const rentals = this.props.rentals.rentals;
    const entries = rentals ? rentals : [];

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/rental/${row._id}`} className="btn btn-info">
          Bearbeiten
        </Link>
      );
    }

    const columns = [
      {
        dataField: "name",
        text: "Nachname",
        sort: true,
      },
      {
        dataField: "vorname",
        text: "Vorname",
        sort: true,
      },
      {
        dataField: "tumid",
        text: "TUM-ID",
        sort: true,
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        text: "Edit",
        header: "Edit",
        id: "links",
        formatter: betrachtenButton,
      },
    ];

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Verleihübersicht</h1>
              <DashboardActions />
              <BootstrapTable keyField="_id" data={entries} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    );
  }
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

export default connect(mapStateToProps, { getRentals })(withRouter(Dashboard));
