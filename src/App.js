import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <LoginForm></LoginForm>
      </div>
    );
  }
}
