import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BlockPicker } from "react-color";
import reactCSS from "reactcss";

export default class LoginForm extends Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    }
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          favorite_color: "#800000",
          avatar: "https://api.adorable.io/avatars/285/"
        }}
      >
        <Form>
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Registreren</p>
            <div className="form-row mb-4">
              <div className="col">
                <Field
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Voornaam"
                ></Field>
              </div>
              <div className="col">
                <Field
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Naam"
                ></Field>
              </div>
            </div>
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
            <label htmlFor="favorite_color">Kies je kleur: </label>
            {/* <Field type="text" name="favorite_color"></Field> */}
            <div
              className="form-control"
              style={styles.swatch}
              onClick={this.handleClick}
            >
              <div style={styles.color} />
            </div>{" "}
            {this.state.displayColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} />
                <BlockPicker
                  className="form-control"
                  color={this.state.color}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
            <label htmlFor="avatar">Url Avatar: </label>
            <Field className="form-control" type="text" name="avatar"></Field>
            <button className="btn btn-info my-4 btn-block" type="submit">
              Registeren
            </button>
          </div>
        </Form>
      </Formik>
    );
  }
}
