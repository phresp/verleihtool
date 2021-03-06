import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { getRentals } from "../../actions/rentalActions";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import moment from "moment";

const { SearchBar, ClearSearchButton } = Search;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fil: "0",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getRentals();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const DashboardActions = () => {
      return (
        <div className="dash-buttons">
          <Link to="/new-rental" className="btn btn-info">
            <i className="fas fa-user-circle text-primary"></i> Neue Ausleihe
          </Link>

          <h6>Status Filter:</h6>

          <button
            className={
              this.state.fil === "0" ? "btn btn-primary" : "btn btn-light"
            }
            onClick={() => {
              this.setState({
                fil: "0",
              });
            }}
          >
            {" "}
            Alle
          </button>

          <button
            className={
              this.state.fil === "Unvollständig"
                ? "btn btn-primary"
                : "btn btn-light"
            }
            onClick={() => {
              this.setState({
                fil: "Unvollständig",
              });
            }}
          >
            {" "}
            Unvollständig
          </button>

          <button
            className={
              this.state.fil === "LS verschickt"
                ? "btn btn-primary"
                : "btn btn-light"
            }
            onClick={() => {
              this.setState({
                fil: "LS verschickt",
              });
            }}
          >
            {" "}
            LS verschickt
          </button>

          <button
            className={
              this.state.fil === "HW ausgegeben"
                ? "btn btn-primary"
                : "btn btn-light"
            }
            onClick={() => {
              this.setState({
                fil: "HW ausgegeben",
              });
            }}
          >
            {" "}
            HW ausgegeben
          </button>

          <button
            className={
              this.state.fil === "Abgeschlossen"
                ? "btn btn-primary"
                : "btn btn-light"
            }
            onClick={() => {
              this.setState({
                fil: "Abgeschlossen",
              });
            }}
          >
            {" "}
            Abgeschlossen
          </button>
        </div>
      );
    };

    //Data for Table
    const rentals = this.props.rentals.rentals;
    const entries = rentals ? rentals : [];

    var newArray = entries.filter((el) => {
      if (this.state.fil === "0") return el;
      if (this.state.fil === "Abgeschlossen")
        return el.status === "Abgeschlossen";
      if (this.state.fil === "Unvollständig")
        return el.status === "Unvollständig";
      if (this.state.fil === "LS verschickt")
        return el.status === "LS verschickt";
      if (this.state.fil === "HW ausgegeben")
        return el.status === "HW ausgegeben";
    });

    function betrachtenButton(cell, row, rowIndex, formatExtraData) {
      return (
        <Link to={`/rental/${row._id}`} className="btn btn-info">
          Edit
        </Link>
      );
    }

    function dateFormat(value, row, index) {
      if (value) return moment(value).format("DD/MM/YYYY");
    }

    function trueFormat(value, row, index) {
      if (value) return "X";
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
        dataField: "rückgabe",
        text: "Rückgabedatum",
        formatter: dateFormat,
        sort: true,
      },
      {
        dataField: "leihobjekt.ipad",
        text: "iPad",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.mikrofon",
        text: "Mikrofon",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.wacom",
        text: "Wacom",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.webcam",
        text: "Webcam",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "leihobjekt.stativ",
        text: "Stativ",
        formatter: trueFormat,
        align: "center",
        sort: true,
      },
      {
        dataField: "date",
        text: "Zuletzt bearbeitet",
        formatter: dateFormat,
        sort: true,
      },
      {
        dataField: "lasthandle",
        text: "Kürzel",
        sort: true,
      },

      {
        text: "Edit",
        header: "Edit",
        id: "links",
        formatter: betrachtenButton,
      },
    ];

    const paginationOptions = {
      sizePerPageList: [
        {
          text: "10",
          value: 10,
        },
        {
          text: "25",
          value: 25,
        },
        {
          text: "50",
          value: 50,
        },
        {
          text: "100",
          value: 100,
        },
      ],
    };

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <h1 className="display-4">Verleihübersicht</h1>
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={newArray}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <div className="btn-group">
                  <Link to="/new-rental" className="btn btn-info">
                    <i className="fas fa-user-circle text-primary"></i> Neue
                    Ausleihe
                  </Link>
                  <Link to="/rentalstats" className="btn btn-dark">
                    <i className="fas fa-chart-pie text-primary"></i>Statistik
                  </Link>
                </div>

                <h6>Status Filter:</h6>

                <button
                  className={
                    this.state.fil === "0" ? "btn btn-primary" : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "0",
                    });
                  }}
                >
                  {" "}
                  Alle
                </button>

                <button
                  className={
                    this.state.fil === "Unvollständig"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Unvollständig",
                    });
                  }}
                >
                  {" "}
                  Unvollständig
                </button>

                <button
                  className={
                    this.state.fil === "LS verschickt"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "LS verschickt",
                    });
                  }}
                >
                  {" "}
                  LS verschickt
                </button>

                <button
                  className={
                    this.state.fil === "HW ausgegeben"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "HW ausgegeben",
                    });
                  }}
                >
                  {" "}
                  HW ausgegeben
                </button>

                <button
                  className={
                    this.state.fil === "Abgeschlossen"
                      ? "btn btn-primary"
                      : "btn btn-light"
                  }
                  onClick={() => {
                    this.setState({
                      fil: "Abgeschlossen",
                    });
                  }}
                >
                  {" "}
                  Abgeschlossen
                </button>
                <SearchBar {...props.searchProps} />
                <ClearSearchButton {...props.searchProps} />
                <hr />
                <BootstrapTable
                  striped
                  {...props.baseProps}
                  pagination={paginationFactory(paginationOptions)}
                />
              </div>
            )}
          </ToolkitProvider>
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
