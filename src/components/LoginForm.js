import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../API";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/authActions";

class LoginForm extends Component {
  state = { redirect: false };
  submitHandler = (values) => {
    this.login(values);
  };

  login = (values) => {
    API.post("oauth/token", {
      grant_type: "password",
      client_id: 2,
      client_secret: "iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI",
      username: values.email,
      password: values.password,
    }).then(
      (response) => {
        window.localStorage.setItem(
          "EINDWERK_LOGIN_OAUTHTOKEN",
          response.data.access_token
        );
        API.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.access_token;

        // this.setState({ user: response.data });
        this.props.setUserData();
        this.setState({ redirect: true });
      },
      (error) => {
        this.setState({ errors: { password: "wrong username or password" } });
        this.setState({ redirect: false });
      }
    );
  };

  validate = (values) => {};
  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        <Form errors={this.state.errors}>
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Login</p>
            <Field
              type="email"
              name="email"
              className="form-control mb-4"
              placeholder="E-mail"
            ></Field>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Paswoord"
              ></Field>
              <div
                style={{ color: "red", textAlign: "left", paddingTop: "10px" }}
                className="error"
              >
                {this.state.errors && this.state.errors.password}
              </div>
            </div>
            <button className="btn btn-info my-4 btn-block" type="submit">
              Inloggen
            </button>

            <p>
              {this.props.user.user !== undefined ? (
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

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
