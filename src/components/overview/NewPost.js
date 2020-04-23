import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { newPost } from "../../redux/actions/postsActions";
import NewPostForm from "./NewPostForm";
import axios from "axios";

class NewPost extends Component {
  state = {};

  componentDidMount() {
    this.getDummyText();
  }

  getDummyText() {
    axios.get("https://cat-fact.herokuapp.com/facts").then((res) => {
      this.setState({ dummyBody: res.data.all[0].text });
      // setFieldValue("body", res.data.all[0].text);
    });
  }

  submitHandler = (values) => {
    this.props.newPost(values, this.props.user);
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = ["title"];
  };
  render() {
    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{ title: "Cat Fact", body: this.state.dummyBody }}
        enableReinitialize
      >
        {(props) => <NewPostForm {...props}></NewPostForm>}
      </Formik>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return { newPost: (values, user) => dispatch(newPost(values, user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
