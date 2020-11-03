import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/new-rental" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Neue Ausleihe
            </Link>
        </div>
    );
};

export default DashboardActions;