import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      handle: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      handle: this.state.handle,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //const { errors } = this.state;
    const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.name}
                  name="name"
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Kürzel"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.handle}
                  name="handle"
                  error={errors.handle}
                />

                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  name="password"
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Confirm Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  name="password2"
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
