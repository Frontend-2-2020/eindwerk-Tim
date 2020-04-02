import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API, TOKEN } from "../API";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class LoginForm extends Component {
  // state = {};

  // Formik
  componentDidMount() {
    if (TOKEN) {
      // Als er een token is (uit local storage) dan gaan we de gebruikersgevens ophalen
      this.getUserData();
    }
  }

  submitHandler = values => {
    this.login(values);
    console.log(values);
  };

  getUserData = () => {
    API.get("api/user").then(response => {
      this.props.setUserData(response.data);
      // this.setState({ user: response.data });
    });
  };

  login = values => {
    API.post("oauth/token", {
      grant_type: "password",
      client_id: 2,
      client_secret: "iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI",
      username: values.email,
      password: values.password
    }).then(response => {
      window.localStorage.setItem(
        "EINDWERK_LOGIN_OAUTHTOKEN",
        response.data.access_token
      );
      API.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;

      this.getUserData();
    });
  };

  render() {
    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{
          email: "tim@test.com",
          password: "test"
        }}
      >
        <Form>
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Login</p>
            <Field
              type="email"
              name="email"
              className="form-control mb-4"
              placeholder="E-mail"
            ></Field>
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Paswoord"
            ></Field>
            <button className="btn btn-info my-4 btn-block" type="submit">
              Inloggen
            </button>{" "}
            <p>
              {Object.keys(this.props.user).length !== 0 ? (
                <em>Ingelogd </em>
              ) : (
                <Link to="/register">Registreren</Link>
              )}
            </p>
          </div>
        </Form>
      </Formik>
    );
  }
}

const mapStateToProps = store => {
  return { user: store.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserData: user => dispatch({ type: "SET_USER", payload: user })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
