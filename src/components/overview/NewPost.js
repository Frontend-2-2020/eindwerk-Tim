import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { newPost } from "../../redux/actions/postsActions";

class NewPost extends Component {
  submitHandler = (values) => {
    this.props.newPost(values);
  };
  render() {
    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{ title: "", body: "" }}
      >
        <Form>
          <Field
            type="text"
            name="title"
            className="form-control mb-4"
            placeholder="titel"
          ></Field>
          <Field
            type="text"
            name="body"
            className="form-control mb-4"
            placeholder="tekst"
          ></Field>{" "}
          <button className="btn btn-info my-4 btn-block" type="submit">
            Bevestigen
          </button>
        </Form>
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { newPost: (values) => dispatch(newPost(values)) };
};

export default connect(undefined, mapDispatchToProps)(NewPost);
