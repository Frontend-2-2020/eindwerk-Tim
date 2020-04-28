import React, { Component } from "react";
import { API } from "../../API";

export default class User extends Component {
  state = {};
  componentDidMount() {
    API.get(`/api/users/${this.props.match.params.userId}`).then((res) => {
      this.setState({ user: res.data });
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        firstname: {user && user.first_name} lastname: {user && user.last_name}{" "}
      </div>
    );
  }
}
